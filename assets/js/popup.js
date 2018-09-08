
function message(mes){
    console.log(mes);
}

function saveChanges() {
    var theValue = document.getElementById('text').value;
    if (!theValue) {
        message('Error: No value specified');
        return;
    }
    trans2Html(theValue)
}

function trans2Html(text){
    chrome.storage.sync.set({ 'value': text }, function () {
        document.getElementById('show-screen').innerHTML = marked(text);
        message('Settings saved');
    });
}

window.onload=function () {
    chrome.storage.sync.get(['value'], function (result) {
        var text = result.value
        document.getElementById('text').value = text
        trans2Html(text)
    });  
}

document.onkeyup=function(){
    var oEvent = window.event;
    console.log(oEvent)
    saveChanges();
}




