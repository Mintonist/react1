const express = require('express');
const Quality = require('../model/Quality');
const router = express.Router({ mergeParams: true });

// /api/quality/
router.get('/', async (req, res) => {
  try {
    const list = await Quality.find();
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({ message: 'Ошибка работы с БД' });
  }
});

module.exports = router;
