const User = require("../Models/User");
const { connectToDB } = require("../Core/ConnectionDB");
const { ObjectId } = require("mongodb");

async function insertOne(user) {
  try {
    const tableName = new User();
    const db = await connectToDB();

    const collection = db.collection(tableName.COLLECTION);
    const resultado = await collection.insertOne(user);

    console.log("Registro inserido: ", resultado.insertedId);

    return 200;
  } catch (err) {
    console.error("Erro ao inserir o registro:", err);
  }
}

async function getAll() {
  try {
    const user = new User();

    const db = await connectToDB();

    const collection = db.collection(user.COLLECTION);

    const result = await collection.find().toArray();

    return result;
  } catch (err) {
    console.error("Erro ao achar o registro:", err);
    return err;
  }
}

async function getById(id) {
  try {
    const user = new User();

    const db = await connectToDB();

    const collection = db.collection(user.COLLECTION);

    const filters = { _id: new ObjectId(id) };

    const result = await collection.findOne(filters);

    return result;
  } catch (err) {
    console.error("Erro ao achar o registro:", err);
    return err;
  }
}

async function updateOne(id, users) {
  try {
    console.log(id);
    console.log(users);

    const user = new User();

    const db = await connectToDB();

    const collection = db.collection(user.COLLECTION);

    const filters = { _id: new ObjectId(id) };

    const update = { $set: users };

    const result = await collection.updateOne(filters, update);

    console.log("Registro atualizado: ", result.upsertedId);

    return 200;
  } catch (err) {
    console.error("Erro ao inserir o registro:", err);
    return err;
  }
}

async function login(login) {
  try {
    
    const user = new User();

    const db = await connectToDB();

    const collection = db.collection(user.COLLECTION);

    const filters = { email: login.email, password: login.password };

    const result = await collection.findOne(filters);


    return result;
  } catch (err) {
    console.error("Erro ao fazer o login:", err);
    return err;
  }
}

async function deleteOne(id) {
  try {
    const user = new User();

    const db = await connectToDB();

    const collection = db.collection(user.COLLECTION);

    const filters = { _id: new ObjectId(id) };

    const result = await collection.deleteOne(filters);

    console.log("Registro deletado: ", result.deletedCount);

    return 200;
  } catch (err) {
    console.error("Erro ao deletar o registro:", err);
    return err;
  }
}

module.exports = {
  insertOne,
  updateOne,
  getAll,
  getById,
  deleteOne,
  login,
};
