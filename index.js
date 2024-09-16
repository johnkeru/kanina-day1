require('dotenv').config() // loads all inside .env to process.env
const express = require('express')
require('./dbConnect')()
const User = require('./users')
// ODM = OBJECT DATA MODEL

const app = express()
app.use(express.json())

// get = read
app.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: 'Error in db' })
    }
})


// get = read
app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (e) {
        res.status(404).json({ message: 'User not found!' })
    }
})

// post = create
app.post('/users', async (req, res) => {
    const body = req.body
    const newUser = new User(body)
    await newUser.save()
    res.status(201)
        .json({ message: `User: ${body.username} is added to the db` })
})

// put = update
app.put('/users/:id', async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        const userUpdated = await User.findByIdAndUpdate(id, body)
        res.json({ message: `User: ${userUpdated.username} is updated!` })
    } catch (e) {
        res.status(404).send(e.message)
    }
})

// delete user
app.delete('/users/:id', async (req, res) => {
    try {
        await User.findOneAndDelete(req.params.id)
        res.json({ message: 'User successfully deleted' })
    } catch (error) {
        res.status(500).json({ message: 'Error in db' })
    }
})


app.listen(5000, () => console.log('Server is listening on: http://localhost:5000'))

// http://localhost:5000/users
// ctrl + ~ = to open and close terminal
// ctrl + c = to stop the server
// ctrl + space = to show suggestions

// http://localhost:5000/users/:id
// req.params.id



