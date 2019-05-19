<?php
    if (!isset($_GET['cameraId'], $_GET['startTime'], $_GET['endTime'])) {
        die();
    } else {
        if (!file_exists('cameraScreens/' . $_GET['cameraId'] . '.png')) {
            die();
        }
        $countFrames = $db->getOne('SELECT COUNT(*) FROM frames WHERE cameraId = ?i', $_GET['cameraId']);
        $oneAlpha = 127 / $countFrames;
        $result = $db->getAll('SELECT (objX + objWidth / 2) AS x, (objY + objHeight / 2) AS y FROM recognitionData, frames WHERE frameId = frames.id AND cameraId = ?i', $_GET['cameraId']);
        $image = imagecreatefrompng('cameraScreens/' . $_GET['cameraId'] . '.png');
        imagefilledrectangle($image, 0, 0, 1280, 720, imagecolorallocatealpha($image, 0, 0, 200, 100));
        /*for ($i = 0; $i < count($result); $i++) {
            imagefilledellipse($image, $result[$i]['x'], $result[$i]['y'], 30, 30, imagecolorallocatealpha($image, 255, 255, 0, 127 - (127 - $oneAlpha / 2) / 128));
            //imagefilledellipse($image, $result[$i]['x'], $result[$i]['y'], 10, 10, imagecolorallocatealpha($image, 255, 0, 0, 127 - $oneAlpha));
        }*/
        for ($i = 0; $i < count($result); $i++) {
            //imagefilledellipse($image, $result[$i]['x'], $result[$i]['y'], 15, 15, imagecolorallocatealpha($image, 0, 255, 0, 127 - (127 - $oneAlpha) / 64));
            imagefilledellipse($image, $result[$i]['x'], $result[$i]['y'], 10, 10, imagecolorallocatealpha($image, 255, 0, 0, 127 - $oneAlpha));
        }
        header('Content-Type: image/x-png');
        imagepng($image);
    }