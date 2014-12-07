Basiclytics.Store = (function() {
// see https://github.com/marcuswestin/store.js auto expiration
  Basiclytics.Utils.Storage.setItem("basiclytics_session_id", JSON.stringify());
// TODO wrapper du cookie get/set avec le Storage et fallback cookie, et stocker un visitor_id dedans
})();
