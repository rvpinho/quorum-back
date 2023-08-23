const express = require('express');
const multer = require('multer');
const exceljs = require('exceljs');
const QRCode = require('qrcode');
const EventPeopleService = require('../Service/EventPeopleService');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.get("/", async (req, res) => {
    const eventPeople = await EventPeopleService.getAll();
    console.log(eventPeople);
    res.send(eventPeople);
});

router.get("/byName/:name", async (req, res) => {
  const name = req.params.name;
  const eventPeople = await EventPeopleService.getByEventName(name);
  res.send(eventPeople);
});


router.get("/generate-template", async (req, res) => {
    try {
        const worksheet = await EventPeopleService.generateTemplate();
        
        res.setHeader('Content-Disposition', 'attachment; filename=template.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        
        worksheet.xlsx.write(res)
          .then(() => {
            res.end();
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Erro ao gerar e baixar o template.');
          });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao gerar e baixar o template.');
    }
});
  
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const eventPeople = await EventPeopleService.getById(id);
    console.log(eventPeople);
    res.send(eventPeople);
});
  
router.post("/", async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const result = await EventPeopleService.insertOne(req.body);
    res.send(JSON.stringify(result));
});
  
router.put("/:id", async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const id = req.params.id;
    const result = await EventPeopleService.updateOne(id, req.body);
    res.send(JSON.stringify(result));
});
  
router.delete("/:id", async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const id = req.params.id;
    const result = await EventPeopleService.deleteOne(id);
    res.send(JSON.stringify(result));
});

router.post('/upload/:name', upload.single('file'), async (req, res) => {
    // Aqui, você pode acessar o arquivo enviado pelo formulário através de req.file
    const filePath = req.file.path;
    const name = req.params.name;
  
    try {
      const workbook = new exceljs.Workbook();
      await workbook.xlsx.readFile(filePath);

      await EventPeopleService.convertXlsxToJson(filePath, name);

      res.json({ message: 'Arquivo importado com sucesso!' });
    } catch (err) {
      console.error('Erro ao processar o arquivo:', err);
      res.status(500).json({ error: 'Erro ao processar o arquivo' });
    }
});

router.get('/qrcode/:itemId', async (req, res) => {
  try {
    const id = req.params.itemId;
    console.log(id);
    const item = await EventPeopleService.getById(id);
    if (!item) {
      return res.status(404).send('Item not found');
    }
    const qrcodeString = `http://localhost:3000/api/eventPeople/qrcode/read/${item._id}`;
    const qrCodeBuffer = await QRCode.toBuffer(qrcodeString);

    res.type('png');
    res.send(qrCodeBuffer);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});



router.get('/qrcode/read/:itemId', async (req, res) => {
  try {
    const id = req.params.itemId;
    const result = await EventPeopleService.confirmPresenca(id);
    res.send(JSON.stringify(result));
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});




module.exports = router;