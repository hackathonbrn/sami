<?php
    $errors = array('Получены не все параметры для выполнения запроса', 'Запрашиваемый объект не принадлежит данному пользователю');
    if (!isset($page2)) {
        $method['error'] = 'Не выбран метод для выполнения';
    } else if (!isset($userID) || $userID == 0) {
        $method['error'] = 'Этот запрос недоступен неавторизованным пользователям';
    } else {
        $page2 = explode('?', $page2)[0];
        if (file_exists("api/methods/$page2.php")) {
            $data = file_get_contents("php://input");
            $data = json_decode($data, true);
            include "api/methods/$page2.php";
            if ($page2 == 'heatMap') {
                die();
            }
            if (!isset($method['response'])) {
                $method['error'] = $errors[$method['error']];
            }
        } else {
            $method['error'] = 'Такого метода не существует';
        }
    }