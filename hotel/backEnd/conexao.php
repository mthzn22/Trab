<?php

$host = 'localhost';
$dbname = 'quartos';
$username = 'trab';
$password = 'sucesso';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn-> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $error){
    echo "Erro na conexao: ".$error->getMessage();
    die();
}