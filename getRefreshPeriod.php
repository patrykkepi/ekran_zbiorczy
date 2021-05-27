<?php

require_once('bdd.php');
$id_fst = $_GET['id_fst'];
try{
    $sql = sprintf("SELECT refresh_period FROM fdcs_settings_table WHERE id_fst = %d", $id_fst);

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