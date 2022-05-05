import * as configManager from '../utils/config-manager';
const JWT_TOKEN_KEY = 'jwt-token';

export function authorizeApp(onSuccess, onFailed) {
    const url = configManager.getUrlAppAuthorization();

    // create request
    const request = new Request(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${configManager.getAppToken()}`,
        }),
        credentials: 'include',
    });

    console.log('REQUEST', request);

    // make access token request
    fetch(request)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            // store token
            _saveToken(data.token);
            onSuccess();
        })
        .catch((err) => {
            console.error('TOKEN REQUEST ERROR:', err);
            onFailed(err);
        });
}

function _saveToken(token) {
    window.localStorage.setItem(JWT_TOKEN_KEY, token);
}

export function getToken() {
    return window.localStorage.getItem(JWT_TOKEN_KEY);
}