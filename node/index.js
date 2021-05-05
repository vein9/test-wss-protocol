const fs = require('fs')
const https = require('https')
const WebSocket = require('ws')
const app = require('express')()
const port = 5000


app.get('/', (req, res) => {
    res.send('https express')
})
const httpsServer = https.createServer({
    cert: fs.readFileSync('./ssl/server.crt'),
    key: fs.readFileSync('./ssl/server.key')
}, app);
const wss = new WebSocket.Server({ server: httpsServer });

wss.on('connection', function connection(ws) {
    console.log('Someone connected')
    ws.send('hello ng anh em')
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

});

httpsServer.listen(port, () => console.log(`Listening ${port}...`));