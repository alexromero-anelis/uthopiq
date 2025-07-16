<?php
require __DIR__ . '/php/PHPMailer/PHPMailer.php';
require __DIR__ . '/php/PHPMailer/SMTP.php';
require __DIR__ . '/php/PHPMailer/Exception.php';
$config = require __DIR__ . '/config.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

ini_set('display_errors', 1);
error_reporting(E_ALL);

// Validación método
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    exit("Acceso no permitido.");
}

// Validación reCAPTCHA
$token = $_POST['g-recaptcha-response'] ?? '';
$verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
$response = file_get_contents($verifyUrl . '?secret=' . $config['RECAPTCHA_SECRET'] . '&response=' . $token);
$respKeys = json_decode($response, true);
if (!$respKeys['success']) {
    exit("Verificación reCAPTCHA fallida.");
}

// Sanitizar
$nombre = strip_tags(trim($_POST["nombre"] ?? ''));
$email = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
$tipoServicio = $_POST["tipo-servicio"] ?? '';
$tipoWeb = $_POST["tipo-web"] ?? '';
$chatbots = htmlspecialchars(trim($_POST["chatbots"] ?? ''));
$automatizaciones = htmlspecialchars(trim($_POST["automatizaciones"] ?? ''));
$serviciosAdicionales = htmlspecialchars(trim($_POST["serviciosAdicionales"] ?? ''));

// Validar email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    exit("Correo electrónico no válido.");
}

// Enviar email
$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host = $config['SMTP_HOST'];
    $mail->SMTPAuth = true;
    $mail->Username = $config['SMTP_USER'];
    $mail->Password = $config['SMTP_PASS'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = $config['SMTP_PORT'];

    $mail->setFrom($config['SMTP_FROM'], $config['SMTP_NAME']);
    $mail->addAddress($config['SMTP_FROM']);
    $mail->addReplyTo($email, $nombre);

    $mail->isHTML(true);
    $mail->Subject = 'Nueva solicitud desde "Personaliza tu plan"';
    $mail->Body = "
        <strong>Nombre:</strong> {$nombre}<br>
        <strong>Email:</strong> {$email}<br>
        <strong>Tipo de servicio:</strong> {$tipoServicio}<br>
        <strong>Tipo de web:</strong> {$tipoWeb}<br>
        <strong>Servicios adicionales:</strong> {$serviciosAdicionales}<br>
        <strong>Chatbots:</strong> {$chatbots}<br>
        <strong>Automatizaciones:</strong> {$automatizaciones}
    ";

    $mail->send();
    echo "Mensaje enviado correctamente.";
} catch (Exception $e) {
    echo "Error al enviar: {$mail->ErrorInfo}";
}