// Activity tracks visitors active time,
// it monitors some events (click, scroll, keypress...) to monitor visitors activity,
// it starts three timers:
// - a ticker timer to increment the active time
// - an idle timer to detect when a visitor become idle (and start/stop the ticker timer)
// - a report timer to publish active time each x seconds
Basiclytics.Activity = (function() {
  var paused = false, // holds the ticker status
    hidden = false, // wether the page is hidden or not
    idleTime = 10, // nunber of seconds before a visitor is considered idle
    activeTime = 0, // number of seconds the visitor has been active so far
    lastActiveTime = 0, // holds the last reported active time to decide wether or not publish new data
    lastActivity = Basiclytics.Utils.now(), // timestamp of the visitor last activity
    isThrottled = false, // throttle status for updateactivity
    throttleDelay = 750, // throttle delay for updateActivity (in ms)
    // idleCheck checks if the visitor is idle, and  start/stop the timer accordingly
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
    // start calling idleCheck every second
    idleTimer = setInterval(idleCheck, 1000),
    // tick increments the active time
    tick = function() {
      activeTime += 1;
    },
    // start calling tick every second
    tickTimer = setInterval(tick, 1000),
    // stopTick/startTick stops/starts the tick timer
    stopTick = function() {
      clearTimeout(tickTimer);
    },
    startTick = function() {
      stopTick();
      tickTimer = setInterval(tick, 1000);
    },
    // updateActivity updates the user last activity
    updateActivity = function() {
      if (isThrottled) { return; }
      isThrottled = true;
      setTimeout(function () { isThrottled = false; }, throttleDelay);
      lastActivity = Basiclytics.Utils.now();
      console.log("activity");
    },
    publisherTimer = setInterval(function() {
      if (lastActiveTime != activeTime) {
        lastActiveTime = activeTime;
        Basiclytics.PubSub.pub("/events", ["t", {t: activeTime, session_id: Basiclytics.Session.id()}]);
      }
    }, 10000);
  // bind some events to monitor the visitor activity
  Basiclytics.Utils.addListener(document, "click", updateActivity); 
  Basiclytics.Utils.addListener(document, "keydown", updateActivity);
  Basiclytics.Utils.addListener(window, "mousemove", updateActivity);
  Basiclytics.Utils.addListener(window, "scroll", updateActivity);
  // also uses the Page Visibility API, if available,
  // to set the visitor idle when the page is hidden.
  Basiclytics.Utils.visibilityChange(function(isHidden) {
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
