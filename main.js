Basiclytics._ScrollTracker().start();
Basiclytics.PubSub.sub("/events", function(etype, msg) {
  Basiclytics.debug("got msg " + etype + ":");
  Basiclytics.debug(msg);
  if (Basiclytics._APIendpoint !== "") {
    Basiclytics.Utils.sendData(etype, msg);
  } 
});
