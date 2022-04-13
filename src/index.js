
// 
import * as codeEditor from './scripts/editor';
import * as session from './scripts/session';
import * as pageGenerator from './scripts/page-generator';
import * as uiUtils from './scripts/ui-utils';
import './styles/style.scss';


/////////////////////////////////////////
// dom elements
/////////////////////////////////////////
const wrapper = document.querySelector('.main');
const outputSection = document.querySelector('.output');
const iframe = document.querySelector('#output__canvas');
const dragAreaHelper = document.querySelector('.drag-area-helper');
const inputSection = document.querySelector('.input');
const resizerVertical = document.querySelector('.resizer--vertical');
const tabHtml = document.querySelector('.input__tab-button--html');
const tabCss = document.querySelector('.input__tab-button--css');
const tabJs = document.querySelector('.input__tab-button--js');
const editorHtmlView = document.querySelector('.input__section-html');
const editorCssView = document.querySelector('.input__section-css');
const editorJsView = document.querySelector('.input__section-js');

let isHandlerDragging = false;

/////////////////////////////////////////
// declarations
/////////////////////////////////////////
const previousSessionData = session.restore();
const pageData = {
    htmlCode: previousSessionData.htmlCode ?? '',
    cssCode: previousSessionData.cssCode ?? '',
    jsCode: previousSessionData.jsCode ?? '',
}
const [htmlEditor, cssEditor, jsEditor] = codeEditor.init();



/////////////////////////////////////////
// main()
/////////////////////////////////////////

//
restorePreviousViewState(pageData);

//
listenEditorsChanges(htmlEditor, cssEditor, jsEditor);

//
handleTabsClick();

//
handleResizer();



/////////////////////////////////////////
// functions
/////////////////////////////////////////

function restorePreviousViewState(pageData) {
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

function listenEditorsChanges(htmlEditor, cssEditor, jsEditor) {
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

function handleTabsClick() {
    tabHtml.addEventListener('click', () => {
        uiUtils.activateTab(tabHtml, 'html');
        uiUtils.deactivateTab(tabCss, 'css');
        uiUtils.deactivateTab(tabJs, 'js');

        //
        // htmlEditor.getWrapperElement().hide();
        uiUtils.showElement(editorHtmlView);
        uiUtils.hideElement(editorCssView);
        uiUtils.hideElement(editorJsView);
    });

    tabCss.addEventListener('click', () => {
        uiUtils.activateTab(tabCss, 'css');
        uiUtils.deactivateTab(tabHtml, 'html');
        uiUtils.deactivateTab(tabJs, 'js');

        //
        uiUtils.hideElement(editorHtmlView);
        uiUtils.showElement(editorCssView);
        uiUtils.hideElement(editorJsView);
    });

    tabJs.addEventListener('click', () => {
        uiUtils.activateTab(tabJs, 'js');
        uiUtils.deactivateTab(tabHtml, 'html');
        uiUtils.deactivateTab(tabCss, 'css');

        //
        uiUtils.hideElement(editorHtmlView);
        uiUtils.hideElement(editorCssView);
        uiUtils.showElement(editorJsView);
    });
}



function handleResizer() {
    resizerVertical.addEventListener('mousedown', enableResize);

    document.addEventListener('mouseup', disableResize);

    document.addEventListener('mousemove', resize);
}


function enableResize(ev) {
    ev.preventDefault();

    // If mousedown event is fired from .handler, toggle flag to true
    if (ev.target === resizerVertical) {
        console.log('resize enabled');
        dragAreaHelper.classList.remove('hidden');
        isHandlerDragging = true;
    }

}

function resize(ev) {

    // Don't do anything if dragging flag is false
    if (!isHandlerDragging) {
        return false;
    }

    console.log('DRAGGING');


    // Get offset
    let containerOffsetLeft = wrapper.offsetLeft;

    // Get x-coordinate of pointer relative to container
    let pointerRelativeXpos = ev.clientX - containerOffsetLeft;

    inputSection.style.width = pointerRelativeXpos + 'px';
    // inputSection.style.flexGrow = 0;
}


function disableResize(ev) {
    console.log('resize disabled');
    dragAreaHelper.classList.remove('hidden');
    dragAreaHelper.classList.add('hidden');

    // Turn off dragging flag when user mouse is up
    isHandlerDragging = false;
    // document.removeEventListener('mousemove', resize);
}
