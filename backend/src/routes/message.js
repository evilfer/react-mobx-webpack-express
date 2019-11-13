function initMessageRoutes(app) {
  app.get('/api/message', (req, res) => {
    res.json({message: 'Hi!'});
  });
}

module.exports = initMessageRoutes;
