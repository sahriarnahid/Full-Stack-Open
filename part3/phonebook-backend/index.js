const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());

app.use(express.static('dist'));

morgan.token('body', req => JSON.stringify(req.body));

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

let persons = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/info', (req, res) => {
  const currentDate = new Date();
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p>
    <p>${currentDate}</p>`
  );
});

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const person = persons.find(p => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res.statusMessage = 'Person was not found in the server';
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  persons = persons.filter(p => p.id !== id);

  res.statusMessage = 'Person was deleted from the server';
  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const person = req.body;

  if (!person.name) {
    return res.status(404).send({ error: 'Name is missing' });
  } else if (!person.number) {
    return res.status(404).send({ error: 'Number is missing' });
  }

  if (persons.find(p => p.name === person.name)) {
    return res.status(404).send({ error: 'Name must be unique' });
  }

  person.id = generateID();
  persons = persons.concat(person);

  res.json(person);
});

const generateID = () => {
  return String(Math.floor(Math.random() * 1000000) + 1);
};

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
