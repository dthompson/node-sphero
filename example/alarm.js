"use strict";

var http = require('http');
var child = require('child_process');

var gpio = require('rpi-gpio');


var LED_RED = 18
var LED_GREEN = 22

var alarm

gpio.setup(LED_RED, gpio.DIR_OUT, function(){write(LED_RED,false)});
gpio.setup(LED_GREEN, gpio.DIR_OUT, function(){write(LED_GREEN,true)});


function write(pin,state) {
    gpio.write(pin, state, function(err) {
        if (err) throw err;
        console.log('Written to pin '+pin+' => '+state);
    });
}


function send(res,text) {
    res.writeHead(200)
    res.end(text)
}

var server = http.createServer(function(req,res){
    if( '/safe' == req.url ) {
	send(res,'SAFE')
	write(LED_GREEN,true)
	write(LED_RED,false)
	if( alarm ) {
	    alarm.kill()
	}
	alarm = null
    }
    else if( '/unsafe' == req.url ) {
	send(res,'UNSAFE')
	write(LED_GREEN,false)
	write(LED_RED,true)
	alarm = child.spawn('./alarm',['12'])
    }
}).listen(80)
