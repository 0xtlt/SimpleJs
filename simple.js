var s;
(function(s){

  var now = []

  var mouse = [{x: 0,y: 0}]

    s.post = function (url, data, callback) {
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
    }
    s.get = function (url, data, callback) {
        if(data === undefined && callback === undefined){
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.timeout = 4000
            xmlHttp.open("GET", url, true);
            xmlHttp.send();
        } else {
            if(callback === undefined){
                xmlHttp = new XMLHttpRequest();
                xmlHttp.onreadystatechange = function() {
                    if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
                        data(xmlHttp.responseText);
                }

                xmlHttp.timeout = 4000
                xmlHttp.open("GET", url, true);
                xmlHttp.send();
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
    }
    s.jsonToUrl = function (json) {
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
    }
    s.select = function (i) {
        return document.querySelector(i)
    }
    s.change = function(element, html){
      if(element.substr(0, 1) === '#'){
        var found = false
        if(now.length !== 0){
          for(i = 0; i <= now.length - 1; i++){
            if(now[i].el === element){
              found = true
              if(now[i].html !== html){
                now[i].html = html
                s.select(element).html(html)
              }
            }
          }
        }
        if(found === false){
          now.push({
            el: element,
            html: html
          })
          s.select(element).html(html)
        }
        return true
      } else {
        return false
      }
    }



    // Mobile swipe

    var params_swipe = {toTop: function(){}, toBottom: function(){}, toLeft: function(){}, toRight: function(){}}

    function printMousePos(event, params) {
      var screen_width = document.body.offsetWidth
      var screen_height = document.body.offsetHeight
      var start = mouse[0].x
      var startY = mouse[0].y
      var doit = ((screen_width / 3) * 2)
      var doitY = ((screen_height / 3) * 2)
      var end = event.changedTouches[0].clientX - start
      var endY = event.changedTouches[0].clientY - startY

      if(end > doit){
          mouse = []
          params_swipe.toRight()
      } else if(end < -doit) {
          params_swipe.toLeft()
          mouse = []
      } else if(endY > doitY){
          params_swipe.toBottom()
          mouse = []
      } else if(endY < -doitY){
          params_swipe.toTop()
          mouse = []
      }
    }

    let pointer = (e) => {
        mouse.push({
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY
        })
    };

    let pointerstart = (e) => {
        mouse = []
        mouse.push({
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY
        })
    }
    s.mobileswipe = function(params = {toTop: function(){}, toBottom: function(){}, toLeft: function(){}, toRight: function(){}}){
      if(params.toTop !== undefined){
        params_swipe.toTop = params.toTop
      }
      if(params.toBottom !== undefined){
        params_swipe.toBottom = params.toBottom
      }
      if(params.toLeft !== undefined){
        params_swipe.toLeft = params.toLeft
      }
      if(params.toRight !== undefined){
        params_swipe.toRight = params.toRight
      }
      document.addEventListener("touchstart", pointerstart, false);
      document.addEventListener("touchend", printMousePos, false);
      document.addEventListener("touchcancel", pointer, false);
      document.addEventListener("touchmove", pointer, false);
    }
})(s || (s = {}))

//Prototype functions

Object.prototype.toggleClass = function (i) {
    var words = i.split(' ')
    for(n = 0; n <= words.length - 1; n++){
        this.classList.toggle(words[n])
    }
    return this
}

Object.prototype.html = function (html = false) {
    if(html === false){
      return this.innerHTML
    } else {
      this.innerHTML = html
      return this
    }
}

Object.prototype.val = function (value = false) {
  if(value === false){
    return this.getAttribute('value')
  } else {
    this.setAttribute('value', value)
    return this
  }
}

Object.prototype.check_input = function(params = {min_letters: 2, max_letters: 50, forbidden_characters: []}){
  var default_params = {min_letters: 2, max_letters: 50, forbidden_characters: []}
  if(params.min_letters !== undefined){
    default_params.min_letters = params.min_letters
  }
  if(params.max_letters !== undefined){
    default_params.max_letters = params.max_letters
  }
  if(params.forbidden_characters !== undefined){
    default_params.forbidden_characters = params.forbidden_characters
  }

  if(this.value.length < default_params.min_letters){
    return false
  } else {
    if(this.value.length > default_params.max_letters){
      return false
    } else {
      var final = true
      for(i = 0; i <= default_params.forbidden_characters.length - 1; i++){
        if(this.value.indexOf(default_params.forbidden_characters[i]) != "-1"){
          final = false
        }
      }
      return final
    }
  }
}

Object.prototype.sup = function (element) {
    if(element !== undefined){
        return this.querySelector(element)
    } else {
        return this
    }
}

Object.prototype.press = function(callback = function(){}){
    this.onclick = callback
    return this
}
