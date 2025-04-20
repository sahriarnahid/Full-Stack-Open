import axios from 'axios';

const getAll = () => {
  return axios.get('http://localhost:3001/persons').then(r => r.data);
};

const create = personObject => {
  return axios
    .post('http://localhost:3001/persons', personObject)
    .then(r => r.data);
};

const update = (id, changedPerson) => {
  return axios
    .put(`http://localhost:3001/persons/${id}`, changedPerson)
    .then(r => r.data);
};

const remove = id => {
  return axios.delete(`http://localhost:3001/persons/${id}`).then(r => r.data);
};

export default { getAll, create, remove, update };
