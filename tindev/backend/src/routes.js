const express = require('express');
const route = express.Router();
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');

route.get('/', (request, response) => {
    response.send('ok');
});

route.post('/', DevController.store );
route.post('/dev/:devId/likes', LikeController.store);
route.post('/dev/:devId/dislikes', DislikeController.store);

module.exports = route;