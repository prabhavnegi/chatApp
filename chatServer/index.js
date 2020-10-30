var app = require('express')();
var http = require('http').createServer(app);
const io = require('socket.io')(http)
const admin = require('firebase-admin');
const serviceAccount = require(''); //add path to your service.json file which containt firebase admin credentials


admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const firestore = admin.firestore()
const port = process.env.PORT || 5000

var msg = [];
var temp = [];
var check = 0;
var temp2 = [];
var count = 0;

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

io.on("connection", socket => {
    count++
    console.log("user connected at " + Date().toLocaleString())
    socket.emit('connected', true)
    io.emit("count", { count: count - 1 })
    socket.on('chatMessage', data => {
        msg.push(data)
        temp.push(data)
        io.emit('gotMsg', data)
        if (msg.length === 20) {
            temp = []
            temp2 = msg.slice(9)
            firestore.collection('server').doc('messages').set({
                msg
            }).then(() => {

                if (temp.length)
                    msg = [...temp]
                else
                    msg = []
            }).catch((error) => {
                console.log('error')
            })
        }
    })

    socket.on('disconnect', () => {
        console.log('user disconnected at ' + Date().toLocaleString());
        count--
        io.emit('count', { count: count - 1 })
        if (temp.length && temp.length != check) {
            check = temp.length
            var msg = []
            if (temp.length < 11)
                msg = [...temp2, ...temp]
            else
                msg = [...temp]
            firestore.collection('server').doc('messages').set({
                msg
            }).then(() => {
                console.log("written after disconnected")
            }).catch((error) => {
                console.log(error.message)
            })
        }

    })


})


http.listen(port, () => {
    console.log('listening on ' + port);
});