
function message(mes){
    console.log(mes);
}

function saveChanges() {
    var theValue = document.getElementById('text').value;
    if (!theValue) {
        message('Error: No value specified');
        return;
    }
    saveValue(theValue)
    trans2Html(theValue)
}

function  saveValue(text) {
    localStorage.setItem("value",text)
}

function trans2Html(text){
    var converter = new showdown.Converter();
    document.getElementById('show-screen').innerHTML = converter.makeHtml(text);
    message('Settings saved');
}


window.onload=function () {
    var text = localStorage.getItem("value")
    if(text !== undefined){
        document.getElementById('text').value = text
        trans2Html(text)
    }
}

document.onkeyup=function(){
    var oEvent = window.event;
    console.log(oEvent)
    saveChanges();
}




