const express = require('express');
const UserService = require('../Service/UserService');
const router = express.Router();

router.get("/", async (req, res) => {
    const users = await UserService.getAll();
    console.log(users);
    res.send(users);
});
  
router.post("/login", async (req, res) => {
    const users = await UserService.login(req.body);
    res.send(users);
});
  
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const users = await UserService.getById(id);
    console.log(users);
    res.send(users);
});
  
router.post("/", async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const result = await UserService.insertOne(req.body);
    res.send(JSON.stringify(result));
});
  
router.put("/:id", async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const id = req.params.id;
    const result = await UserService.updateOne(id, req.body);
    res.send(JSON.stringify(result));
});
  
router.delete("/:id", async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const id = req.params.id;
    const result = await UserService.deleteOne(id);
    res.send(JSON.stringify(result));
});

module.exports = router;