const UserRepository = require("../Repository/UserRepository");
const User = require("../Models/User");

//Função READ getAll
async function getAll() {
  const result = await UserRepository.getAll();
  return result;
}

async function login(login) {
  const result = await UserRepository.login(login);
  if(result._id){
    result.token = Math.random().toString(16).substring(2);
  }
  return result;
}

//Função READ getById
async function getById(id) {
  const result = await UserRepository.getById(id);
  return result;
}

//Função CREATE insertOne
async function insertOne(user) {
  const result = await UserRepository.insertOne(user);
  return result;
}

//Função UPDATE updateOne
async function updateOne(id, users) {
  const result = await UserRepository.updateOne(id, users);
  return result;
}

//Função DELETE deleteOne
async function deleteOne(id) {
  const result = await UserRepository.deleteOne(id);
  return result;
}

module.exports = {
  getAll,
  getById,
  updateOne,
  insertOne,
  deleteOne,
  login,
};
