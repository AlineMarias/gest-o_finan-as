const express = require('express');
const router = express.Router();

router.get('/search', (req, res) => {
    res.send('Página de busca');
});

module.exports = router;