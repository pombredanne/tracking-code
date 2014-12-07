Basiclytics._PageView = function() {
    // Visitor are returning visitor by default
    var shortId = 'basiclytics',
      client_id = Basiclytics._SiteId, 
      new_visitor = 0,
      returning_visitor = 1;
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
    var pv = {
	site_id: client_id,
	title: document.title,
	nv: new_visitor,
	rv: returning_visitor,
    	location: window.location.href,
	width: screen.width,
	height: screen.height,
	hl: (typeof(history) != 'undefined' && typeof(history.length) != 'undefined') ? 0 : history.length,
	ua: navigator.userAgent,
	referrer: (typeof(document.referrer) == 'undefined') ? '' : document.referrer,
	cookie: 'na',
        localStorage: Basiclytics.Utils.Storage,
    };
    if (typeof(navigator.cookieEnabled) != 'undefined') {
        pv.cookie = navigator.cookieEnabled ? 'y' : 'n';
    }
    return pv;
};
Basiclytics.pageview = function() {
  pv = Basiclytics._PageView();
  Basiclytics.PubSub.pub("/events", ["pv", pv]);
  return pv;
};
