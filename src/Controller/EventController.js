const express = require('express');
const EventService = require('../Service/EventService');
const router = express.Router();


router.get("/", async (req, res) => {
    const events = await EventService.getAll();
    console.log(events);
    res.send(events);
});
  
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const events = await EventService.getById(id);
    console.log(events);
    res.send(events);
});
  
router.post("/", async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const result = await EventService.insertOne(req.body);
    res.send(JSON.stringify(result));
});

router.put("/:id", async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const id = req.params.id;
    const result = await EventService.updateOne(id, req.body);
    res.send(JSON.stringify(result));
});
  
router.delete("/:id", async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const id = req.params.id;
    const result = await EventService.deleteOne(id);
    res.send(JSON.stringify(result));
});


module.exports = router;