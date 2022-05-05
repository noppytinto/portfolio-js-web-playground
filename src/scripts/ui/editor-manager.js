const htmlTextarea = document.querySelector('#editor-html');
const cssTextarea = document.querySelector('#editor-css');
const jsTextarea = document.querySelector('#editor-js');

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
    const htmlEditor = CodeMirror.fromTextArea(htmlTextarea, htmlConfig);
    const cssEditor = CodeMirror.fromTextArea(cssTextarea, cssConfig);
    const jsEditor = CodeMirror.fromTextArea(jsTextarea, jsConfig);

    return {htmlEditor, cssEditor, jsEditor};
}