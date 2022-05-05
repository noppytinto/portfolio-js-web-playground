const DEVELOPMENT = 'development';
const PRODUCTION = 'production';
let appMode = DEVELOPMENT;

function getUrlPageGenerator() {
    let url = 'http://localhost:3000/page/generate';
    if (isProductionMode()) {
        url = 'https://noppytinto-web-playground.herokuapp.com/page/generate';
    }

    return url;
}

function getUrlAppAuthorization() {
    let url = 'http://localhost:3000/auth/authorize-app';
    if (isProductionMode()) {
        url = 'https://noppytinto-web-playground.herokuapp.com/auth/authorize-app';
    }
    
    return url;
}


function getAppToken() {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IlJPckdQdHpSMmJqTk5keVVteDY2b1dndENjZVE3Y2VzYlFMY2Jzb3hyZzlHdDNpd1lCIiwiaWF0IjoxNjUwNTYzMjg5LCJleHAiOjE2ODIxMjA4ODl9.qpH-Trp90rK2vVz1YxPPX-zsiXk78H_1LaF6F_m5SFw';
}

function isDevelopmentMode() {
    return appMode === DEVELOPMENT;
}

function isProductionMode() {
    return appMode === PRODUCTION;
}

function setAppMode(givenMode) {
    appMode = givenMode;
    console.log('APP MODE:', appMode);
}

function getAppMode() {
    return appMode;
}


//
export {
    getAppToken,
    isProductionMode,
    isDevelopmentMode,
    setAppMode,
    getAppMode,
    getUrlPageGenerator,
    getUrlAppAuthorization,
}