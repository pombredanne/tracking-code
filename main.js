Basiclytics.PubSub.sub("/events", function(etype, msg) {
  Basiclytics.debug("got msg " + etype + ":");
  Basiclytics.debug(msg);
  if (Basiclytics._APIendpoint === "") {
    throw new Error("Missing API endpoint");
  }
  msg.id = Basiclytics.Utils.guid();
  msg.ts = Basiclytics.Utils.now();
  if (etype != "pv") {
    msg.pv_id =  Basiclytics.Session.id();
  }
  Basiclytics.Utils.sendData(etype, msg);
});
Basiclytics.pageview();
Basiclytics._ScrollTracker().start();
