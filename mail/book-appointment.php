<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    // $department = $_POST['department'];
    // $doctor = $_POST['doctor'];
    // $date = $_POST['date'];
    $message = $_POST['message'];

    // // Validate email address
    // if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    //     echo "Invalid email format";
    //     exit();
    // }

    // Create email message
    $to = "somtochukwu.mbuko@stud.th-deg.de";
    $subject = "New Appointment Booking";
    $message_body = "Name: $name\nEmail: $email\nPhone: $phone\nMessage: $message\n";

    // Send email
    $headers = "From: $email";

    if (mail($to, $subject, $message_body, $headers)) {
        header("Location: /booked-appointment.html");
    } else {
        header("Location: /error-occurred.html");
    }
}
?>