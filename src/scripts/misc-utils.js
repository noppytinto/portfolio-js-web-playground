
export function clearMyTimeout(timeout) {
    if (!timeout) return;
    //
    clearTimeout(timeout);
}


export function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

export function authorizeApp(cb) {
    // TODO: production
    const URL = 'https://noppytinto-web-playground.herokuapp.com/admin/authorize-app';

    // development
    // const URL = 'http://localhost:3000/admin/authorize-app';
    const request = new Request(URL, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6ImFFUWs1TzVLTnhVMXhNUXRPV3REWTNRRXN4eWtzdkZqZmxsTHl3ckVzV0tZOGpvMnczIiwiaWF0IjoxNjQ5ODYyMDQ2LCJleHAiOjE2ODE0MTk2NDZ9.IX1T47VrkCbHPWywrdjKUbv4JaCGNZ7aDtktXhwof_4',
        }),
        credentials: 'include',
    });

    // get access token
    fetch(request)
        .then((res) => res.json())
        .then((data) => {
            // store token
            window.localStorage.setItem('token', data.token);
            cb();
        })
        .catch((err) => {
            console.error('TOKEN REQUEST ERROR:', err);
        });
}


