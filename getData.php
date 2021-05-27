<?php

require_once('bdd.php');

try{
    $sql = sprintf("SELECT dacs_name_short, live_production_report.product_name, live_production_report.efficiency_sec, 
                    live_production_report.proper_count, live_production_report.underweight_count, live_production_report.metal_count, 
                    live_production_report.overweight_count, live_production_report.double_len_count, live_production_report.double_weight_count,
                    live_production_report.others_count, live_production_report.meanweight_value_g,
                    live_oee_shift_report.unplanned_breaks_sec, live_oee_shift_report.planned_breaks_sec, live_oee_shift_report.oee_overall, 
                    live_oee_shift_report.oee_efficiency, live_oee_shift_report.oee_quality, live_oee_shift_report.oee_availability,
                    parameters_setting_table.oee_red_min, parameters_setting_table.oee_red_max, 
                    parameters_setting_table.oee_yellow_min, parameters_setting_table.oee_yellow_max,
                    parameters_setting_table.oee_green_min, parameters_setting_table.oee_green_max, 
                    parameters_setting_table.availability_red_min, parameters_setting_table.availability_red_max,
                    parameters_setting_table.availability_yellow_min, parameters_setting_table.availability_yellow_max, 
                    parameters_setting_table.availability_green_min, parameters_setting_table.availability_green_max,
                    parameters_setting_table.efficiency_red_min, parameters_setting_table.efficiency_red_max, 
                    parameters_setting_table.efficiency_yellow_min, parameters_setting_table.efficiency_yellow_max,
                    parameters_setting_table.efficiency_green_min, parameters_setting_table.efficiency_green_max, 
                    parameters_setting_table.quality_red_min, parameters_setting_table.quality_red_max,
                    parameters_setting_table.quality_yellow_min, parameters_setting_table.quality_yellow_max,
                    parameters_setting_table.quality_green_min, parameters_setting_table.quality_green_max       
                    FROM machine_list 
                    LEFT JOIN live_production_report ON machine_list.dacs_ip_id = live_production_report.dacs_ip_id
                    LEFT JOIN live_oee_shift_report ON machine_list.dacs_ip_id = live_oee_shift_report.dacs_ip_id 
                    LEFT JOIN parameters_setting_table ON machine_list.dacs_ip_id = parameters_setting_table.dacs_ip_id
                    WHERE dacs_group_id = 1 ORDER BY machine_list.order ASC");

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