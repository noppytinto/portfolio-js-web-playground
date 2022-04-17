import * as configManager from '../utils/config-manager';
import * as uiManager from './ui-manager';
import * as session from '../utils/session-manager';
import { clearMyTimeout } from '../utils/misc-utils';

/////////////////////////////////////////
// declarations
/////////////////////////////////////////
let timeout;
const DEBOUNCE_DELAY = 2000;

export function generatePage(pageData) {
    console.log('generating page...');
    uiManager.showLoadingSpinner();

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
        .then((res) => res.blob())
        .then((data) => {
            uiManager.updateFrame(data);
            uiManager.hideLoadingSpinner();
            session.save(pageData);
        })
        .catch((err) => {
            console.error('PAGE REQUEST ERROR:', err);
        });
}

export function buildRequest(pageData) {
    const payload = buildPayload(pageData);

    let url = 'http://localhost:3000/page/generate';
    if (configManager.isProductionMode()) {
        url = 'https://noppytinto-web-playground.herokuapp.com/page/generate';
    }

    const request = new Request(url, {
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