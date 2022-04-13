import * as uiUtils from './ui-utils';
import * as session from './session';
import { clearMyTimeout } from './misc-utils';

/////////////////////////////////////////
// declarations
/////////////////////////////////////////
let timeout;
const DEBOUNCE_DELAY = 2000;

export function generatePage(pageData) {
    console.log('generating page...');
    uiUtils.showLoadingSpinner();

    //
    clearMyTimeout(timeout);

    //
    timeout = setTimeout(() => {
       requestPage(pageData);
    }, DEBOUNCE_DELAY)
}

export function requestPage(pageData) {
    const request = buildRequest(pageData);

    fetch(request)
        .then((res) => res.json())
        .then((data) => {
            uiUtils.updateFrame(data);
            uiUtils.hideLoadingSpinner();
            session.save(pageData);
        })
        .catch((err) => {
            console.error('PAGE REQUEST ERROR:', err);
        });
}

export function buildRequest(pageData) {
    const payload = buildPayload(pageData);

    // TODO
    const URL = 'https://noppytinto-web-playground.herokuapp.com/page/generate';

    //
    // const URL = 'http://localhost:3000/page/generate';

    const request = new Request(URL, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`
        }),
        credentials: 'include',
    });

    return request;
}

export function buildPayload(data) {
    const payload = {
        htmlCode: `${data.htmlCode}`,
        cssCode: `${data.cssCode}`,
        jsCode: `${data.jsCode}`
    }

    return payload;
}