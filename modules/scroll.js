Basiclytics._ScrollTracker = function() {
        var that = this,
            max = -1,
            disabled = false,
            isThrottled = false,
            throttleDelay = 125; //ms
        // Default callback
        this.callback = function(data) {
            Basiclytics.debug("scrollTracker: "+data+"%");
            Basiclytics.PubSub.pub("/events", ["s", {s: data, session_id: Basiclytics.Session.id()}]);
        };

        var getDocHeight = function() {
            return Math.max(document.body.scrollHeight,
                    document.body.offsetHeight,
                    document.documentElement.clientHeight,
                    document.documentElement.scrollHeight,
                    document.documentElement.offsetHeight);
        };
        var getIndex = function() {
            var docHeight = getDocHeight();
            var out = {};
            var marks = [25, 50, 75, 100];
            marks.forEach(function(percent) {
                out[percent] = parseInt(docHeight * percent / 100, 10);
            });
            // Remove 30px to the 100%
            out[100] = out[100] - 30;
            return out;
        };
        var trackScroll = function() {
            if (isThrottled || disabled) { return; }
            isThrottled = true;
            setTimeout(function () { isThrottled = false; }, throttleDelay);
            posPercent = Basiclytics.Utils.scrollY() + Basiclytics.Utils.viewportHeight();
            index = getIndex();
            Object.keys(index).reverse().forEach(function(cpercent) {
               // console.log("pos:"+posPercent+"/index:"+index[cpercent]+"/percent:"+cpercent)
                if (posPercent >= index[cpercent]) {
                    oldmax = max;
                    max = Math.max(max, index[cpercent]);
                    if (max > oldmax) {
                        if (cpercent == 100) {
                            disabled = true;
                        }
                        that.callback(cpercent);
                    }
                }
            });
        };
        this.start = function() {
             Basiclytics.Utils.addListener(window, "scroll", trackScroll);
             window.onscroll = trackScroll;
        };
	return this;
};
