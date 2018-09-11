
function saveChanges() {
    var theValue = document.getElementById('text').value;
    if (!theValue) {
        console.log('Error: No value specified');
        return;
    }
    saveValue(theValue)
    trans2Html(theValue)
}

function  saveValue(text) {
    storage.setItem("value",text,7*86400)
}

function trans2Html(text){
    var converter = new showdown.Converter();
    document.getElementById('show-screen').innerHTML = converter.makeHtml(text);
    console.log('Settings saved');
}

//页面加载
window.onload=function () {
    var text = storage.getItem("value")
    if(text !== undefined){
        document.getElementById('text').value = text
        trans2Html(text)
    }
}

//页面关闭
window.onunload = function(){

}

//页面输入的时候
document.onkeyup=function(){
    var oEvent = window.event;
    console.log(oEvent)
    saveChanges();
}




