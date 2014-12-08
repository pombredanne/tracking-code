Basiclytics.Utils = {};
// debug is a filter to disable logging when not in debug mode
Basiclytics.Utils.debug = function(msg) {
  if (!Basiclytics._DebugMode) { return; }
  return console.debug(msg);
};
Basiclytics.debug = Basiclytics.Utils.debug;
// now returns the current timestamp (in seconds and UTC)
Basiclytics.Utils.now = function() {
  return Math.floor(Date.now() / 1000);
};

// guid generates an UUID (from http://stackoverflow.com/a/2117523)
Basiclytics.Utils.guid = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
  var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
};

// Object.keys polyfill (http://tokenposts.blogspot.com.au/2012/04/javascript-objectkeys-browser.html)
if (!Object.keys) Object.keys = function(o) {
    if (o !== Object(o))
        throw new TypeError('Object.keys called on a non-object');
    var k=[],p;
    for (p in o) if (Object.prototype.hasOwnProperty.call(o,p)) k.push(p);
    return k;
};

// sendData uses a 1x1px image as a beacon frame, server should repond with a 204 no content status
Basiclytics.Utils.sendData = function(event_type, data) {
  var img = new Image(1,1);
  img.src = Basiclytics._APIendpoint+'?version='+Basiclytics.version+'&event='+event_type+'&data='+encodeURIComponent(JSON.stringify(data));
  img.onerror = function() {};
};

// scrollY returns the current vertical scroll offset
Basiclytics.Utils.scrollY = function() {
  return window.pageYOffset || document.documentElement.scrollTop;
};

// viewportHeight returns the viewport height
Basiclytics.Utils.viewportHeight = function() {
  var h1 = document.documentElement.clientHeight, h2 = window.innerHeight;
  return h1 < h2 ? h2 : h1;
};

// addListener is a cross-browser helper for event listening
Basiclytics.Utils.addListener = function(el, ev, fn){
  if(window.addEventListener){ // modern browsers including IE9+
    el.addEventListener(ev, fn, false);
  } else if(window.attachEvent) { // IE8 and below
    el.attachEvent('on' + ev, fn);
  } else {
    el['on' + ev] = fn;
  }
};

// visibilityChange implements a Page Visibility API shim
// (https://developer.mozilla.org/en-US/docs/Web/Guide/User_experience/Using_the_Page_Visibility_API).
// The callback argument  must be a function that takes a hidden (true/false) argument.
Basiclytics.Utils.visibilityChange = function(callback) {
  var hidden, visibilityChange; 
  if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
    hidden = "hidden";
    visibilityChange = "visibilitychange";
  } else if (typeof document.mozHidden !== "undefined") {
    hidden = "mozHidden";
    visibilityChange = "mozvisibilitychange";
  } else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
  } else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
  }
  function handleVisibilityChange() {
    if (document[hidden]) {
      // callback with hidden=true
      callback(true);
    } else {
      callback(false);
    }
  }
  // Warn if the browser doesn't support addEventListener or the Page Visibility API
  if (typeof document.addEventListener === "undefined" || 
      typeof document[hidden] === "undefined") {
    return false;
  } else {
    // Handle page visibility change   
    document.addEventListener(visibilityChange, handleVisibilityChange, false);
    return true;
  }
};
// https://mathiasbynens.be/notes/localstorage-pattern
// assign window.localStorage to  Basiclytics.Utils.Storage or undefined if not available
Basiclytics.Utils.Storage = (function() {
  var uid = new Date();
  var storage;
  var result;
  try {
    (storage = window.localStorage).setItem(uid, uid);
    result = storage.getItem(uid) == uid;
    storage.removeItem(uid);
    return result && storage;
  } catch (exception) {}
}());
Basiclytics.Utils.LocalStorage = {
  set: function(key, val, exp) {
    Basiclytics.Utils.Storage.setItem(key, JSON.stringify({ val:val, exp:exp*1000, time:new Date().getTime() }));
  },
  get: function(key) {
    var info = JSON.parse(Basiclytics.Utils.Storage.getItem(key));
    if (!info) { return null; }
    if (new Date().getTime() - info.time > info.exp) {
      Basiclytics.Utils.Storage.removeItem(key);
      return null; 
    }
    return info.val;
  },
  delete: function(key) {
    Basiclytics.Utils.Storage.removeItem(key);
  },
  backend: "localStorage"
  
};
// https://gist.github.com/ajaxray/4139367
// Small JavaScript class to help create, read and delete cookie.
// updated to handle expiration in seconds instead of days + lint
/**
 * Cookies - A small class to manipulate cookies from javascript
 *
 * Compressed version: https://gist.github.com/4147384 
 * 
 * @see 	www.quirksmode.org/js/cookies.html
 * @author	Anis uddin Ahmad <anisniit@gmail.com>  
 */
Basiclytics.Utils.Cookies = {

    /**
     * Set/Overwrite a cookie value
     *
     * @param name
     * @param value
     * @param exp      OPTIONAL seconds till this cookie will stay valid. Default is current session
     * @param path      OPTIONAL domain root will be used by default
     */
    set: function(name, value, exp, path) {
        var expires = "";
        if (days) {
            var date = new Date();
                date.setTime(date.getTime()+(exp*1000));
            expires = "; expires="+date.toGMTString();
        }

        var dir = path || '/';
        document.cookie = name+"="+value+expires+"; path="+dir;
    },

    /**
     * Retrieve a cookie value
     *
     * @param name
     * @return String|null
     */
    get: function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    },

    /**
     * Remove a cookie
     *
     * @param name
     */
    delete: function(name) {
        this.set(name,"",-1);
    },
    backend: "cookies",
};
