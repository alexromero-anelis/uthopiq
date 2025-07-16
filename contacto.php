<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Cargar configuración segura
$config = require __DIR__ . '/config.php';

require __DIR__ . '/php/PHPMailer/PHPMailer.php';
require __DIR__ . '/php/PHPMailer/Exception.php';
require __DIR__ . '/php/PHPMailer/SMTP.php';

// Validar método
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    exit("Acceso no permitido.");
}

// Validar reCAPTCHA
$recaptchaToken = $_POST['g-recaptcha-response'] ?? '';
if (!$recaptchaToken) exit("reCAPTCHA no detectado.");

$verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
$response = file_get_contents(
    $verifyUrl . '?secret=' . $config['RECAPTCHA_SECRET'] . '&response=' . $recaptchaToken
);
$responseKeys = json_decode($response, true);

if (!$responseKeys["success"]) {
    exit("Verificación reCAPTCHA fallida.");
}

// Sanitizar inputs
$nombre = strip_tags(trim($_POST["nombre"] ?? ''));
$email = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
$mensaje = htmlspecialchars(trim($_POST["mensaje"] ?? ''), ENT_QUOTES, 'UTF-8');

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    exit("Correo electrónico no válido.");
}

if (strlen($nombre) > 100 || strlen($email) > 100 || strlen($mensaje) > 1000) {
    exit("Los campos exceden la longitud permitida.");
}

// Enviar correo
$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = $config['SMTP_HOST'];
    $mail->SMTPAuth = true;
    $mail->Username = $config['SMTP_USER'];
    $mail->Password = $config['SMTP_PASS'];
    $mail->SMTPSecure = 'tls';
    $mail->Port = $config['SMTP_PORT'];

    $mail->setFrom($config['SMTP_FROM'], $config['SMTP_NAME']);
    $mail->addAddress($config['SMTP_FROM']);
    $mail->addReplyTo($email, $nombre);

    $mail->isHTML(true);
    $mail->Subject = 'Nuevo mensaje del formulario de contacto';
    $mail->Body = "
        <strong>Nombre:</strong> {$nombre}<br>
        <strong>Email:</strong> {$email}<br>
        <strong>Mensaje:</strong><br>" . nl2br($mensaje);

    $mail->send();
    echo "Mensaje enviado correctamente.";
} catch (Exception $e) {
    echo "Error al enviar: {$mail->ErrorInfo}";
}