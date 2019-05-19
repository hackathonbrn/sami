<?php
    if (!isset($data, $data['objectID'])) {
        $method['error'] = 0;
    } else {
        $result = $db->getAll('SELECT id, name, description FROM cameras WHERE objectId = ?i', $data['objectID']);
        $c = count($result);
        for ($i = 0; $i < $c; $i++) {
            $result[$i]['id'] = (int)$result[$i]['id'];
        }
        $method['response'] = array('cameras' => $result);
    }