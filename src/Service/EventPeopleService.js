const EventPeopleRepository = require("../Repository/EventPeopleRepository");
const EventService = require("../Service/EventService");
const EventPeople = require("../Models/EventPeople");
const exceljs = require('exceljs');

//Função READ getAll
async function getAll() {
  const result = await EventPeopleRepository.getAll();
  return result;
}

//Função READ getById
async function getById(id) {
  const result = await EventPeopleRepository.getById(id);
  return result;
}

//Função READ getByName
async function getByEventName(name) {
  const result = await EventPeopleRepository.getByEventName(name);
  return result;
}

//Função CREATE insertOne
async function insertOne(eventPeople) {
  const result = await EventPeopleRepository.insertOne(eventPeople);
  return result;
}

//Função UPDATE updateOne
async function updateOne(id, eventPeople) {
  const result = await EventPeopleRepository.updateOne(id, eventPeople);
  return result;
}

//Função DELETE deleteOne
async function deleteOne(id) {
  const result = await EventPeopleRepository.deleteOne(id);
  return result;
}

async function convertXlsxToJson(filePath, name) {
  const workbook = new exceljs.Workbook();
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.getWorksheet('Participantes');
  const headers = worksheet.getRow(1).values;

  worksheet.eachRow(async (row, rowNumber) => {
    if (rowNumber !== 1) {
      const rowData = {};

      await row.eachCell((cell, colIndex) => {
        cell.value = cell.value;
        rowData[headers[colIndex]] = cell.value;
      });
      rowData.event = name;

      await insertOne(rowData);
    }
  });
}

async function generateTemplate(){
  const workbook = new exceljs.Workbook();
  const worksheet = workbook.addWorksheet('Participantes');

  // Preencha a planilha conforme necessário
  worksheet.getCell('A1').value = 'name';
  worksheet.getCell('B1').value = 'email';
  worksheet.getCell('C1').value = 'telephoneNumber';

  // Defina o cabeçalho da planilha
  worksheet.getRow(1).font = { bold: true };

  return workbook;
}


async function confirmPresenca(id) {
  const result = await EventPeopleRepository.confirmPresenca(id);
  return result;
}

module.exports = {
  getByEventName,
  generateTemplate,
  getAll,
  getById,
  updateOne,
  insertOne,
  deleteOne,
  convertXlsxToJson,
  confirmPresenca,
};
