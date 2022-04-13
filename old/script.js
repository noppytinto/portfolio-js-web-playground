
/////////////////////////////////////////
// dom elements
/////////////////////////////////////////
const outputCanvas = document.querySelector('#canvas');
const htmlTextarea = document.querySelector('#html');
const cssTextarea = document.querySelector('#css');
const jsTextarea = document.querySelector('#js');

const config = {
    mode:  "htmlmixed",
    htmlMode: true,
    lineNumbers: true,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
    lint: true,
    matchTags: {bothTags: true}
};
var myCodeMirror = CodeMirror.fromTextArea(htmlTextarea, config);


// var editor = CodeMirror.fromTextArea(htmlTextarea, {
//     height: "350px",
//     parserfile: ["parsexml.js", "parsecss.js", "tokenizejavascript.js", "parsejavascript.js", "parsehtmlmixed.js"],
//     stylesheet: ["css/xmlcolors.css", "css/jscolors.css", "css/csscolors.css"],
//     path: "js/"
// });



// var myCodeMirror = CodeMirror(function(elt) {
//     htmlTextarea.parentNode.replaceChild(elt, htmlTextarea);
// }, {value: htmlTextarea.value, mode: "html"});

//
// /////////////////////////////////////////
// // declarations
// /////////////////////////////////////////
// const debounceDelay = 1500;
// let timeoutHtml;
// let timeoutCss;
// let timeoutJavascript;
// //
// let inputHtmlDocument;
// console.log(inputHtmlDocument);
// let parsedCss;
// let parsedJavascript;
// let iframeDocument;
//
//
//
// /////////////////////////////////////////
// // main()
// /////////////////////////////////////////
//
// // create initial htmlDocument and iframeDocument
// inputHtmlDocument = createHtmlDocument(htmlTextarea);
// iframeDocument = outputCanvas.contentWindow.document;
//
//
//
// //
// htmlTextarea.addEventListener('input', (ev) => {
//     const htmlCode = ev.target.value;
//
//     //
//     if (timeoutHtml) {
//         clearTimeout(timeoutHtml);
//         console.log('HTML timeout cleared');
//     }
//
//     //
//     timeoutHtml = setTimeout(() => {
//         console.log('HTML timeout executed:');
//         console.log('HTML code: ', htmlCode);
//
//         const sanitizedHtmlCode = sanitizeHtmlCode(htmlCode);
//
//         //
//         applyBody(iframeDocument, sanitizedHtmlCode);
//     }, debounceDelay)
// });
//
// function applyBody(document, htmlBodyCode) {
//     // clear old body
//     removeAllChildNodes(document.body)
//
//     // write new body
//     // document.srcdoc = htmlBodyCode;
//     document.open();
//     document.write(htmlBodyCode);
//     document.close();
// }
//
//
//
// cssTextarea.addEventListener('input', (ev) => {
//     const cssCode = ev.target.value;
//
//     if (timeoutCss) {
//         clearTimeout(timeoutCss);
//         console.log('CSS timeout cleared');
//     }
//
//
//     timeoutCss = setTimeout(() => {
//         console.log('CSS timeout executed:');
//         console.log('CSS code: ', cssCode);
//
//         applyStyle(iframeDocument, cssCode);
//
//     }, debounceDelay)
// });
//
// function applyStyle(document, cssCode) {
//     const styleElements = document.head.getElementsByTagName('style');
//     if (styleElements.length !== 0) {
//         console.log('old style: ', styleElements);
//         // remove old style
//         for (const el of styleElements) {
//             el.remove();
//         }
//     }
//
//
//     // apply new style
//     const styleElement = document.createElement('style');
//     styleElement.textContent = cssCode;
//     document.head.appendChild(styleElement);
//     console.log('new style: ', styleElement);
// }
//
// jsTextarea.addEventListener('input', (ev) => {
//     const jsCode = ev.target.value;
//
//     if (timeoutJavascript) {
//         clearTimeout(timeoutJavascript);
//         console.log('JS timeout cleared');
//     }
//
//
//     timeoutJavascript = setTimeout(() => {
//         console.log('JS timeout executed:');
//         console.log('JS code: ', jsCode);
//
//         applyScript(iframeDocument, jsCode);
//
//     }, debounceDelay)
// });
//
// function applyScript(document, jsCode) {
//     const scriptElements = document.head.getElementsByTagName('script');
//     if (scriptElements.length !== 0) {
//         console.log('old scripts: ', scriptElements);
//         // remove old style
//         for (const el of scriptElements) {
//             el.remove();
//         }
//     }
//
//
//     // apply new style
//     const scriptElement = document.createElement('script');
//     scriptElement.textContent = jsCode;
//     document.head.appendChild(scriptElement);
//     console.log('new script: ', scriptElement);
// }



/////////////////////////////////////////
// functions
/////////////////////////////////////////
function sanitizeHtmlCode(htmlCode) {
    const inputHtmlDocument = createHtmlDocument(htmlCode);
    if ( ! inputHtmlDocument) return '';

    const sanitizedHtmlCode = inputHtmlDocument.documentElement.outerHTML;
    return sanitizedHtmlCode;
}

function createHtmlDocument(htmlString) {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(htmlString, "text/html");
    return doc;
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
