Basiclytics.PubSub = (function() {
  var channels = {};
  return {
    sub: function(channel, callback) {
      if (!channels[channel]) {
        // initialize an empty callback list
        channels[channel] = [];
      }
      channels[channel].push(callback);
    },
    pub: function(channel, args) {
      var subs = channels[channel];
      if (subs) {
        setTimeout(function() {
          for (x = 0; x < subs.length; x++) {
            subs[x].apply(this, args);
          }
          subs = null;
        }, 0);
      }
    }
  };
})();
