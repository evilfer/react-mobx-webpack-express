function initApiCatchAll(app) {
  app.get('/api/*', (req, res) => {
    res.sendStatus(404);
  });
}

module.exports = initApiCatchAll;
