const htmlTextarea = document.querySelector('#editor-html');
const cssTextarea = document.querySelector('#editor-css');
const jsTextarea = document.querySelector('#editor-js');

//
let htmlEditor, cssEditor, jsEditor;

export function init(CodeMirror) {
    const baseConfig = {
        lineWrapping: false,
        lineNumbers: true,
        autoRefresh: true,
        autoCloseBrackets: true,
        autoCloseTags: true,

        lint: true,
        foldGutter: true,
        gutters: ["CodeMirror-lint-markers","CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        tabSize: 2,
        indentUnit: 2,
        matchBrackets: true
    }

    const htmlConfig = {
        ...baseConfig,
        mode: "htmlmixed",
        htmlMode: true,
    };
    const cssConfig = {
        ...baseConfig,
        mode: "css",
    };
    const jsConfig = {
        ...baseConfig,
        mode: "javascript",
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