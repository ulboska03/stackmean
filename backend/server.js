const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const app = express();
app.use(express.json());
const productRoutes = require("./routes/product");
require("dotenv").config();
const NodeCache = require("node-cache");
const cache = new NodeCache();



mongoose.connect('mongodb://mongo:27017/mern-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB қосылды'))
    .catch(err => console.error('MongoDB қатесі:', err));

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token || token !== 'Bearer validToken') {
        return res.status(401).json({ message: 'Invalid or missing token' });
    }
    next();
};


const cacheMiddleware = (req, res, next) => {
    const key = req.originalUrl || req.url;
    const cachedData = cache.get(key);
    if (cachedData) {
        console.log("Serving from cache");
        res.send(cachedData);
    } else {
        res.sendResponse = res.send;
        res.send = (body) => {
            cache.set(key, body);
            res.sendResponse(body);
        };
        next();
    }
};


app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({ message: 'You have access to this protected route' });
});

app.get('/api/read-file', (req, res) => {
    fs.readFile('somefile.txt', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'File read error' });
        }
        res.json({ content: data });
    });
});

app.get('/', (req, res) => {
    res.send('MERN backend Docker ішінде жұмыс істеп тұр!');
});

app.post('/api/data', (req, res) => {
    const { name, age } = req.body;
    res.json({ message: `Received data: Name - ${name}, Age - ${age}` });
});

app.delete('/api/data', (req, res) => {
    res.json({ message: 'Data deleted successfully' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Сервер ${PORT} портында жұмыс істеп тұр`));
