import phoneService from '../services/phonebook';

const PersonForm = ({
  persons,
  setPersons,
  newPerson,
  setNewPerson,
  setNotification,
}) => {
  const handleNameChange = e => {
    setNewPerson({ ...newPerson, name: e.target.value });
  };

  const handleNumberChange = e => {
    setNewPerson({ ...newPerson, number: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const target = persons.find(
      person => person.name.toLowerCase() === newPerson.name.toLowerCase()
    );
    if (target) {
      if (
        confirm(
          `${newPerson.name} is already added to phonebook, replace the old one with a new one?`
        )
      ) {
        const changedPerson = {
          name: target.name,
          number: newPerson.number,
          id: target.id,
        };

        phoneService
          .update(target.id, changedPerson)
          .then(() => {
            setPersons(
              persons.map(p => (p.id === target.id ? changedPerson : p))
            );
            setNewPerson({ name: '', number: '' });
            setNotification({
              message: `Number replaced with ${newPerson.number} for ${newPerson.name}`,
              type: 'message',
            });
            setTimeout(
              () => setNotification({ message: null, type: 'message' }),
              4000
            );
          })
          .catch(e => {
            setNotification({
              message: `Information of ${newPerson.name} has already been removed from the server`,
              type: 'alert',
            });
            setTimeout(
              () => setNotification({ message: null, type: 'message' }),
              4000
            );
            setPersons(persons.filter(p => p.id !== target.id));
          });
      } else {
        setNewPerson({ name: '', number: '' });
      }

      return;
    }

    const personObject = {
      name: newPerson.name,
      number: newPerson.number,
    };
    phoneService.create(personObject).then(createdPerson => {
      setPersons(persons.concat(createdPerson));
      setNewPerson({ name: '', number: '' });
      setNotification({
        message: `Added ${newPerson.name}`,
        type: 'message',
      });
      setTimeout(
        () => setNotification({ message: null, type: 'message' }),
        5000
      );
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newPerson.name} onChange={handleNameChange} />
        <br />
        number: <input value={newPerson.number} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
