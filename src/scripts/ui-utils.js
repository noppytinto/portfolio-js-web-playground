const loadingSpinner = document.querySelector('.loading');
const outputIframe = document.querySelector('#output__canvas');


export function showLoadingSpinner() {
    loadingSpinner.classList.remove('hidden');
}

export function hideLoadingSpinner() {
    loadingSpinner.classList.add('hidden');
}

export function updateFrame(pageData) {
    // TODO
    // const url = 'https://noppytinto-web-playground.herokuapp.com/page/request';

    const url = pageData.pageUrl;
    const request = new Request(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`
        }),
        credentials: 'include',
    });

    fetch(request)
        .then((res) => res.blob())
        .then((data) => {
            // store token
            console.log('DATA', data);
            const data_url = URL.createObjectURL(data);
            console.log('data_url', data_url);
            outputIframe.setAttribute('src', data_url);
        })
        .catch((err) => {
            console.error('CANNOT REQUEST GENERATED PAGE:', err);
        });

}


export function activateTab(tab, tabName) {
    tab.classList.remove(`input__tab-button--${tabName}--active`);
    tab.classList.add(`input__tab-button--${tabName}--active`);
}

export function deactivateTab(tab, tabName) {
    tab.classList.remove(`input__tab-button--${tabName}--active`);
}

export function hideElement(element) {
    element.classList.remove('hidden');
    element.classList.add('hidden');
}

export function showElement(element) {
    element.classList.remove('hidden');
}