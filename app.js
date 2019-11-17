const express = require('express');
const keys = require('./config/keys');
const multer = require('multer');
const upload = multer();

const app = express();

// 處理跨網域問題
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const accountSid = keys.twilio.accountSid;
const authToken = keys.twilio.authToken;
const client = require('twilio')(accountSid, authToken);

app.get('/', (req, res) => {
    res.send('This is React GA Server');
});

app.post('/', (req, res) => {
    res.send('This is homepage Post method');
});

app.post('/message', upload.array(), async (req, res) => {
    let formData = req.body;

    try {
        const message = await client.messages.create({
            body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
            from: '+17572046623',
            to: `+${formData.phoneNumber}`
        });
        console.log(message);
        res.send({ isMessageSend: true });
    } catch (ex) {
        res.send({ isMessageSend: false });
    }
});


app.listen(5000, () => console.log('listening on port 5000'));