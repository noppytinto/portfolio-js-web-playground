import * as pageGenerator from "./page-generator";

const tabHtml = document.querySelector('.input__tab-button--html');
const tabCss = document.querySelector('.input__tab-button--css');
const tabJs = document.querySelector('.input__tab-button--js');
const wrapper = document.querySelector('.main');
const resizerHelper = document.querySelector('.resizer-helper');
const inputSection = document.querySelector('.input');
const resizerVertical = document.querySelector('.resizer--vertical');
const editorHtmlView = document.querySelector('.input__section-html');
const editorCssView = document.querySelector('.input__section-css');
const editorJsView = document.querySelector('.input__section-js');
const loadingSpinner = document.querySelector('.loading');
const outputIframe = document.querySelector('#output__canvas');
const inputMenuButton = document.querySelector('.input__menu-button');
const inputMenuOptions = document.querySelector('.input__menu-options-container');

let isHandlerDragging = false;
let mediaQuery;


//////////////////////////////////////////
// PUBLIC FUNCTIONS
//////////////////////////////////////////
export function handleTabsClick() {
    tabHtml.addEventListener('click', () => {
        activateTab(tabHtml, 'html');
        deactivateTab(tabCss, 'css');
        deactivateTab(tabJs, 'js');

        //
        showElement(editorHtmlView);
        hideElement(editorCssView);
        hideElement(editorJsView);
    });

    tabCss.addEventListener('click', () => {
        activateTab(tabCss, 'css');
        deactivateTab(tabHtml, 'html');
        deactivateTab(tabJs, 'js');

        //
        hideElement(editorHtmlView);
        showElement(editorCssView);
        hideElement(editorJsView);
    });

    tabJs.addEventListener('click', () => {
        activateTab(tabJs, 'js');
        deactivateTab(tabHtml, 'html');
        deactivateTab(tabCss, 'css');

        //
        hideElement(editorHtmlView);
        hideElement(editorCssView);
        showElement(editorJsView);
    });
}

export function handleResizer() {
    resizerVertical.addEventListener('mousedown', enableResize);

    document.addEventListener('mouseup', disableResize);

    mediaQuery.addEventListener('change', (ev) => {
        checkMediaQuery(ev);
    });
}



export function checkMediaQuery() {
    mediaQuery = window.matchMedia("screen and (max-width: 750px)");
    if (mediaQuery.matches) { // If media query matches
        isHandlerDragging = false;
        inputSection.style.width = 'auto';
        inputSection.style.height = '40%';
        document.removeEventListener('mousemove', resizeHorizontally);
        document.addEventListener('mousemove', resizeVertically);
    } else {
        isHandlerDragging = false;
        inputSection.style.width = '40%';
        inputSection.style.height = 'auto';
        document.removeEventListener('mousemove', resizeVertically);
        document.addEventListener('mousemove', resizeHorizontally);
    }
}

export function restorePreviousViewState(pageData, {
    htmlEditor,
    cssEditor,
    jsEditor
}) {
    if (pageData.htmlCode !== '') {
        htmlEditor.setValue(pageData.htmlCode);
        pageGenerator.generatePage(pageData);
    }

    if (pageData.cssCode !== '') {
        cssEditor.setValue(pageData.cssCode);
        pageGenerator.generatePage(pageData);
    }

    if (pageData.jsCode !== '') {
        jsEditor.setValue(pageData.jsCode);
        pageGenerator.generatePage(pageData);
    }
}

export function listenEditorsChanges(pageData, {
    htmlEditor,
    cssEditor,
    jsEditor
}) {
    htmlEditor.on('changes', function (editor) {
        pageData.htmlCode = editor.doc.getValue();
        pageGenerator.generatePage(pageData);
    });

    cssEditor.on('changes', function (editor) {
        pageData.cssCode = editor.doc.getValue();
        pageGenerator.generatePage(pageData);
    });

    jsEditor.on('changes', function (editor) {
        pageData.jsCode = editor.doc.getValue();
        pageGenerator.generatePage(pageData);
    });
}

export function showLoadingSpinner() {
    loadingSpinner.classList.remove('hidden');
}

export function hideLoadingSpinner() {
    loadingSpinner.classList.add('hidden');
}

export function updateFrame(pageData) {
    console.log('PAGE DATA:', pageData);

    const data_url = URL.createObjectURL(pageData);
    outputIframe.setAttribute('src', data_url);
}

export function activateTab(tab, tabName) {
    tab.classList.remove(`input__tab-button--${tabName}--active`);
    tab.classList.add(`input__tab-button--${tabName}--active`);
}

export function deactivateTab(tab, tabName) {
    tab.classList.remove(`input__tab-button--${tabName}--active`);
}

export function hideElement(element) {
    element.classList.remove('hidden');
    element.classList.add('hidden');
}

export function showElement(element) {
    element.classList.remove('hidden');
}

export function handleInputMenu() {
    // TODO
    inputMenuButton.addEventListener('click', (ev) => {
        // console.log('input menu clicked');
        inputMenuOptions.classList.toggle('hidden');
    })
}

//////////////////////////////////////////
// PRIVATE FUNCTIONS
//////////////////////////////////////////
function enableResize(ev) {
    ev.preventDefault();

    // If mousedown event is fired from .handler, toggle flag to true
    if (ev.target === resizerVertical) {
        console.log('resize enabled');
        resizerHelper.classList.remove('hidden');
        isHandlerDragging = true;
    }

}

function resizeHorizontally(ev) {

    // Don't do anything if dragging flag is false
    if (!isHandlerDragging) {
        return false;
    }

    console.log('DRAGGING HORIZONTALLY');


    // Get offset
    let containerOffsetLeft = wrapper.offsetLeft;

    // Get x-coordinate of pointer relative to container
    let pointerRelativeXpos = ev.clientX - containerOffsetLeft;

    inputSection.style.width = pointerRelativeXpos + 'px';
    // inputSection.style.flexGrow = 0;
}

function resizeVertically(ev) {

    // Don't do anything if dragging flag is false
    if (!isHandlerDragging) {
        return false;
    }

    console.log('DRAGGING VERTICALLY');


    // Get offset
    let containerOffsetTop = wrapper.offsetTop;

    // Get x-coordinate of pointer relative to container
    let pointerRelativeYpos = ev.clientY - containerOffsetTop;

    inputSection.style.height = pointerRelativeYpos + 'px';
    // inputSection.style.flexGrow = 0;
}

function disableResize(ev) {
    console.log('resize disabled');
    resizerHelper.classList.remove('hidden');
    resizerHelper.classList.add('hidden');

    // Turn off dragging flag when user mouse is up
    isHandlerDragging = false;
    // document.removeEventListener('mousemove', resize);
}