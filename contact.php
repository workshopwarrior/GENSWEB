<?php
header("Content-Type: application/json");

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
    echo json_encode(["success" => false, "error" => "Invalid input."]);
    exit;
  }

  // Email details
  $recipient = "ernestmusila7@gmail.com"; /* MY EMAIL */
  $subject = "New contact form submission";

  $email_content = "First Name: $firstName\n";
  $email_content .= "Last Name: $lastName\n";
  $email_content .= "Organisation: $organisation\n";
  $email_content .= "Email: $email\n";
  $email_content .= "Phone: $phone\n\n";
  $email_content .= "Message:\n$message\n";

  $headers = "From: $firstName $lastName <$email>";

  // Send the email
  if (mail($recipient, $subject, $email_content, $headers)) {
    echo json_encode(["success" => true]);
  } else {
    echo json_encode(["success" => false, "error" => "Could not send email."]);
  }
} else {
  echo json_encode(["success" => false, "error" => "Invalid request method."]);
}
