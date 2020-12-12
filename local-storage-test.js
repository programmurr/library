function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except firefox
            e.name ==="QuotaExceededError" ||
            //Firefox
            e.name == "NS_ERROR_DOM_QUOTA_REACHED") &&
            // acknowledge quota exceeded error only if there's something already stored
            (storage && storage.length !== 0);
    }
}

if (storageAvailable('localStorage')) {
    console.log("success!");
} else {
    console.log("nope!");
}