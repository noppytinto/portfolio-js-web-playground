const htmlTextarea = document.querySelector('#editor-html');
const cssTextarea = document.querySelector('#editor-css');
const jsTextarea = document.querySelector('#editor-js');

//
let htmlEditor, cssEditor, jsEditor;

export function init(CodeMirror) {
    const htmlConfig = {
        mode: "htmlmixed",
        htmlMode: true,
        lineNumbers: true,
        autoRefresh: true,
        autoCloseBrackets: true,
        autoCloseTags: true,
    };
    const cssConfig = {
        mode: "css",
        lineNumbers: true,
        autoRefresh: true,
        autoCloseBrackets: true,
        autoCloseTags: true,
    };
    const jsConfig = {
        mode: "javascript",
        lineNumbers: true,
        autoRefresh: true,
        autoCloseBrackets: true,
        autoCloseTags: true,
    };
    htmlEditor = CodeMirror.fromTextArea(htmlTextarea, htmlConfig);
    cssEditor = CodeMirror.fromTextArea(cssTextarea, cssConfig);
    jsEditor = CodeMirror.fromTextArea(jsTextarea, jsConfig);

    return {htmlEditor, cssEditor, jsEditor};
}

export function resetEditors() {
    htmlEditor.setValue('');
    cssEditor.setValue('');
    jsEditor.setValue('');
}