const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

if (process.argv.length === 4) {
  console.log('give both name and number');
  process.exit(1);
}

if (process.argv.length > 5) {
  console.log('too many arguments');
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];
const newPerson = name && number ? { name, number } : null;

const url = `mongodb+srv://fullstack:${password}@cluster0.ovcclvm.mongodb.net/phonebook?appName=Cluster0`;

mongoose.connect(url, { family: 4 });
mongoose.set('strictQuery', false);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (!newPerson) {
  Person.find({}).then(result => {
    console.log('phonebook:');
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else {
  const person = new Person({
    name: newPerson.name,
    number: newPerson.number,
  });

  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
}
