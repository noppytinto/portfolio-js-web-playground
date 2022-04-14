import * as configService from './config-service';


export function authorizeApp(onSuccess, onFailed) {
    let url = 'http://localhost:3000/admin/authorize-app';
    if (configService.isProductionMode()) {
        url = 'https://noppytinto-web-playground.herokuapp.com/admin/authorize-app';
    }

    const request = new Request(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${configService.getAppToken()}`,
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