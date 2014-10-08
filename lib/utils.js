Basiclytics.Utils = {};
Basiclytics.Utils.now = function() {
  return Math.floor(Date.now() / 1000);
};
//http://stackoverflow.com/a/2117523
Basiclytics.Utils.guid = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
  var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
};
// http://tokenposts.blogspot.com.au/2012/04/javascript-objectkeys-browser.html
if (!Object.keys) Object.keys = function(o) {
    if (o !== Object(o))
        throw new TypeError('Object.keys called on a non-object');
    var k=[],p;
    for (p in o) if (Object.prototype.hasOwnProperty.call(o,p)) k.push(p);
    return k;
};
Basiclytics.Utils.sendData = function(event_type, data) {
  var img = new Image(1,1);
  img.src = Basiclytics._APIendpoint+'?event='+event_type+'&data='+encodeURIComponent(JSON.stringify(data));
  img.onerror = function() {};
};
