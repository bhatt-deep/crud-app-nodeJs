import express from 'express'
import entriesRoutes from './src/entries.js'
import usersRoutes from './src/users.js'
import authRoutes from './src/auth.js'
require('dotenv').config();
import bodyParser from 'body-parser'
const app = express()
const port = process.env.PORT || 3000
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// allows us to parse json 
app.use(express.json())

app.get('/', (req, res) => res.send({message:"Hello, world!"}))
app.use('/entries',entriesRoutes)
app.use('/users',usersRoutes)
app.use('/auth',authRoutes)
// Global error handler
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
    console.error(err.stack)
    return res.status(500).send({error: "not found"})
});

export default app.listen(port, () => console.log(`API server ready on http://localhost:${port}`))

