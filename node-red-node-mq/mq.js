module.exports = function(RED) {
    "use strict";
    var os = require('os');
    var zmq = require('zeromq');

    // MQ SUB Node
    function MQSUB(n) {
        RED.nodes.createNode(this,n);
        // topic
        // socket type :
        //        tcp => tcp://aaa.bbb.ccc.ddd:eee
        //        ipc => ipc://xxx.ipc
        //        inproc => inproc://xxxx

        // Configuration options passed by Node Red
        console.log(n);
        this.topic = n.topic || 'NY';
        this.host = n.host || '127.0.0.1';
        this.port = n.port || 5000;
        this.ipcname = n.ipcname || 'weather.ipc';
        this.mqtype = n.mqtype || 'tcp';
        
        // Config node state  
        this.mqurl = "";
        this.connected = false;
        this.connecting = false;
        this.closing = false;
                
        var node = this;
        var sub = zmq.socket('sub');
        
        sub.on('message', function ( topic, message ) {

            console.log('from sub :', topic.toString(), message.toString() ) ;
            var msg;

            msg = { payload: message.toString() };
            node.send(msg);
        });

        node.on("close", function() {
            sub.close();
            node.log(RED._("mq.status.subscription-stopped"));
        });

        if ( this.mqtype == 'tcp') this.mqurl = 'tcp://'+this.host+':'+this.port;
        if ( this.mqtype == 'in' ) this.mqurl = 'inproc://'+this.ipcname;
        if ( this.mqtype == 'ipc') this.mqurl = 'ipc://'+this.ipcname;

        console.log("subscription to : ", this.mqurl);
        sub.connect(this.mqurl);
        sub.subscribe(this.topic);

    }

    RED.nodes.registerType("MQ SUB", MQSUB);


    // MQ PUB Node
    function MQPUB(n) {
        RED.nodes.createNode(this,n);
        // Configuration options passed by Node Red
        console.log(n);
        this.host = n.host || '127.0.0.1';
        this.port = n.port || 5000;
        this.ipcname = n.ipcname || 'weather.ipc';
        this.mqtype = n.mqtype || 'tcp';
        
        // Config node state
        this.mqurl = "";
        this.connected = false;
        this.connecting = false;
        this.closing = false;

        var node = this;
        var pub = zmq.socket('pub');

        node.on("input", function(msg) {
            if (msg.hasOwnProperty("payload")) {

                console.log(msg.payload);

                var message = msg.payload;
                var topic = message.shift();
                pub.send( [ topic, [ message ] ] );

            }
            // ignore
        });
        
        node.on("close", function() {
            pub.close();
            node.log(RED._("mq.status.output-stopped"));
        });

        if ( this.mqtype == 'tcp') this.mqurl = 'tcp://'+this.host+':'+this.port;
        if ( this.mqtype == 'in' ) this.mqurl = 'inproc://'+this.ipcname;
        if ( this.mqtype == 'ipc') this.mqurl = 'ipc://'+this.ipcname;

        console.log("publishing to : ", this.mqurl);
        pub.bindSync(this.mqurl);

    }
    RED.nodes.registerType("MQ PUB",MQPUB);
}
