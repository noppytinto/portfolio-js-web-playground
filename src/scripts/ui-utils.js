const loadingSpinner = document.querySelector('.loading');
const outputIframe = document.querySelector('#output__canvas');


export function showLoadingSpinner() {
    loadingSpinner.classList.remove('hidden');
}

export function hideLoadingSpinner() {
    loadingSpinner.classList.add('hidden');
}

export function updateFrame(pageData) {
    outputIframe.setAttribute('src', pageData.pageUrl);
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