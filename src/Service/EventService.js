const EventRepository = require("../Repository/EventRepository");
const Event = require("../Models/Event");

//Função READ getAll
async function getAll() {
  const result = await EventRepository.getAll();
  return result;
}

//Função READ getById
async function getById(id) {
  const result = await EventRepository.getById(id);
  return result;
}

//Função READ getByName
async function getByName(name) {
  console.log(name);
  const result = await EventRepository.getByName(name);
  console.log(result);
  return result;
}

//Função CREATE insertOne
async function insertOne(user) {
  const result = await EventRepository.insertOne(user);
  return result;
}

//Função UPDATE updateOne
async function updateOne(id, users) {
  const result = await EventRepository.updateOne(id, users);
  return result;
}

//Função DELETE deleteOne
async function deleteOne(id) {
  const result = await EventRepository.deleteOne(id);
  return result;
}

module.exports = {
  getAll,
  getById,
  updateOne,
  insertOne,
  deleteOne,
  getByName
};
