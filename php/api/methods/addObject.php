<?php
    if (!isset($data, $data['objectName'], $data['objectDescription'])) {
        $method['error'] = 0;
    } else {
        if (isset($userID)) {
            $db->query('INSERT INTO objects (name, description, userId) VALUES (?a)', array($data['objectName'], $data['objectDescription'], $userID));
            $id = $db->insertId();
            $method['response'] = array('objectId' => $id);
        }
    }