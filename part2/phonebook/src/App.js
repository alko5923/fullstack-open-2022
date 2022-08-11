import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Entries from './components/Entries'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length+1
    }
    if (persons.some(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }
    setPersons(persons.concat(personObject))
    // The following line ensures that the name and number 
    // do not remain written in the input box after submitting 
    setNewName('')
    setNewNumber('')
  }
  const handleNewName = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    setShowAll(false)
    // console.log("Target value = ", event.target.value)
    setNewFilter(event.target.value)
    if (event.target.value === '') {
      setShowAll(true)
    }
  }
  const entriesToShow = showAll 
      ? persons 
      : persons.filter(person => 
          person.name.substring(0, filter.length).toLowerCase() 
            === filter.toLowerCase())
  return (
    <div>
      <h1>The Phonebook</h1>
      <p>Here you can add entries to the phonebook, and filter
        them by name.
      </p>
      <h2>Filter</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>Add an entry</h2>
      <PersonForm addPerson={addPerson} newName={newName}
                  handleNewName={handleNewName} newNumber={newNumber}
                  handleNewNumber={handleNewNumber} />
      <h2>Filtered results</h2>
      <Entries entriesToShow={entriesToShow} />
    </div>
  )
}

export default App