Basiclytics.Activity = (function() {
  var paused = false,
    hidden = false,
    idleTime = 10,
    activeTime = 0,
    lastActivity = Basiclytics.Utils.now(),
    idleCheck = function() {
       if (Basiclytics.Utils.now() - lastActivity > idleTime) {
         if (!paused) {
           paused = true;
           console.log("idle!");
           stopTick();
         }
       } else {
          if (paused && !hidden) {
            paused = false;
            console.log("back!");
            startTick();
          }
       }
    },
    idleTimer = setInterval(idleCheck, 1000),
    tick = function() {
      activeTime += 1;
      console.log("tick:"+activeTime);
    },
    tickTimer = setInterval(tick, 1000),
    stopTick = function() {
      clearTimeout(tickTimer);
    },
    startTick = function() {
      stopTick();
      tickTimer = setInterval(tick, 1000);
    },
    updateActivity = function() {
      lastActivity = Basiclytics.Utils.now();
      console.log("activity");
  };
  Basiclytics.Utils.addListener(window, "click", updateActivity); 
  Basiclytics.Utils.visibilityChange(function(isHidden) {
    console.log("isHidden:"+isHidden);
    hidden = isHidden;
    if (isHidden) {
       paused = true;
       stopTick();
    } else {
       updateActivity();
    }
  });
  return {
    activeTime: function() { return activeTime; }
  }; 
})();
