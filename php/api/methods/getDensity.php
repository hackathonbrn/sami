<?php
    if (!isset($data, $data['startTime'], $data['endTime'], $data['cameraId'])) {
        $method['error'] = 0;
    } else {
        $data['endTime'] = PHP_INT_MAX;
        $query = $db->getAll('SELECT COUNT(*) AS c FROM recognitionData, frames WHERE frames.id = recognitionData.frameId AND frames.timestamp > ?i AND frames.timestamp < ?i AND frames.cameraId = ?i GROUP BY frameId', $data['startTime'], $data['endTime'], $data['cameraId']);
        $count = count($query);
        $interval = $count / 20;
        $curFrame = 0;
        $j = 0;
        $result = array();
        $currentAvg = 0;
        $resultX = array();
        $resultY = array();
        for ($i = 0, $r = 0; $i < $count; $i++, $r++) {
            if ($r <= $interval && $i < $count - 1) {
                $currentAvg += $query[$i]['c'];
            } else {
                $resultX[] = $j;
                $resultY[] = $currentAvg / $r;
                $currentAvg = 0;
                $r = 0;
                $j++;
            }
        }
        $method['response'] = array('dots' => array('x' => $resultX, 'y' => $resultY));

    }