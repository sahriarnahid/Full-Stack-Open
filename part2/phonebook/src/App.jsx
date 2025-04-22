import { useState, useEffect } from 'react';
import phoneService from './services/phonebook';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState(null);
  const [msgtype, setMsgtype] = useState('message');

  useEffect(() => {
    phoneService.getAll().then(data => setPersons(data));
  }, []);

  const handleNameChange = e => {
    setNewName(e.target.value);
  };

  const handleNumberChange = e => {
    setNewNumber(e.target.value);
  };

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = id => {
    phoneService.remove(id).then(() => {
      setPersons(persons.filter(p => p.id !== id));
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const target = persons.find(
      person => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (target) {
      if (
        confirm(
          `${newName} is already added to phonebook, replace the old one with a new one?`
        )
      ) {
        const changedPerson = {
          name: target.name,
          number: newNumber,
          id: target.id,
        };

        phoneService
          .update(target.id, changedPerson)
          .then(() => {
            setPersons(
              persons.map(p => (p.id === target.id ? changedPerson : p))
            );
            setNewName('');
            setNewNumber('');
            setMsgtype('message');
            setMessage(`Number replaced with ${newNumber} for ${newName}`);
            setTimeout(() => setMessage(null), 4000);
          })
          .catch(e => {
            setMsgtype('alert');
            setMessage(
              `Information of ${newName} has already been removed from the server`
            );
            setTimeout(() => setMessage(null), 4000);
            setPersons(persons.filter(p => p.id !== target.id));
          });
      } else {
        setNewName('');
        setNewNumber('');
      }

      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    };
    phoneService.create(personObject).then(() => {
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');
      setMsgtype('message');
      setMessage(`Added ${newName}`);
      setTimeout(() => setMessage(null), 5000);
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} msgtype={msgtype} />
      <Filter searchTerm={searchTerm} handleSearch={handleSearch} />
      <h2>Add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        searchTerm={searchTerm}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
