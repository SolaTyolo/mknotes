(function(window){
    var storage = {};
    
    //判断浏览器是否支持localStorage
    if(!window.localStorage){
        storage.support = false;
    }else{
        storage.support = true;
    }

    // @params key string 
    // @params value string object
    // @params ttl number
    storage.setItem = function(key,value,ttl) {
        console.log(ttl)
        if(this.support){
            //localStorage储存
            if(typeof key != 'string'){
                console.log('localStorage key只支持字符串');
                return ; 
            }
            //time 设置
            time = null
            if (ttl){
                if (typeof ttl != 'number'){
                    console.log('时间必须是整数');
                    return ;
                }else{
                    time = parseInt(ttl) + (new Date()).getTime();
                }
            }

            //将value和time一同存入
            var setValue = {
                value: JSON.stringify(value),
                time: time
            }
            localStorage.setItem(key,JSON.stringify(setValue));
        }else{
            storage.setCookie(key, value, ttl)
        }
    };

    //获取
    storage.getItem = function(key) {
        if(this.support){
            //获取第一层信息
            var getValue = JSON.parse(localStorage.getItem(key));
            if(!getValue){
                return null;
            }
            //根据时间
            if(getValue.time && getValue.time < (new Date()).getTime()){
                localStorage.removeItem(key);
                return null;
            }else{
                return JSON.parse(getValue.value) 
            }
        }else{
            storage.getCookie(key)
        }
    };

    //移除
    storage.removeItem = function(key) {
        if(this.support){
            localStorage.removeItem(key);
        }else{
            storage.removeCookie(key);
        }
    };

    //清空
    storage.clear = function(){
        if (this.support) {
            localStorage.clear();
        } else {
            storage.clearCookie();
        }
    }

    storage.setCookie = function(key, value, ttl){
        if (typeof key != 'string') {
            console.log('cookie key只支持字符串');
            return;
        }else{
           if(typeof time != "number"){
               time = 365 * 86400 * 1000;
           } 
           var d = new Date();
           d.setTime(d.getTime() + time());
           document.cookie = key + "=" + value + ";expires=" + d.toGMTString();
        }
    };

    storage.getCookie = function(key){
        var cookies = document.cookie.splite(";")
        var cookieValue;
        for(var i=0;i<cookies.length;i++){
            if(key == cookies[i].splite('=')[0]){
                cookieValue = cookies[i].splite('=')[1];
                break;
            }
        }
        return cookieValue;
    };

    storage.removeCookie = function(key){
        document.cookie = key + "=;expires=Thu 01 Jan 1970 00:00:00 GMT";
    };

    storage.clearCookie = function(){
        var cookies = document.cookie.split(';')
        for(var i=0;i<cookies.length;i++){
            storage.removeCookie(cookies[i].split('=')[0])
        }
    };

    window.storage = storage;

})(window);