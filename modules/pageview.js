Basiclytics._PageView = function() {
  // Visitor are returning visitor by default
  var shortId = 'basiclytics',
    client_id = Basiclytics._SiteId, 
    new_visitor = 0,
    returning_visitor = 1;
  if (Basiclytics.Store) {    
    // Check if the visitor a new visitor
    if (Basiclytics.Store.get(shortId+'_u') === null) {
       new_visitor = 1;
       Basiclytics.Store.set(shortId+'_u', 1, 3600*24);
    }
    // Check if the visitor a returning visitor
    if (Basiclytics.Store.get(shortId+'_r') === null) {
       returning_visitor = 0;
       Basiclytics.Store.set(shortId+'_r', 1, 3600*24*1000);
    }
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
    localStorage: Basiclytics.Utils.Storage ? 'y' : 'n',
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
