(function(){
    var client_id = document.TSanalytics_id; 
    var shortId = 'TSanalytics';
    // Visitor are returning visitor by default,
    // so we don't exaggerate the unique visitors count
    var new_visitor = 0;
    var returning_visitor = 1;
    // Check if the visitor a new visitor
    if (document.cookie.indexOf(shortId+'_u=') == -1) {
        new_visitor = 1;
        var expires = new Date();
        // Set the expires date in 24h for the unique visitor count
        expires.setTime(expires.getTime()+(3600*24*1000));
        document.cookie = shortId+'_u=1; expires='+expires.toGMTString()+'; path=/';
    }
    // Check if the visitor a returning visitor (if the cookie is already present)
    if (document.cookie.indexOf(shortId+'_r=') == -1) {
        returning_visitor = 0;
        document.cookie = shortId+'_r=1; expires=Sun, 18 Jan 2038 00:00:00 GMT; path=/';
    }
    var args = '';
    var e = encodeURIComponent;
    args += '?id='+client_id;
    args += '&nv='+new_visitor;
    args += '&rv='+returning_visitor;
    args += '&location='+e(document.location);
    args += '&width='+screen.width;
    args += '&height='+screen.height;
    args += '&hl='+(typeof(history) != 'undefined' && typeof(history.length) != 'undefined') ? 0 : history.length;
    args += '&ua='+e(navigator.userAgent);
    var referrer = (typeof(document.referrer) == 'undefined') ? '' : document.referrer;
    args += '&referrer='+e(referrer);
    var cookie = 'na';
    if (typeof(navigator.cookieEnabled) != 'undefined') {
        cookie = navigator.cookieEnabled ? 'y' : 'n';
    }
    args += '&cookie='+cookie;
    sendData(args);
})();

