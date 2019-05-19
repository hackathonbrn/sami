<?php
    if (!isset($data, $data['cameraId'], $data['objectId'])) {
        $method['error'] = 0;
    } else {
        if (isset($userID)) {
            $count = $db->getOne('SELECT COUNT(*) FROM objects WHERE id = ?i AND userId = ?i', $data['objectId'], $userID);
            if ($count > 0) {
                $query = $db->query('DELETE FROM cameras WHERE id = ?i AND objectId = ?i', $data['cameraId'], $data['objectId']);
                $method['response'] = array('success' => $query);
            } else {
                $method['error'] = 1;
            }
        }
    }