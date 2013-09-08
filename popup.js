
function query() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        alert(tabs[0].url);
    }
}
alert("ooxx");
window.onload = query;
