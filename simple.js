var s = {
    post: function (url, data, callback) {
        if(data === undefined && callback === undefined){
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.open("POST", url, true);
            xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlHttp.send(data);
        } else {
            if(callback === undefined){
                let xmlHttp = new XMLHttpRequest();
                xmlHttp.onreadystatechange = function() {
                    if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
                        data(xmlHttp.responseText);
                }

                xmlHttp.open("POST", url, true);
                xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xmlHttp.send(data);
            } else {
                let xmlHttp = new XMLHttpRequest();
                xmlHttp.onreadystatechange = function() {
                    if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
                        callback(xmlHttp.responseText);
                }

                xmlHttp.open("POST", url, true);
                xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xmlHttp.send(data);
            }
        }
    },
    get: function (url, data, callback) {
        if(data === undefined && callback === undefined){
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", url, true);
        } else {
            if(callback === undefined){
                let xmlHttp = new XMLHttpRequest();
                xmlHttp.onreadystatechange = function() {
                    if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
                        data(xmlHttp.responseText);
                }

                xmlHttp.open("GET", url, true);
            } else {
                let xmlHttp = new XMLHttpRequest();
                xmlHttp.onreadystatechange = function() {
                    if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
                        callback(xmlHttp.responseText);
                }

                xmlHttp.open("GET", url, true);
                xmlHttp.send(data);
            }
        }
    },
    jsontourl: function (json) {
        if(json === undefined){
            console.log('Error')
            return false
        } else {
            let url = ''
            for(i = 0; i <= json.length - 1; i++){
                if(i === 0){
                    url += `${encodeURIComponent(json[i].name)}=${encodeURIComponent(json[i].value)}`
                } else {
                    url += `&${encodeURIComponent(json[i].name)}=${encodeURIComponent(json[i].value)}`
                }
            }
            return url
        }
    }
}