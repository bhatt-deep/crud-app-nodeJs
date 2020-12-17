import express from 'express'
import entriesRoutes from './src/entries.js'
import usersRoutes from './src/users.js'
const app = express()
const port = 3000
const fs = require('fs');

// allows us to parse json 
app.use(express.json())

app.get('/', (req, res) => res.send('Hello world'))
app.use('/entries',entriesRoutes)
app.use('/users',usersRoutes)

app.listen(port, () => console.log(`API server ready on http://localhost:${port}`))
