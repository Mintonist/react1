const express = require('express');
const Profession = require('../model/Profession');
const router = express.Router({ mergeParams: true });

// /api/profession/
router.get('/', async (req, res) => {
  try {
    const list = await Profession.find();
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({ message: 'Ошибка работы с БД' });
  }
});

module.exports = router;
