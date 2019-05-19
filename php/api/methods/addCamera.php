<?php
    if (!isset($data, $data['objectId'], $data['cameraName'], $data['cameraDescription'], $data['cameraUrl'])) {
        $method['error'] = 0;
    } else {
        if (isset($userID)) {
            $db->query('INSERT INTO cameras (objectId, name, description, url) VALUES (?a)', array($data['objectId'], $data['cameraName'], $data['cameraDescription'], $data['cameraUrl']));
            $id = $db->insertId();
            $method['response'] = array('cameraId' => $id);
        }
    }