Basiclytics.Store = (function() {
  if (Basiclytics._StoreDisabled) {
    return null;
  }
  if (Basiclytics.Utils.Storage) {
    return Basiclytics.Utils.LocalStorage; 
  }
  if (!Basiclytics._CookiesDisabled) {
    return Basiclytics.Utils.Cookies;
  }
  return null;
})();
