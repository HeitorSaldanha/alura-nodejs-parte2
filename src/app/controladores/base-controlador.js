class BaseControlador {

  static rotas() {
    return {
      home: '/'
    }
  }

  home() {
    return (req, resp) => {
      resp.marko(
        require('../views/base/home/home.marko')
      );
    }
  }
}

module.exports = BaseControlador;