<?php
    /**
     * Created by PhpStorm.
     * User: Александр
     * Date: 15.05.2019
     * Time: 18:24
     */

    class Engine
    {
        public function include_tpl ($array, $name)
        {
            $file_string = file_get_contents("content/" . $name . ".tpl");
            if ($array != "") {
                $keys = array_keys($array);
                for ($i = 0; $i < count($array); $i++) {
                    $file_string = str_replace("--%$keys[$i]%--", $array[$keys[$i]], $file_string);
                }
            }
            return $file_string;
        }
    }