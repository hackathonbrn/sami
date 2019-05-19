<?php

    $file = file_get_contents('5.json');
    $data = json_decode($file, true);
    foreach ($data as $d) {
        $db->query('INSERT INTO frames (timestamp, cameraId, width) VALUES (?a)', array('2019-01-01 00:00', 5, 1280));
        $frame = $db->insertId();
        foreach ($d as $a) {
            $insert = array($frame, $a['X'], $a['Y'], $a['Type'], $a['Width'], $a['Height']);
            $db->query('INSERT INTO recognitionData (frameId, objX, objY, objName, objWidth, objHeight) VALUES (?a)', $insert);
        }
    }