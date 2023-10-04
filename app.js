const  bodyParser = require('body-parser');
var udp = require('dgram');
var tasks=[];
var timeouts=[];
var client = udp.createSocket('udp4');
client.bind(10000, () => {
    //client.addMembership('172.20.50.148');
  });
var ipServer = "172.20.1.163";
//var ipServer = "172.20.3.97";
var winPort = 10000;

const express = require('express');
const app = express();
var fs = require('fs');
const path = require('path');
var cors = require('cors')
const port = 80;
var public = path.join(__dirname, 'public');

//app.use(cors());
//app.use('*', cors());
app.use(cors({
    origin: '*'
}));
app.use(bodyParser.json());

app.use('/', express.static(public));
var code = '';
var codesUser = [];
app.get('/freeCI', (req, res) => {
    send2UDP("CI",ipServer,winPort,res);
})
app.get('/freeGC', (req, res) => {
    send2UDP("GC",ipServer,winPort,res);
})
app.get('/freeGCR', (req, res) => {
    send2UDP("GCR",ipServer,winPort,res);
})

app.get('/freeRGI', (req, res) => {
    send2UDP("RGI",ipServer,winPort,res);
})

app.listen(port, () => {
    console.log(`Servidor iniciado en puerto ${port}`)
    console.log(`UDP Server ${ipServer}:${winPort}`)
})

client.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port +' - ' + message);
    while ( tasks.length>0 ){
        var t = tasks.pop();
        if (t!=null){
            t.callback(t.msg,message);
        }

    }   
});

var tiempoespera = function (task,res){
    setTimeout( ()=>{
        let index = tasks.indexOf(task);
        console.log("index: ",index);
        if (index >= 0){
            tasks.splice(index,1);
            res.end(JSON.stringify({ estado:'err', mensaje: 'no se puede establecer conexión con el servidor' }));
        }
    } ,3000);
}

var send2UDP = function (msg,ip,port,res){
    console.log(`Enviando comando ...`);
    res.setHeader('Content-Type', 'application/json');
    res.write("");
    client.send(msg,port,ip,function(error){
        let task = {msg:msg, callback : ( msg, messageBytes )=>{         
            var strmsg = new Buffer.from(messageBytes).toString();
            
            console.log(`Respuesta de servidor ...`, strmsg);
            res.end(JSON.stringify({ mensaje: strmsg, msgsend:msg, estado:strmsg.includes("error")?'err':'ok' }));
        }};
        tasks.push( task );
        tiempoespera(task,res);
        if(error){
            console.log(error);
            res.end(JSON.stringify({ mensaje: error }));
            client.close();            
        }else{  
            console.log(`Datos enviados [${msg}] a ${ip}:${port}`);
        }
    });
};