<?php
    $data = file_get_contents('php://input');
    if (isset($data)) {
        $json = json_decode($data);
        $c = count($json);
        for ($i = 0; $i < $c; $i++) {
            $obj = $json[$i];
            $db->query('INSERT INTO recognitionData (cameraId, objX, objY, objName, objWidth, objHeight) VALUES (?a)', $obj);
        }
    }