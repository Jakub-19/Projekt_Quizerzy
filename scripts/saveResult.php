<?php
$nick = 'Anonim';
if(isset($_POST["nick"]))
    $nick = substr($_POST["nick"], 0, 20);
$result = 0;
if(isset($_POST["result"]))
    $result = $_POST["result"];

if($result > 0)
{
    $path = "results.json";
    $file = fopen($path, "r");
    $data = fread($file, filesize($path));
    fclose($file);
    $data = json_decode($data);

    $dataStruct = new \stdClass();
    $dataStruct->nick = $nick;
    $dataStruct->result = $result;

    array_push($data, $dataStruct);

    usort($data, "compare");
    if(count($data) > 10)
    {
        $data = array_slice($data, 0, 10);
    }

    $file = fopen($path, "w");
    $data = json_encode($data);
    fwrite($file, $data);
    fclose($file);
}

header("Location: ../index.php");
die();

function compare($a, $b) {
    if($a->result > $b->result)
        return -1;
    else if($a->result < $b->result)
        return 1;
    else if($a->result == $b->result)
        return 0;
}
?>