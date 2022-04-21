const DEVELOPMENT = 'development';
const PRODUCTION = 'production';
let appMode = DEVELOPMENT;


function getAppToken() {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IlJPckdQdHpSMmJqTk5keVVteDY2b1dndENjZVE3Y2VzYlFMY2Jzb3hyZzlHdDNpd1lCIiwiaWF0IjoxNjUwNTM1MDk5LCJleHAiOjE2NTA1MzU5OTl9.rbaEqIgEuJtq5aWMWHmZvX2s5ppXnpmkKZzAN6WdsLU';
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
}