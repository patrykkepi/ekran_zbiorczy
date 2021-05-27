<?php

require_once('../bdd.php');

try{
    $sql = sprintf("SELECT id_e, name, surname FROM employee WHERE active = 1 ORDER BY name DESC");

    $req = $bdd->prepare($sql);
    $req->execute();
    $req = $req->fetchAll();
    
    echo "{",
        json_encode("success"), ":", json_encode("true"), ",",
        json_encode("data"), ":", json_encode($req),     
      "}";
}
catch(Exception $e){
    echo "{",
        json_encode("success"), ":", json_encode("false"), ",",
        json_encode("error"), ":{",
            json_encode("code"), ":", "500,",
            json_encode("message"), ":", json_encode("Internal Server Error"), ",",
            json_encode("details"), ":", json_encode($e),
        "}",
      "}";
}

$sql = null;
$req = null;
$bdd = null;

?>