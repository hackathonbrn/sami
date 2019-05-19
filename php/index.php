<?php
    include_once 'class/database.php';
    include_once 'class/engine.php';
    $db = new Database();
    $engine = new Engine();

    $parts = explode('/', $_SERVER['REQUEST_URI']);
    $page = $parts[1];

    /*$json = file_get_contents('0.json');
    $json = json_decode($json, true);*/

    /*for ($i = 0; $i < count($json); $i++) {
        $frame = array(
            'timestamp' => time(),
            'cameraId' => 1
        );
        $db->query('INSERT INTO frames (timestamp, cameraId) VALUES (?a)', $frame);
        for ($j = 0; $j < count($json[$i]); $j++) {
            if ($json[$i][$j]['Type'] == 'person') {
                $preObj = $json[$i][$j];
                $obj = array($i, $preObj['X'], $preObj['Y'], $preObj['Type'], $preObj['Width'], $preObj['Height']);
                $db->query('INSERT INTO recognitionData (frameId, objX, objY, objName, objWidth, objHeight) VALUES (?a)', $obj);
            }
        }
    }*/

    /*echo '<pre>';
    print_r($json);
    echo '</pre>';*/

    if (isset($_SESSION['userID'])) {
        $userID = $_SESSION['userID'];
    } else {
        $userID = 1;
    }

    if ($page == 'assets') {
        $result = 'assets';
        $c = count($parts);
        for ($i = 2; $i < $c; $i++) {
            $result .= '/' . $parts[$i];
        }
        switch ($parts[2]) {
            case 'js':
                header('Content-Type: application/javascript');
                break;
            case 'css':
                header('Content-Type: text/css');
                break;
            case 'img':
                $exp = explode('.', $result);
                header('Content-Type: image/' . $exp[count($exp) - 1]);
                break;
        }
        echo file_get_contents($result);
        die();
    }

    if (empty($page)) {
        $page = 'main';
    }

    if ($page == 'api') {
        $page2 = $parts[2];
        $method = array();
        include 'api/apiManager.php';
        if (isset($method['response'])) {
            $apiResult = json_encode($method['response']);
        } else {
            if (isset($method['error'])) {
                $apiResult = json_encode(array('error' => $method['error']));
            } else {
                $apiResult = json_encode(array('error' => 'internal error'));
            }
        }
    } else if (file_exists("content/scripts/$page.php")) {
        $page2 = $parts[2];
        ob_start();
        include "content/scripts/$page.php";
        $content = ob_get_contents();
        ob_end_clean();
    } else if (file_exists("content/$page")) {
        $content = $engine->include_tpl(array(), $page);
    } else {
        $content = $engine->include_tpl(array(), 'err_404');
    }
    if (isset($apiResult)) {
        header('Content-Type: application/json; charset=utf-8');
        header('Access-Control-Allow-Origin: *');
        echo $apiResult;
    } else {
        header('Content-Type: text/html; charset=utf-8');
        echo $content;
    }