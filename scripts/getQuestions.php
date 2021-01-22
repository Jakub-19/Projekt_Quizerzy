<?php
$questions = array();
for ($i = 1; $i <= 12; $i++) {
    $path = "questions/questions".$i.".json";
    $file = fopen($path, "r");
    $data = fread($file, filesize($path));
    fclose($file);
    $data = json_decode($data);
    array_push($questions, $data[rand(0, count($data) - 1)]);
}

$response = $questions;
header('Content-Type: application/json');
echo json_encode($response);
?>