const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
    res.json([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]);
});

module.exports = router;
