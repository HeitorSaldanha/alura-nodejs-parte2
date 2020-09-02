const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');
class LivroControlador {

  static rotas() {
    return {
      lista: '/livros',
      cadastro: '/livros/form',
      edicao: '/livros/form/:id',
      delecao: '/livros/:id'
    }
  }

  lista() {
    return (req, resp) => {
      const livroDao = new LivroDao(db);
      livroDao.lista()
        .then(livros => resp.marko(
          require('../views/livros/lista/lista.marko'),
          {
            livros: req.body
          }
        ))
        .catch(erro => console.log(erro));
    }
  }

  formularioCadastro() {
    return (req, resp) => {
      resp.marko(require('../views/livros/form/form.marko'), { livro: {} });
    }
  }

  formularioEdicao() {
    return (req, resp) => {
      const id = req.params.id;
      const livroDao = new LivroDao(db);
      livroDao.buscaPorId(id)
        .then(livro =>
          resp.marko(
            require('../views/livros/form/form.marko'),
            { livro }
          )
        )
        .catch(erro => console.log(erro));
    }
  }

  cadastra() {
    return (req, resp) => {
      console.log(req.body);
      const livroDao = new LivroDao(db);
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return resp.marko(require('../views/livros/form/form.marko'),
        {
          livro: req.body,
          errosValidacao: errors.array()
        });
      } else {
        livroDao.adiciona(req.body)
          .then(resp.redirect(rotas.lista))
          .catch(erro => console.log(erro));
      }
    }
  }

  edita() {
    return (req, resp) => {
      console.log(req.body);
      const livroDao = new LivroDao(db);
      livroDao.atualiza(req.body)
        .then(resp.redirect(rotas.lista))
        .catch(erro => console.log(erro));
    }
  }

  remove() {
    return (req, resp) => {
      const id = req.params.id;
      const livroDao = new LivroDao(db);
      livroDao.remove(id)
        .then(() => resp.status(200).end())
        .catch(erro => console.log(erro));
    }
  }
}

module.exports = LivroControlador;