import * as configManager from '../utils/config-manager';
import * as uiManager from './ui-manager';
import * as session from '../utils/session-manager';
import { clearMyTimeout } from '../utils/misc-utils';
import * as authService from '../services/auth-service';


/////////////////////////////////////////
// DECLARATIONS
/////////////////////////////////////////
let timeout;
const DEBOUNCE_DELAY = 2000;

export function generatePage(htmlCode, cssCode, jsCode) {
    console.log('generating page...');
    uiManager.showLoadingSpinner();

    //
    clearMyTimeout(timeout);

    //
    timeout = setTimeout(async () => {
        // TODO
        // uiManager.updateFrame_offline(htmlCode, cssCode, jsCode);
        // uiManager.hideLoadingSpinner();
        // session.save(pageData);

        //
        const htmlBlobPage = await requestPage(htmlCode, cssCode, jsCode)
        if (htmlBlobPage) {
            uiManager.updateFrame(htmlBlobPage);
            uiManager.hideLoadingSpinner();
            session.save({htmlCode, cssCode, jsCode});
        }

    }, DEBOUNCE_DELAY)
}

// PRE-CONDITIONS: htmlCode, cssCode, jsCode are strings
// POST-CONDITIONS: returns an html page in blob format
export async function requestPage(htmlCode, cssCode, jsCode) {
    let htmlBlobPage = null;

    try {
        const request = buildRequest(htmlCode, cssCode, jsCode, 
                                     configManager.getUrlPageGenerator(), 
                                     authService.getToken());
        const res = await fetch(request);
        htmlBlobPage = await res.blob();
    } catch(err) {
        console.error('PAGE REQUEST ERROR:', err);
    }

    return htmlBlobPage;
}

export function buildRequest(htmlCode, cssCode, jsCode, url, token) {
    const payload = buildPayload(htmlCode, cssCode, jsCode);

    const request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }),
        credentials: 'include',
    });

    return request;
}

export function buildPayload(htmlCode, cssCode, jsCode) {
    const payload = {
        htmlCode: `${htmlCode}`,
        cssCode: `${cssCode}`,
        jsCode: `${jsCode}`
    }

    return payload;
}