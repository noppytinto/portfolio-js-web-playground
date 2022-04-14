import * as configService from './services/config-service';
import * as uiService from './services/ui-service';
import * as session from './session';
import { clearMyTimeout } from './misc-utils';

/////////////////////////////////////////
// declarations
/////////////////////////////////////////
let timeout;
const DEBOUNCE_DELAY = 2000;

export function generatePage(pageData) {
    console.log('generating page...');
    uiService.showLoadingSpinner();

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
            uiService.updateFrame(data);
            uiService.hideLoadingSpinner();
            session.save(pageData);
        })
        .catch((err) => {
            console.error('PAGE REQUEST ERROR:', err);
        });
}

export function buildRequest(pageData) {
    const payload = buildPayload(pageData);

    let url = 'http://localhost:3000/page/generate';
    if (configService.isProductionMode()) {
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