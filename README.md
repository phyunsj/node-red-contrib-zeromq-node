# Create Custome Node for Node-RED

Demonstrating how to write custom nodes for **Node-RED** (Related Link :  https://nodered.org/docs/creating-nodes/)

## Node-RED 

Node-RED is a programming tool for wiring together hardware devices, APIs and online services in new and interesting ways. It provides a browser-based editor that makes it easy to wire together flows using the wide range of nodes in the palette that can be deployed to its runtime in a single-click. _from https://nodered.org/_

## Example : ZeroMQ (ØMQ) Node + Node-RED-Dashboard

![alt text-1](https://github.com/phyunsj/node-red-custom-node/blob/master/node-red-dashboard-weather.gif "Node-RED-Dashboard Weather")

#### Supported ØMQ Node Types

MQ PUB & MQ SUB : Publish/Subscribe Pattern for distributing data from a single process (e.g. publisher) to multiple recipients (e.g. subscribers) 

![alt text-1](https://github.com/phyunsj/node-red-custom-node/blob/master/node-red-zeromq.png "Node-RED ZeroMQ Node")


**Link Node-RED custome node locally for development**

On Windows, using npm 5.x or greater:

> `cd  C:\Users\my_name\.node_red`

> `C:\Users\my_name\.node_red\npm install C:\Users\my_name\my_project\node-red-zeromq`

## Node-RED-Dashboard Flow

2 X **MQ SUB** nodes subscribed **NY** & **NJ** and extracted `temperature` & `humidity` to display data on `Chart` & `Gauge`.

![alt text-1](https://github.com/phyunsj/node-red-custom-node/blob/master/node-red-zeromq-dashboard.png "Node-RED-Dashboard ZeroMQ")


```
[{"id":"c73394d5.f734a8","type":"tab","label":"Flow 4","disabled":false,"info":""},{"id":"b6c50546.06cd58","type":"MQ SUB","z":"c73394d5.f734a8","name":"","topic":"NY","host":"127.0.0.1","port":"5559","ipcname":"","mqtype":"tcp","x":136.30007934570312,"y":235.60002517700195,"wires":[["ced4af02.07cfe"]]},{"id":"59da8ee.3d9047","type":"debug","z":"c73394d5.f734a8","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","x":666.3003005981445,"y":239.13354301452637,"wires":[]},{"id":"1134f86.23dc708","type":"MQ PUB","z":"c73394d5.f734a8","name":"","topic":"","host":"","port":"5559","ipcname":"","mqtype":"tcp","x":518.3003463745117,"y":476.60034942626953,"wires":[]},{"id":"ddec34af.7ffd18","type":"inject","z":"c73394d5.f734a8","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":true,"onceDelay":0.1,"x":186.30012130737305,"y":312.0667152404785,"wires":[["d0f4c073.315fe"]]},{"id":"ced4af02.07cfe","type":"function","z":"c73394d5.f734a8","name":"temp,humidity","func":"var weatherStr = msg.payload.split(',');\nvar weather = weatherStr.map( (val, i, weatherStr) => {\n   return parseInt(val); \n})\nvar newMsg = { payload : { temp : weather[0], humidity : weather[1] }} ;\nreturn [ newMsg, { payload : weather[0] }, { payload : weather[1] }    ] ;","outputs":3,"noerr":0,"x":371.30030822753906,"y":236.5335235595703,"wires":[["59da8ee.3d9047"],["39f7dd01.cad012"],["a6e752eb.e3525"]]},{"id":"d0f4c073.315fe","type":"function","z":"c73394d5.f734a8","name":"NJ,NY,CT random weather ","func":"var temperature = Math.floor((Math.random() * 99) + 1) - 30;\nvar humidity = Math.floor((Math.random() * 50) + 1);\nvar newMsg = { };\nvar cities = Math.floor((Math.random() * 5) + 1);\nswitch ( cities % 4 ) { \ncase 0 : newMsg.payload = [ 'NY', temperature, humidity ]; break;\ncase 1 : newMsg.payload = [ 'NY', temperature, humidity ]; break;\ncase 2 : newMsg.payload = [ 'NJ', temperature, humidity ]; break;\ncase 3 : newMsg.payload = [ 'NJ', temperature, humidity ]; break;\ndefault: newMsg.payload = [ 'CT', temperature, humidity ]; break;\n}\n\nreturn newMsg;","outputs":1,"noerr":0,"x":340.3001708984375,"y":387.533483505249,"wires":[["1134f86.23dc708"]]},{"id":"a44aadd7.5e487","type":"MQ SUB","z":"c73394d5.f734a8","name":"","topic":"NJ","host":"","port":"5559","ipcname":"","mqtype":"tcp","x":138.3000259399414,"y":184.60003852844238,"wires":[["3b98068b.38cbca"]]},{"id":"fff01711.470058","type":"debug","z":"c73394d5.f734a8","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","x":661.3002319335938,"y":78.1333818435669,"wires":[]},{"id":"3b98068b.38cbca","type":"function","z":"c73394d5.f734a8","name":"temp,humidity","func":"var weatherStr = msg.payload.split(',');\nvar weather = weatherStr.map( (val, i, weatherStr) => {\n   return parseInt(val); \n})\nvar newMsg = { payload : { temp : weather[0], humidity : weather[1] }} ;\nreturn [ newMsg, { payload : weather[0] }, { payload : weather[1] }    ] ;","outputs":3,"noerr":0,"x":369.3000793457031,"y":183.53336334228516,"wires":[["fff01711.470058"],["d80b6013.4da4c"],["2a3ab809.009b58"]]},{"id":"2a3ab809.009b58","type":"ui_chart","z":"c73394d5.f734a8","name":"NJ Humidity","group":"88b72f49.8468b","order":2,"width":0,"height":0,"label":"Humidity %","chartType":"line","legend":"false","xformat":"HH:mm:ss","interpolate":"linear","nodata":"","dot":false,"ymin":"","ymax":"","removeOlder":"5","removeOlderPoints":"","removeOlderUnit":"60","cutout":0,"useOneColor":false,"colors":["#1f77b4","#aec7e8","#ff7f0e","#2ca02c","#98df8a","#d62728","#ff9896","#9467bd","#c5b0d5"],"useOldStyle":false,"x":665.3002967834473,"y":182.3333740234375,"wires":[[],[]]},{"id":"d80b6013.4da4c","type":"ui_gauge","z":"c73394d5.f734a8","name":"NJ Temperature","group":"88b72f49.8468b","order":0,"width":0,"height":0,"gtype":"gage","title":"Temperature","label":"F","format":"{{value}}","min":"-50","max":"100","colors":["#808080","#00ff00","#ca3838"],"seg1":"30","seg2":"60","x":679.300163269043,"y":132.33334732055664,"wires":[]},{"id":"39f7dd01.cad012","type":"ui_gauge","z":"c73394d5.f734a8","name":"NY Temperature","group":"7bd140ab.eef18","order":2,"width":0,"height":0,"gtype":"gage","title":"Temperature","label":"F","format":"{{value}}","min":"-50","max":"100","colors":["#808080","#00ff00","#ca3838"],"seg1":"30","seg2":"60","x":678.3002967834473,"y":294.0002450942993,"wires":[]},{"id":"a6e752eb.e3525","type":"ui_chart","z":"c73394d5.f734a8","name":"NYHumidity","group":"7bd140ab.eef18","order":1,"width":0,"height":0,"label":"Humidity %","chartType":"line","legend":"false","xformat":"HH:mm:ss","interpolate":"linear","nodata":"","dot":false,"ymin":"","ymax":"","removeOlder":"5","removeOlderPoints":"","removeOlderUnit":"60","cutout":0,"useOneColor":false,"colors":["#1f77b4","#aec7e8","#ff7f0e","#2ca02c","#98df8a","#d62728","#ff9896","#9467bd","#c5b0d5"],"useOldStyle":false,"x":676.3003005981445,"y":355.0002155303955,"wires":[[],[]]},{"id":"88b72f49.8468b","type":"ui_group","z":"","name":"New Jersey","tab":"9192e18a.974f8","disp":true,"width":"6","collapse":false},{"id":"7bd140ab.eef18","type":"ui_group","z":"","name":"New York","tab":"9192e18a.974f8","order":2,"disp":true,"width":"6","collapse":false},{"id":"9192e18a.974f8","type":"ui_tab","z":"","name":"Weather","icon":"dashboard","order":1}]
```

## Additional Info

- Node-RED How To: Custom Node Creation https://www.youtube.com/watch?v=TlzqGhfdbEM
- How to Create a Basic Node-Red Dashboard http://www.steves-internet-guide.com/node-red-dashboard/
- Writing custom add-ons for Node-RED https://opensourceforu.com/2017/07/writing-custom-add-ons-node-red/
- Node-RED Nodes https://github.com/node-red/node-red-nodes
- Stuck while making a Node-RED custom node? https://github.com/node-red/node-red-nodes
- Node-RED Automation http://bitluni.net/how-to-node-red/
