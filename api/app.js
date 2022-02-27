const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Todo = require('./models/Todo')

const app = express()

app.use(express.json())
app.use(cors())


const uri = 'mongodb://localhost:27017/todo-list'
mongoose.connect(uri)
    .then(() => console.log('Connected to DB !'))
    .catch(() => console.error)
    
app.get('/todos', async (req, res) => {
    const todos = await Todo.find()
    res.json(todos)
})

app.post('/todo/new', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    })
    todo.save()
    res.json(todo)
})


app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo
        .deleteOne({ _id: req.params.id })
    res.json(result)
})


app.get('/todo/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id)
    todo.complete = !todo.complete
    todo.save()
    res.json(todo)
})

app.listen(1337, () => console.log('Server Running !'))