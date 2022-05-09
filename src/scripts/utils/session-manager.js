const HTML_CODE_KEY = 'htmlCode';
const CSS_CODE_KEY = 'cssCode';
const JS_CODE_KEY = 'jsCode';


export function save(bundle) {
    window.localStorage.setItem(HTML_CODE_KEY, bundle.htmlCode);
    window.localStorage.setItem(CSS_CODE_KEY, bundle.cssCode);
    window.localStorage.setItem(JS_CODE_KEY, bundle.jsCode);
}

export function destroy() {
    window.localStorage.removeItem(HTML_CODE_KEY);
    window.localStorage.removeItem(CSS_CODE_KEY);
    window.localStorage.removeItem(JS_CODE_KEY);    
}

export function restoreEditorData() {
    const bundle = {};
    bundle.htmlCode = localStorage.getItem(HTML_CODE_KEY) ?? '';
    bundle.cssCode = localStorage.getItem(CSS_CODE_KEY) ?? '';
    bundle.jsCode = localStorage.getItem(JS_CODE_KEY) ?? '';

    return bundle;
}

