<?php
    if (!isset($data, $data['objectId'])) {
        $method['error'] = 0;
    } else {
        if (isset($userID)) {
            $query = $db->query('DELETE FROM objects WHERE id = ?i AND userId = ?i', $data['objectId'], $userID);
            $method['response'] = array('success' => $query);
        }
    }