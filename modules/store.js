Basiclytics.Store = (function() {
  if (Basiclytics.Utils.Storage) {
    return Basiclytics.Utils.LocalStorage; 
  }
  return Basiclytics.Utils.Cookies;
})();
