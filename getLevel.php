<?php
header('Content-Type: application/json');
$level = $_GET['level'];
$file = file_get_contents('data/level' . $level . '.json');
echo $file;
?>