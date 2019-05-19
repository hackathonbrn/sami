<?php
    if (!isset($data, $data['startTime'], $data['endTime'], $data['cameraId'])) {
        $method['error'] = 0;
    } else {
        $countLeft = $db->getOne('SELECT COUNT(*) FROM recognitionData, frames WHERE frameId = frames.id AND recognitionData.objX < (frames.width / 2) AND cameraId = ?i AND `timestamp` >= ?i AND `timestamp` < ?i', $data['cameraId'], $data['startTime'], $data['endTime']);
        $countRight = $db->getOne('SELECT COUNT(*) FROM recognitionData, frames WHERE frameId = frames.id AND recognitionData.objX > (frames.width / 2) AND cameraId = ?i AND `timestamp` >= ?i AND `timestamp` < ?i', $data['cameraId'], $data['startTime'], $data['endTime']);
        $left = $countLeft * 100 / ($countLeft + $countRight);
        $method['response'] = array('percents' => array($left, 100 - $left));
    }