<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get and clean inputs
    $firstName = strip_tags(trim($_POST["firstName"]));
    $lastName = strip_tags(trim($_POST["lastName"]));
    $organisation = strip_tags(trim($_POST["organisation"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST["phone"]));
    $message = trim($_POST["message"]);

    // Validate inputs
    if (
        empty($firstName) || strlen($firstName) < 2 ||
        empty($lastName) || strlen($lastName) < 2 ||
        !filter_var($email, FILTER_VALIDATE_EMAIL) ||
        empty($phone)
    ) {
        echo json_encode(["success" => false, "error" => "Please fill in all required fields correctly."]);
        exit;
    }

    // Email details
    $recipient = "ernestmusila7@gmail.com";
    $subject = "New Contact Form Submission - " . $firstName . " " . $lastName;

    // Create email content
    $email_content = "=== NEW CONTACT FORM SUBMISSION ===\n\n";
    $email_content .= "First Name: " . $firstName . "\n";
    $email_content .= "Last Name: " . $lastName . "\n";
    $email_content .= "Organisation: " . ($organisation ? $organisation : "Not provided") . "\n";
    $email_content .= "Email: " . $email . "\n";
    $email_content .= "Phone: " . $phone . "\n\n";
    $email_content .= "Message:\n" . ($message ? $message : "No message provided") . "\n\n";
    $email_content .= "=== END OF SUBMISSION ===\n";
    $email_content .= "Submitted on: " . date('Y-m-d H:i:s') . "\n";

    // Set up headers - use a no-reply from your domain
    $domain = $_SERVER['HTTP_HOST'];
    $headers = "From: Contact Form <noreply@" . $domain . ">\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Return-Path: noreply@" . $domain . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "Content-Transfer-Encoding: 8bit\r\n";

    // Attempt to send the email
    $mail_sent = mail($recipient, $subject, $email_content, $headers);

    if ($mail_sent) {
        echo json_encode([
            "success" => true, 
            "message" => "Thank you! Your message has been sent successfully."
        ]);
    } else {
        // Log the error for debugging
        error_log("Contact form mail failed for: " . $email);
        echo json_encode([
            "success" => false, 
            "error" => "Sorry, there was an error sending your message. Please try again or contact us directly."
        ]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Invalid request method."]);
}
?>