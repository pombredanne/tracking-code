Basiclytics.Session = (function() {
  var sessionManager = {};

  if (!Basiclytics.Store.sessionId) {
    Basiclytics.Store.sessionId = Basiclytics.Utils.guid();
  }
  sessionManager.id = function() {
    return Basiclytics.Store.sessionId;
  };
  sessionManager.newRoot = function() {
    return Basiclytics.Utils.guid() + '.' + Basiclytics.Utils.now();
  };
  return sessionManager;
})();
