const DEVELOPMENT = 'development';
const PRODUCTION = 'production';
let appMode = DEVELOPMENT;


function getAppToken() {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6ImFFUWs1TzVLTnhVMXhNUXRPV3REWTNRRXN4eWtzdkZqZmxsTHl3ckVzV0tZOGpvMnczIiwiaWF0IjoxNjQ5ODYyMDQ2LCJleHAiOjE2ODE0MTk2NDZ9.IX1T47VrkCbHPWywrdjKUbv4JaCGNZ7aDtktXhwof_4';
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