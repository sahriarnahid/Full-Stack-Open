import phoneService from '../services/phonebook';

const Persons = ({ persons, setPersons, searchTerm }) => {
  const handleDelete = id => {
    phoneService.remove(id).then(() => {
      setPersons(persons.filter(p => p.id !== id));
    });
  };

  return (
    <ul>
      {persons
        .filter(person =>
          person.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map(person => (
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id)}>delete</button>
          </li>
        ))}
    </ul>
  );
};

export default Persons;
