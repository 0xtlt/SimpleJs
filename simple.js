let ss = Object;
(function(ss){

    ss.el = function (el) {
        let le = document.querySelectorAll(el);
        if(le.length === 1){
            return le[0]
        } else {
            return le
        }
    };

    ss.jsonToUrl = function (json) {
        if(json === undefined){
            console.error('Error');
            return false
        } else {
            let url = '';
            for(i = 0; i <= json.length - 1; i++){
                if(i === 0){
                    url += `${encodeURIComponent(json[i].name)}=${encodeURIComponent(json[i].value)}`
                } else {
                    url += `&${encodeURIComponent(json[i].name)}=${encodeURIComponent(json[i].value)}`
                }
            }
            return url
        }
    };

    ss.post = function (url, data) {
        if (data === undefined) {
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.timeout = 4000;
            xmlHttp.open("POST", url, true);
            xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlHttp.send(data);
        } else {
            let default_params = {
                params: [],
                timeout: 4000,
                success: function (result) {

                },
                error: function (result) {

                }
            };

            if (data.params) {
                default_params.params = data.params

            }
            if (data.timeout) {
                default_params.timeout = data.timeout
            }
            if (data.success) {
                default_params.success = data.success
            }
            if (data.error) {
                default_params.error = data.error
            }

            let xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
                    default_params.success(xmlHttp.responseText);
            };

            xmlHttp.timeout = 4000;
            xmlHttp.open("POST", url, true);
            xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlHttp.send(ss.jsonToUrl(default_params.params));
        }
    };

    ss.get = function (url, data) {
        if (data === undefined) {
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.timeout = 4000;
            xmlHttp.open("GET", url, true);
            xmlHttp.send(data);
        } else {
            let default_params = {
                params: [],
                timeout: 4000,
                success: function (result) {

                },
                error: function (result) {

                }
            };

            if (data.params) {
                default_params.params = data.params

            }
            if (data.timeout) {
                default_params.timeout = data.timeout
            }
            if (data.success) {
                default_params.success = data.success
            }
            if (data.error) {
                default_params.error = data.error
            }

            let xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
                    default_params.success(xmlHttp.responseText);
            };

            xmlHttp.timeout = 4000;
            xmlHttp.open("GET", url, true);
            xmlHttp.send(ss.jsonToUrl(default_params.params));
        }
    };

    // MOBILE SWIPE

    let mouse = [{x: 0,y: 0}];
    let params_swipe = {toTop: function(){}, toBottom: function(){}, toLeft: function(){}, toRight: function(){}};

    function printMousePos(event, params) {
        let screen_width = document.body.offsetWidth;
        let screen_height = document.body.offsetHeight;
        let start = mouse[0].x;
        let startY = mouse[0].y;
        let doit = screen_width / 4;
        let doitY = screen_height / 4;
        let end = event.changedTouches[0].clientX - start;
        let endY = event.changedTouches[0].clientY - startY;

        if(start < doit && start >= 0 && end > doit){
            mouse = [];
            params_swipe.toRight()
        } else if(end < -doit) {
            params_swipe.toLeft();
            mouse = []
        } else if(endY > doitY){
            params_swipe.toBottom();
            mouse = []
        } else if(endY < -doitY){
            params_swipe.toTop();
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
        mouse = [];
        mouse.push({
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY
        })
    };

    ss.mobileswipe = function(params = {toTop: function(){}, toBottom: function(){}, toLeft: function(){}, toRight: function(){}}){
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
    };

    // PAGES FUNCTIONS

    let syspages = [];

    ss.pages = function(pages_ = []){
        if(pages_.length === 0){
            return false
        } else {
            for(i = 0; i <= pages_.length - 1; i++){
                syspages.push({
                    name: pages_[i].name,
                    el: pages_[i].el
                });
                if(i !== 0){
                    ss.el(pages_[i].el).style = 'diplay: none'
                }
            }
        }
    };

    ss.page = function(page = ''){
        for(i = 0; i <= syspages.length - 1; i++){
            if(page === syspages[i].name){
                ss.el(syspages[i].el).style = 'display: inherit'
            } else {
                ss.el(syspages[i].el).style = 'display: none'
            }
        }
    };

    // TURBO PAGE FUNCTION | future function

    let actual_turbo_page = 'nolaunched.nodejs';
    let functions_events = [];
    const execute_all_turbo_functions = function(){
      functions_events.forEach((callback) => {
          callback(window.location.pathname);
      });
    };

    setInterval(() => {
       if(actual_turbo_page !== 'nolaunched.nodejs' && actual_turbo_page !== window.location.pathname){
           actual_turbo_page = window.location.pathname;
           ss.get(window.location.pathname, {
               success: function (result) {
                   if(result.indexOf('<body>') === -1){
                       console.warn('error on turboOn() call function')
                   } else {
                       let extdom = (new DOMParser()).parseFromString(result, "text/html");
                       extdom.body.sel('script').forEach((e) => {
                           if(e.getAttribute('ss-turbo-reload') === 'false'){
                               e.remove();
                           }
                       });
                       extdom.head.sel('script').forEach((e) => {
                           if(e.getAttribute('ss-turbo-reload') === 'false'){
                               e.remove();
                           }
                       });
                       document.head = extdom.head;
                       document.body = extdom.body;
                       ss.turboOn();
                       execute_all_turbo_functions();
                   }
               }
           })

       }
    }, 100);

    ss.turboOn = function(){
        actual_turbo_page = window.location.pathname;
        ss.el('a').forEach((el) => {
            let link = el.getAttribute('href');
            if(link.indexOf(window.location.host) === -1 && link.substr(0, 4) === 'http'){
                return false
            } else {
                el.press((e) => {
                    window.history.pushState('', '', e.target.getAttribute('ss-turbo-link'));
                    ss.get(e.target.getAttribute('ss-turbo-link'), {
                        success: function (result) {
                            if(result.indexOf('<body>') === -1){
                                console.error('error on turboOn() call function')
                            } else {
                                let extdom = (new DOMParser()).parseFromString(result, "text/html");
                                extdom.body.sel('script').forEach((e) => {
                                    if(e.getAttribute('ss-turbo-reload') === 'false'){
                                        e.remove();
                                    }
                                });
                                extdom.head.sel('script').forEach((e) => {
                                    if(e.getAttribute('ss-turbo-reload') === 'false'){
                                        e.remove();
                                    }
                                });
                                document.head = extdom.head;
                                document.body = extdom.body;
                                ss.turboOn();
                                execute_all_turbo_functions();
                            }
                        }
                    })
                });
                el.setAttribute('onclick', 'return false;');
                el.setAttribute('ss-turbo-link', link)

            }
        })
    };

    ss.onTurbo = function(callback){
        functions_events.push(callback)
    };

    // PROTOTYPE FUNCTIONS

    ss.prototype.sel = function (el) {
        let le = this.querySelectorAll(el);
        if(le.length === 1){
            return le[0]
        } else {
            return le
        }
    };

    ss.prototype.html = function (html = false) {
        if(html === false){
            return this.innerHTML
        } else {
            this.innerHTML = html;
            return this
        }
    };

    ss.prototype.val = function (value = false) {
        if(value === false){
            return this.value
        } else {
            this.value = value;
            return this
        }
    };

    ss.prototype.toggleClass = function (i) {
        let words = i.split(' ');
        for(n = 0; n <= words.length - 1; n++){
            this.classList.toggle(words[n])
        }
        return this
    };

    ss.prototype.press = function(callback = function(){}){
        this.addEventListener("click", callback, false);
        return this
    };

    ss.prototype.check_input = function(params = {min_letters: 2, max_letters: 50, forbidden_characters: []}){
        let default_params = {min_letters: 0, max_letters: 9999999999, forbidden_characters: []};
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
                let final = true;
                for(i = 0; i <= default_params.forbidden_characters.length - 1; i++){
                    if(this.value.indexOf(default_params.forbidden_characters[i]) !== -1){
                        final = false
                    }
                }
                return final
            }
        }
    };

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    let now = [];

    ss.prototype.change = function(html){
            let found = false;
            let unique_id = 0;
            if(this.getAttribute('ss-change') === null){
                unique_id = guid();
                this.setAttribute('ss-change', unique_id);
            } else {
                unique_id = this.getAttribute('ss-change');
            }
            if(now.length !== 0){
                for(i = 0; i <= now.length - 1; i++){
                    if(now[i].el === unique_id){
                        found = true;
                        if(now[i].html !== html){
                            now[i].html = html;
                            this.html(html)
                        }
                    }
                }
            }
            if(found === false){
                now.push({
                    el: unique_id,
                    html: html
                });
                this.html(html)
            }
            return this
    };

    ss.prototype.isVisible = function(){
        // (We do not reinvent the wheel) The original function is here : https://www.developpez.net/forums/d671773/webmasters-developpement-web/general-conception-web/contribuez/src-savoir-element-visible-l-ecran/
        let ccVisible = {xMin: 0, xMax: 0, yMin: 0, yMax: 0}, elementVisible = {xMin: 0, xMax: 0, yMin: 0, yMax: 0};
        let source = this, sourceParent = source.offsetParent;
        let total = {hauteur: false, largeur: false}, partiel = {hauteur: false, largeur: false};
        ccVisible.xMin = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
        ccVisible.xMax = window.pageXOffset + window.innerWidth || document.documentElement.scrollLeft + document.documentElement.clientWidth || document.body.scrollLeft + document.body.clientWidth;
        ccVisible.yMin = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        ccVisible.yMax = window.pageYOffset + window.innerHeight || document.documentElement.scrollTop + document.documentElement.clientHeight || document.body.scrollTop + document.body.clientHeight;
        elementVisible.xMin = source.offsetLeft;
        elementVisible.yMin = source.offsetTop;
        while(sourceParent) {
            elementVisible.xMin += sourceParent.offsetLeft;
            elementVisible.yMin += sourceParent.offsetTop;
            sourceParent = sourceParent.offsetParent;
        }
        elementVisible.xMax = elementVisible.xMin + source.offsetWidth;
        elementVisible.yMax = elementVisible.yMin + source.offsetHeight;
        if(ccVisible.xMin <= elementVisible.xMin && ccVisible.xMax >= elementVisible.xMax){
            total.largeur = true;
        }
        else if(!(ccVisible.xMax < elementVisible.xMin || ccVisible.xMin > elementVisible.xMax)){
            partiel.largeur = true;
        }
        if(ccVisible.yMin <= elementVisible.yMin && ccVisible.yMax >= elementVisible.yMax){
            total.hauteur = true;
        }
        else if(!(ccVisible.yMax < elementVisible.yMin || ccVisible.yMin > elementVisible.yMax)){
            partiel.hauteur = true;
        }
        if(total.largeur && total.hauteur){
            return true
        }
        else if(total.largeur && partiel.hauteur){
            // return(this + ' est entièrement visible en largeur mais tronqué en hauteur');
            return false
        }
        else if(total.hauteur && partiel.largeur){
            // return(this + ' est entièrement visible en hauteur mais tronqué en largeur');
            return true
        }
        else if(partiel.hauteur && partiel.largeur){
            // return(this + ' est tronqué en hauteur et en largeur');
            return false
        }
        else{
            // return(this + ' n\'est pas visible dans la page !');
            return false
        }
    };

    ss.prototype.scrollToThis = function(scrollDuration = 2000){
        if(this.length === 0){
            console.warn("I can't find the position of your element")
        } else {
            let goto = this;
            if(this.length > 1){
                goto = goto[0];
            }

            let scrollStep = goto.getBoundingClientRect().y / (scrollDuration / 15),
                scrollInterval = setInterval(function(){
                    if(!(goto.offsetTop === document.body.scrollHeight) && !(document.body.scrollHeight === document.body.clientHeight && goto.isVisible())){
                        window.scrollBy( goto.offsetTop, scrollStep );
                    }
                    else clearInterval(scrollInterval);
                },15);
        }
        return this;
    };

})(ss || (ss = {}));