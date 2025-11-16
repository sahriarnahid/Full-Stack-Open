import { useState, useEffect } from 'react';
import phoneService from './services/phonebook';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: '', number: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState({
    message: null,
    type: 'message',
  });

  useEffect(() => {
    phoneService.getAll().then(data => setPersons(data));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notification.message}
        msgtype={notification.type}
      />
      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <h2>Add a new</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newPerson={newPerson}
        setNewPerson={setNewPerson}
        setNotification={setNotification}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        setPersons={setPersons}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default App;
