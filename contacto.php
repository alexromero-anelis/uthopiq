<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/php/PHPMailer/PHPMailer.php';
require __DIR__ . '/php/PHPMailer/Exception.php';
require __DIR__ . '/php/PHPMailer/SMTP.php';


if ($_SERVER["REQUEST_METHOD"] == "POST") 
{
    $nombre = trim($_POST["nombre"] ?? '');
    $email = trim($_POST["email"] ?? '');
    $mensaje = trim($_POST["mensaje"] ?? '');

    $mail = new PHPMailer(true);

    try 
    {
        $mail->isSMTP();
        $mail->Host = 'smtp.hostinger.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'contacto@uthopiq.com';
        $mail->Password = '1L[P$=$HA:y';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom('contacto@uthopiq.com', 'Formulario Uthopiq');
        $mail->addAddress('contacto@uthopiq.com');

        $mail->isHTML(true);
        $mail->Subject = 'Nuevo mensaje del formulario de contacto';
        $mail->Body = "
            <strong>Nombre:</strong> {$nombre}<br>
            <strong>Email:</strong> {$email}<br>
            <strong>Mensaje:</strong><br>" . nl2br(htmlspecialchars($mensaje)) . "
        ";

        $mail->send();
        echo "Mensaje enviado correctamente.";
    } 
    catch (Exception $e) 
    {
        echo "Error al enviar: {$mail->ErrorInfo}";
    }
}
else 
{
    echo "Acceso no permitido.";
}