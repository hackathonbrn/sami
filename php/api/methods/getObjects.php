<?php
    if (!isset($data, $data['limit'], $data['offset'])) {
        $method['error'] = 0;
    } else {
        $result = $db->getAll('SELECT id, name, description FROM objects LIMIT ?i, ?i', $data['offset'], $data['limit']);
        $c = count($result);
        for ($i = 0; $i < $c; $i++) {
            $result[$i]['id'] = (int)$result[$i]['id'];
        }
        $method['response'] = array('objects' => $result);
    }