Basiclytics.PubSub.sub("/events", function(etype, msg){
  console.log(etype + ":");
  console.log(msg);
});
