var s = {
    post: function (url, data, callback) {
        if(data === undefined && callback === undefined){
            xmlHttp = new XMLHttpRequest();
            xmlHttp.timeout = 4000
            xmlHttp.open("POST", url, true);
            xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlHttp.send(data);
        } else {
            if(callback === undefined){
                xmlHttp = new XMLHttpRequest();
                xmlHttp.onreadystatechange = function() {
                    if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
                        data(xmlHttp.responseText);
                }

                xmlHttp.timeout = 4000
                xmlHttp.open("POST", url, true);
                xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xmlHttp.send(data);
            } else {
                xmlHttp = new XMLHttpRequest();
                xmlHttp.onreadystatechange = function() {
                    if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
                        callback(xmlHttp.responseText);
                }

                xmlHttp.timeout = 4000
                xmlHttp.open("POST", url, true);
                xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xmlHttp.send(data);
            }
        }
    },
    get: function (url, data, callback) {
        if(data === undefined && callback === undefined){
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.timeout = 4000
            xmlHttp.open("GET", url, true);
        } else {
            if(callback === undefined){
                xmlHttp = new XMLHttpRequest();
                xmlHttp.onreadystatechange = function() {
                    if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
                        data(xmlHttp.responseText);
                }

                xmlHttp.timeout = 4000
                xmlHttp.open("GET", url, true);
            } else {
                xmlHttp = new XMLHttpRequest();
                xmlHttp.onreadystatechange = function() {
                    if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
                        callback(xmlHttp.responseText);
                }

                xmlHttp.timeout = 4000
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
            url = ''
            for(i = 0; i <= json.length - 1; i++){
                if(i === 0){
                    url += `${encodeURIComponent(json[i].name)}=${encodeURIComponent(json[i].value)}`
                } else {
                    url += `&${encodeURIComponent(json[i].name)}=${encodeURIComponent(json[i].value)}`
                }
            }
            return url
        }
    },
    select: function (i) {
        return document.querySelector(i)
    }
}

//Prototype functions

Object.prototype.toggleClass = function (i) {
    var words = i.split(' ')
    for(n = 0; n <= words.length - 1; n++){
        this.classList.toggle(words[n])
    }
}

Object.prototype.insert = function (i, start = true) {
    if(start){
        this.prepend(i)
    } else {
        this.append(i)
    }
}

Object.prototype.html = function (html = false) {
    if(value === false){
      return this.innerHTML
    } else {
      this.innerHTML = html
      return true
    }
}

Object.prototype.val = function (value = false) {
  if(value === false){
    return this.getAttribute('value')
  } else {
    this.setAttribute('value', value)
    return true
  }
}
