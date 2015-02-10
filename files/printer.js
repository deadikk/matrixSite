function printer(options) {
    "use strict";

    options = options || {};
    var element,
        str = '' + options.text,
        pos = 0,
        fGetElements,
        fIntervaler,
        fPrint,
        splitter = { '.': 0, '\n': 0, ';': 0 };

    fGetElements = function (selector) {
        if (window.jQuery) {
            return window.jQuery(selector);
        }
        else {
            return document.querySelectorAll(selector);
        }
    };

    fIntervaler = function (c) {
        return (c == '\n') ? options.delayLn : options.fDelay();
    };

    fPrint = function (x) {
        var fin1 = (x + 1 < str.length) ? str[x + 1] : '',
            fin2 = (x + 2 < str.length) && !(str[x] in splitter) && !(str[x + 1] in splitter) ? str[x + 2] : '';

        element.innerHTML = '<div>' + str.substr(0, x + 1).replace('\n', '<br/>', 'g') +
            '<span class="' + options.style1 + '">' + fin1 +'</span>' +
            '<span class="' + options.style2 + '">' + fin2 + '</span>';
        setTimeout(function () {
            if (x < str.length - 1) {
                return fPrint(++pos);
            }
            options.fSuccess();
        }, fIntervaler(str[x + 1]));
    };

    element = fGetElements(options.selector)[0];
    options.delayLn = options.delayLn || 700;               // пауза при переводе строк
    options.fDelay = options.fDelay || function () {        // функция, возвращающая паузу для остальных символов
        return Math.round(Math.random() * 50) + 10;
    };
    options.fSuccess = options.fSuccess || function () {};  // функция, которая выполнится по завершении вывода текста
    options.style1 = options.style1 || 'printer-hl1';       // наименование стиля для предпоследнего символа
    options.style2 = options.style2 || 'printer-hl2';       // наименование стиля для последнего символа

    if (!str || !element ) {
        return;
    }

    fPrint(pos);
}