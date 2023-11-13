<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $email = isset($_POST['email']) ? $_POST['email'] : null;

    // // Validate email address
    // if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    //     echo "Invalid email format";
    //     exit();
    // }

    // Create email message
    $to = "somtochukwu.mbuko@stud.th-deg.de";
    $subject = "New Newsletter Subscription";
    $message_body = "Email: $email\n";

    // Send email
    $headers = "From: $email";

    if (mail($to, $subject, $message_body, $headers)) {
        header("Location: /subscribe-success.html");
    } else {
        header("Location: /error-occurred.html");
    }
}
?>