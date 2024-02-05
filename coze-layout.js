// ==UserScript==
// @name         coze-layout
// @namespace    http://tampermonkey.net/
// @version      2024-01-13.01
// @description  coze.com机器人页面布局控制
// @author       JosLin1215
// @match        https://www.coze.com/space/*/bot/*
// @match        https://www.coze.cn/space/*/bot/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=coze.com
// @grant        none
// @license      GPL-2.0-only
// @downloadURL https://raw.githubusercontent.com/joslin1215/tampermonkey-script/main/coze-layout.js
// @updateURL https://raw.githubusercontent.com/joslin1215/tampermonkey-script/main/coze-layout.js
// ==/UserScript==

(function() {
    'use strict';

    let _changeCnt = 0;
    const _targetSelector = "#root > div > div > div > div > div.semi-space.semi-space-align-center.semi-space-horizontal";

    function changeLayout(){
        console.log('-------------------------------------------');
        let div = document.querySelector("#root > div > div > div > div > div.sidesheet-container");
        const hidden = ++_changeCnt%2 == 0;
        const gridTemplateColumns = hidden ? '13fr 13fr 14fr' : '0fr 0fr 14fr';
        localStorage.setItem("_layout", hidden);
        div.style.gridTemplateColumns = gridTemplateColumns;
    }

    function addBtn(){
        const addBtnLayoutId = 'c-btn-layout';
        var containerElement = document.querySelector(_targetSelector); // 替换为实际容器的 ID
        if(!containerElement) return;
        
        if(document.getElementById(addBtnLayoutId)) return;

        // 创建按钮元素
        var buttonElement = document.createElement('button');

        // 设置按钮元素的属性
        buttonElement.id=addBtnLayoutId;
        buttonElement.className = 'semi-button';
        buttonElement.type = 'button';
        buttonElement.setAttribute('aria-disabled', 'false');
        buttonElement.onclick = changeLayout;

        // 创建 span 元素
        var spanElement = document.createElement('span');

        // 设置 span 元素的类名和属性
        spanElement.className = 'semi-button-content';
        spanElement.setAttribute('x-semi-prop', 'children');

        // 设置 span 元素的文本内容
        spanElement.textContent = 'Layout';

        // 将 span 元素作为按钮元素的子元素添加
        buttonElement.appendChild(spanElement);

        containerElement.appendChild(buttonElement);
    }

    function recoverLastLayout(){
        var _layout = localStorage.getItem("_layout");
        if( _layout && _layout === 'true'){
            changeLayout();
        }
    }

    var intervalId = setInterval(addBtn, 500);

})();
