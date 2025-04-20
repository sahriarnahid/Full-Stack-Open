const Persons = ({ persons, searchTerm, handleDelete }) => {
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
