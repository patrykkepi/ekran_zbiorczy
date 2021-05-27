<?php
function db_connect() {
    static $bdd;
	
	if(!isset($bdd)) {
             
        $params = parse_ini_file('C:\Apache24\private\config_FDCS_DB_F.ini'); 
		if ($params === false) {
            throw new \Exception("Error reading database configuration file");
        }
        $conStr = sprintf("pgsql:host=%s;port=%d;dbname=%s;user=%s;password=%s", 
                $params['host'], 
                $params['port'], 
                $params['database'], 
                $params['user'], 
                $params['password']);
 
        $bdd = new PDO($conStr);
		$bdd -> setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        
		return $bdd;
	}

}
try
{
	$bdd = db_connect();
}
catch(Exception $e)
{
        die('Error : '.$e->getMessage());
}

?>
