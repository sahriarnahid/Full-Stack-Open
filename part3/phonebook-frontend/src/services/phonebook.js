import axios from 'axios';

const baseURl = '/api/persons';

const getAll = () => {
  return axios.get(baseURl).then(r => r.data);
};

const create = personObject => {
  return axios.post(baseURl, personObject).then(r => r.data);
};

const update = (id, changedPerson) => {
  return axios.put(`${baseURl}/${id}`, changedPerson).then(r => r.data);
};

const remove = id => {
  return axios.delete(`${baseURl}/${id}`).then(r => r.data);
};

export default { getAll, create, remove, update };
