const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');

module.exports = app => {
  app.get('/', (req, resp) => {
    resp.send(`
      <html>
        <head>
          <meta charset="utf-8">
        </head>
        <body>
          <h1>Casa do Código</h1>
        </body>
      </html>
    `);
  });

  app.get('/livros', (req, resp) => {
    const livroDao = new LivroDao(db);
    livroDao.lista()
      .then(livros => resp.marko(
          require('../views/livros/lista/lista.marko'),
          { livros }
        )
      ).catch(err => console.log(err));
  });

  app.get('/livros/form', (req, resp) => {
    resp.marko(require('../views/livros/form/form.marko'), { livro: {} })
  });

  app.get('/livros/form/:id', (req, resp) => {
    const id = req.params.id;
    const livroDao = new LivroDao(db);

    livroDao.buscaPorId(id)
      .then(livro =>
        resp.marko(
          require('../views/livros/form/form.marko'),
          {livro}
        )
      )
      .catch(err => console.log(err));
  });

  app.post('/livros', (req, resp) => {
    console.log(req.body);
    const livroDao = new LivroDao(db);
    livroDao.adiciona(req.body)
      .then(resp.redirect('/livros'))
      .catch(err => console.log(err));
  });

  app.put('/livros', (req, resp) => {
    console.log(req.body);
    const livroDao = new LivroDao(db);
    livroDao.atualiza(req.body)
      .then(resp.redirect('/livros'))
      .catch(err => console.log(err));
  });

  app.delete('/livros/:id', (req, resp) => {
    const id = req.params.id;
    const livroDao = new LivroDao(db);
    livroDao.remove(id)
      .then(() => resp.status(200).end())
      .catch(err => console.log(err));
  });
};
