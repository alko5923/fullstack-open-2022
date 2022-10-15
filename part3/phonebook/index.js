// *** THE SETUP ***
const mongoose = require('mongoose')
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Entry = require('./models/entry')
app.use(cors())
app.use(express.static('build'))
morgan.token('data', (req) => JSON.stringify(req.body))
app.use(morgan(
    ':method :url :status :res[content-length] - :response-time ms :data'))
app.use(express.json())

 // *** THE METHODS ***
 //#region Methods
app.get('/api/persons', (req, res) => {
  Entry.find({}).then(entries => {
    res.json(entries)
  })
})

app.get('/api/info', (req, res) => {
    const date = new Date()
    Entry.find({}).then(entries => 
    res.send(`<p>Phonebook has info for ${entries.length} people.<p>
            <p>${date.toString()}<p>`)
      )
})

app.get('/api/persons/:id', (req, res) => {
  Entry.findById(req.params.id).then(entry => {
    res.json(entry)
  })
})

function generateRandomId() {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}

app.post('/api/persons', (req, res) => {
    const body = req.body
    if (!body.name) {
        return res.status(400).json({ 
            error: 'name missing' 
        })
    }
    if (!body.number) {
        return res.status(400).json({
            error: 'number missing'
        })
    }
    const entry = new Entry({
        id: generateRandomId(),
        name: body.name,
        number: body.number
    })
    entry.save().then(savedEntry => {
      res.json(savedEntry)
    })
})

app.put('/api/persons/:id', (req, res) => {
    Entry.findById(req.params.id).then(updatedEntry => {
      updatedEntry.number = req.body.number
      updatedEntry.save().then(updEntr => {
        res.json(updEntr)
      })
    })
})

app.delete('/api/persons/:id', (req, res) => {
    Entry.findOneAndDelete(req.params.id).then(deletedEntry => {
        res.json(deletedEntry)
      }
    )
  })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})
//#endregion