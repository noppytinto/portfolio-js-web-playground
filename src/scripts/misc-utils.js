
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



