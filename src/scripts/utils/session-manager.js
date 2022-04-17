const HTML_CODE_KEY = 'htmlCode';
const CSS_CODE_KEY = 'cssCode';
const JS_CODE_KEY = 'jsCode';


export function save(bundle) {
    window.localStorage.setItem(HTML_CODE_KEY, bundle.htmlCode);
    window.localStorage.setItem(CSS_CODE_KEY, bundle.cssCode);
    window.localStorage.setItem(JS_CODE_KEY, bundle.jsCode);
}

export function destroy() {
    window.localStorage.removeItem('htmlCode');
    window.localStorage.removeItem('cssCode');
    window.localStorage.removeItem('jsCode');    
}

export function restore() {
    const bundle = {};
    bundle.htmlCode = localStorage.getItem('htmlCode') ?? '';
    bundle.cssCode = localStorage.getItem('cssCode') ?? '';
    bundle.jsCode = localStorage.getItem('jsCode') ?? '';
    return bundle;
}

