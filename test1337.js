var jsonStream = require('duplex-json-stream')
var wrtcSwarm = require('webrtc-swarm')
var streamSet = require('stream-set')
//var register = register('register-multicast-dns')
//var toPort = require('hash-to-port')
var signalhub=require('signalhub')

var hub = signalhub('test-app-demo', [
    'http://localhost:9000'
]);

//var swarm = topology(to PaymentAddress(me), friends.map(toAddress))
var swarm = wrtcSwarm(hub)
var streams=streamSet()
var id=Math.random()
var seq = 0
var logs = {}

swarm.on('peer',function(friend) {
    console.log('[a friend joined')
    friend = jsonStream(friend)
    streams.add(friend)
    friend.on('data',function(data) {
        if (logs[data.log] <= data.seq) return
        logs[data.log]=data.seq
        console.log(data.username + '> ' + data.message)
        streams.forEach(function(otherFriend){
            otherFriend.write(data)
        })
    })
})
window.chat=function (username,message){var next = seq++
    streams.forEach(function(friend){
        friend.write({
            log:id,seq:seq, username: window.username, message: me
        })
    })}
