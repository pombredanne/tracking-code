Basiclytics.Session = (function() {
  var sessionManager = {};

  if (!Basiclytics.Store.sessionId) {
    Basiclytics.Store.sessionId = Basiclytics.Utils.guid();
  }
  sessionManager.id = function() {
    return Basiclytics.Store.sessionId;
  };
  return sessionManager;
})();
