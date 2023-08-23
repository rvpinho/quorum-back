const EventPeople = require("../Models/EventPeople");
const { connectToDB } = require("../Core/ConnectionDB");
const { ObjectId } = require("mongodb");

async function insertOne(eventPeople) {
  try {
    eventPeople.checked = false;
    const tableName = new EventPeople();
    const db = await connectToDB();

    const collection = db.collection(tableName.COLLECTION);
    const resultado = await collection.insertOne(eventPeople);

    console.log("Registro inserido: ", resultado.insertedId);

    return 200;
  } catch (err) {
    console.error("Erro ao inserir o registro:", err);
  }
}

async function getAll() {
  try {
    const event = new EventPeople();

    const db = await connectToDB();

    const collection = db.collection(event.COLLECTION);

    const result = await collection.find().toArray();

    return result;
  } catch (err) {
    console.error("Erro ao achar o registro:", err);
    return err;
  }
}

async function getById(id) {
  try {
    const event = new EventPeople();

    const db = await connectToDB();

    const collection = db.collection(event.COLLECTION);

    const filters = { _id: new ObjectId(id) };

    const result = await collection.findOne(filters);

    return result;
  } catch (err) {
    console.error("Erro ao achar o registro:", err);
    return err;
  }
}

async function getByEventName(name) {
  try {
    const event = new EventPeople();

    const db = await connectToDB();

    const collection = db.collection(event.COLLECTION);

    const filters = { event: name };

    const result = await collection.find(filters).toArray();

    return result;
  } catch (err) {
    console.error("Erro ao achar o registro:", err);
    return err;
  }
}

async function updateOne(id, eventPeople) {
  try {

    console.log(eventPeople);

    const event = new EventPeople();

    const db = await connectToDB();

    const collection = db.collection(event.COLLECTION);

    const filters = { _id: new ObjectId(id) };

    const update = { $set: eventPeople };

    const result = await collection.updateOne(filters, update);

    console.log("Registro atualizado: ", result.upsertedId);

    return 200;
  } catch (err) {
    console.error("Erro ao inserir o registro:", err);
    return err;
  }
}

async function deleteOne(id) {
  try {
    const event = new EventPeople();

    const db = await connectToDB();

    const collection = db.collection(event.COLLECTION);

    const filters = { _id: new ObjectId(id) };

    const result = await collection.deleteOne(filters);

    console.log("Registro deletado: ", result.deletedCount);

    return 200;
  } catch (err) {
    console.error("Erro ao deletar o registro:", err);
    return err;
  }
}

async function confirmPresenca(id) {
  try {

    const event = new EventPeople();

    const db = await connectToDB();

    const collection = db.collection(event.COLLECTION);

    const filters = { _id: new ObjectId(id) };

    const update = { 
      $set:  {
        checked: true
      }
    };

    const result = await collection.updateOne(filters, update);

    console.log("Registro atualizado: ", result.upsertedId);

    return 200;
  } catch (err) {
    console.error("Erro ao inserir o registro:", err);
    return err;
  }
}



module.exports = {
  getByEventName,
  insertOne,
  updateOne,
  getAll,
  getById,
  deleteOne,
  confirmPresenca
};
