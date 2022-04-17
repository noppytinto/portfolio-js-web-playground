import * as configManager from '../utils/config-manager';


export function authorizeApp(onSuccess, onFailed) {
    let url = 'http://localhost:3000/auth/authorize-app';
    if (configManager.isProductionMode()) {
        url = 'https://noppytinto-web-playground.herokuapp.com/auth/authorize-app';
    }

    const request = new Request(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${configManager.getAppToken()}`,
        }),
        credentials: 'include',
    });

    // get access token
    fetch(request)
        .then((res) => res.json())
        .then((data) => {
            // store token
            window.localStorage.setItem('token', data.token);
            onSuccess();
        })
        .catch((err) => {
            console.error('TOKEN REQUEST ERROR:', err);
            onFailed();
        });
}