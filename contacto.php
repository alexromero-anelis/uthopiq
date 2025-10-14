<?php
ini_set('display_errors', 0);
error_reporting(E_ALL);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json; charset=UTF-8');

$config = require __DIR__ . '/config.php';

require __DIR__ . '/php/PHPMailer/PHPMailer.php';
require __DIR__ . '/php/PHPMailer/Exception.php';
require __DIR__ . '/php/PHPMailer/SMTP.php';

function json_end($success, $message, $code = 200) {
    http_response_code($code);
    echo json_encode(['success' => $success, 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    json_end(false, "Acceso no permitido.", 405);
}

// reCAPTCHA
$recaptchaToken = $_POST['g-recaptcha-response'] ?? '';
if (!$recaptchaToken) json_end(false, "reCAPTCHA no detectado.", 400);

$verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';

$ch = curl_init($verifyUrl);
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => http_build_query([
        'secret' => $config['RECAPTCHA_SECRET'],
        'response' => $recaptchaToken
    ]),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 4,
    CURLOPT_TIMEOUT => 6
]);
$resp = curl_exec($ch);
$curlErr = curl_error($ch);
curl_close($ch);

if ($resp === false) {
    json_end(false, "No se pudo verificar reCAPTCHA: $curlErr", 502);
}

$responseKeys = json_decode($resp, true);
if (!($responseKeys['success'] ?? false)) {
    json_end(false, "Verificación reCAPTCHA fallida.", 400);
}

// Sanitizar
$nombre  = strip_tags(trim($_POST["nombre"] ?? ''));
$email   = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
$mensaje = htmlspecialchars(trim($_POST["mensaje"] ?? ''), ENT_QUOTES, 'UTF-8');

if (!$nombre || !$email || !$mensaje) json_end(false, "Campos incompletos.", 400);
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) json_end(false, "Correo electrónico no válido.", 400);
if (strlen($nombre) > 100 || strlen($email) > 100 || strlen($mensaje) > 2000) {
    json_end(false, "Los campos exceden la longitud permitida.", 400);
}

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = $config['SMTP_HOST'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $config['SMTP_USER'];
    $mail->Password   = $config['SMTP_PASS'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = (int)$config['SMTP_PORT'];

    // Mejora de tiempos
    $mail->Timeout        = 10;  
    $mail->SMTPKeepAlive  = false;
    $mail->SMTPAutoTLS    = true;
    $mail->CharSet        = 'UTF-8';

    $mail->setFrom($config['SMTP_FROM'], $config['SMTP_NAME']);
    $mail->addAddress($config['SMTP_FROM']);
    $mail->addReplyTo($email, $nombre);

    $mail->isHTML(true);
    $mail->Subject = 'Nuevo mensaje del formulario de contacto';
    $mail->Body = "
        <strong>Nombre:</strong> {$nombre}<br>
        <strong>Email:</strong> {$email}<br>
        <strong>Mensaje:</strong><br>" . nl2br($mensaje);

    $mail->AltBody = "Nombre: {$nombre}\nEmail: {$email}\nMensaje:\n{$mensaje}";

    $mail->send();

    json_end(true, "Mensaje enviado correctamente.");
} catch (Exception $e) {
    json_end(false, "Error al enviar: " . $mail->ErrorInfo, 500);
}