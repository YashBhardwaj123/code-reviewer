const express = require('express');
const aiRoutes = require('./routes/ai.routes')
const cors = require('cors')
const rateLimit = require('express-rate-limit')

const app = express()

app.use(cors())


app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World')
})

// Rate limiter for AI routes: 30 requests per 15 minutes per IP
const aiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 30, // limit each IP to 30 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use('/ai', aiLimiter, aiRoutes)

module.exports = app