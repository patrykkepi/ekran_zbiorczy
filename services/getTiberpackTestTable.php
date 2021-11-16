<?php

require_once('bdd.php');

try{
    $sql = sprintf("SELECT * FROM tiberpack_test_table 
                    INNER JOIN plc_status_description ON tiberpack_test_table.status = plc_status_description.status_code
                    ORDER BY id_tptt DESC LIMIT 1",); 
    $req = $bdd->prepare($sql); 
    $req->execute(); 
    $odp = $req->fetchAll(); 
    
    
    echo "{",
        json_encode("success"), ":", json_encode(true), ",",
        json_encode("data"), ":", json_encode($odp[0]),     
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