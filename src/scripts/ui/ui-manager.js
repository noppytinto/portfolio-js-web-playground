import * as pageGenerator from "./page-generator";
import * as editorManager from "./editor-manager";
import * as sessionManager from "../utils/session-manager";


const tabHtml = document.querySelector('.input__tab-button--html');
const tabCss = document.querySelector('.input__tab-button--css');
const tabJs = document.querySelector('.input__tab-button--js');
const wrapper = document.querySelector('.main');
const resizerHelper = document.querySelector('.resizer-helper');
const inputSection = document.querySelector('.input');
const resizerVertical = document.querySelector('.resizer--vertical');
const editorHtmlView = document.querySelector('.input__editor-html');
const editorCssView = document.querySelector('.input__editor-css');
const editorJsView = document.querySelector('.input__editor-js');
const loadingSpinner = document.querySelector('.loading');
const outputIframe = document.querySelector('#output__canvas');
const inputMenuOptions = document.querySelector('.input__menu-options');
const inputMenuButtonExpand = document.querySelector('.input__menu-button');
const inputMenuButtonReset = document.querySelector('.input__menu-option-item--reset');

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
    const query = 'screen and (max-width: 750px)';

    mediaQuery = window.matchMedia(query);
    isHandlerDragging = false;
    if (mediaQuery.matches) { // If media query matches
        inputSection.style.width = 'auto';
        inputSection.style.height = '40%';
        document.removeEventListener('mousemove', resizeHorizontally);
        document.addEventListener('mousemove', resizeVertically);
    } else {
        inputSection.style.width = '40%';
        inputSection.style.height = 'auto';
        document.removeEventListener('mousemove', resizeVertically);
        document.addEventListener('mousemove', resizeHorizontally);
    }
}

export function restorePreviousEditorState(previousEditorData, {
        htmlEditor,
        cssEditor,
        jsEditor
    }) {

        const htmlCode = previousEditorData.htmlCode;
        const cssCode = previousEditorData.cssCode;
        const jsCode = previousEditorData.jsCode;

    if (htmlCode !== '') {
        htmlEditor.setValue(htmlCode);
        pageGenerator.generatePage(htmlCode, cssCode, jsCode);
    }

    if (cssCode !== '') {
        cssEditor.setValue(cssCode);
        pageGenerator.generatePage(htmlCode, cssCode, jsCode);

    }

    if (jsCode !== '') {
        jsEditor.setValue(jsCode);
        pageGenerator.generatePage(htmlCode, cssCode, jsCode);
    }
}

export function listenEditorsChanges(previousEditorData, {
    htmlEditor,
    cssEditor,
    jsEditor
}) {

    const editorContent = previousEditorData;

    htmlEditor.on('changes', function (editor) {
        editorContent.htmlCode = editor.doc.getValue();
        pageGenerator.generatePage(editorContent.htmlCode, 
                                   editorContent.cssCode, 
                                   editorContent.jsCode);
    });

    cssEditor.on('changes', function (editor) {
        editorContent.cssCode = editor.doc.getValue();
        pageGenerator.generatePage(editorContent.htmlCode, 
                                   editorContent.cssCode, 
                                   editorContent.jsCode);
    });

    jsEditor.on('changes', function (editor) {
        editorContent.jsCode = editor.doc.getValue();
        pageGenerator.generatePage(editorContent.htmlCode, 
                                   editorContent.cssCode, 
                                   editorContent.jsCode);
    });
}

export function updateFrame(htmlBlobPage) {
    // console.log('PAGE DATA:', htmlBlobPage);

    const data_url = URL.createObjectURL(htmlBlobPage);
    outputIframe.setAttribute('src', data_url);
}

// export function updateFrame_offline(htmlCode, cssCode, jsCode) {
//     const iframeDocument = outputIframe.contentDocument || outputIframe.contentWindow.document;

//     iframeDocument.open();
//     iframeDocument.write(htmlCode);
//     iframeDocument.write("<script>"+ jsCode + "<" + "/script>");
//     iframeDocument.close();

//     const oldStyleElement = iframeDocument.querySelector('head').lastElementChild;
//     console.log(oldStyleElement);
//     if (oldStyleElement) iframeDocument.querySelector('head').removeChild(oldStyleElement);

//     const newStyleElement = iframeDocument.createElement('style');
//     newStyleElement.textContent = cssCode;
//     iframeDocument.querySelector('head').appendChild(newStyleElement);
// }


export function showLoadingSpinner() {
    loadingSpinner.classList.remove('hidden');
}

export function hideLoadingSpinner() {
    loadingSpinner.classList.add('hidden');
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
    inputMenuButtonExpand.addEventListener('click', (ev) => {
        // console.log('input menu clicked');
        inputMenuOptions.classList.toggle('hidden');
    })

    inputMenuButtonReset.addEventListener('click', (ev) => {
        // console.log('input menu clicked');
        inputMenuOptions.classList.toggle('hidden');
        sessionManager.destroy();
        editorManager.resetEditors();
        updateFrame('');
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