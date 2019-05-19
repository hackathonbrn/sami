<?php
    if (!isset($engine)) {
        $engine = new Engine();
    }
    echo $engine->include_tpl(array(), 'client/main');
    echo "Добро пожаловать в панель управления";