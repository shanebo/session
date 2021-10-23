const qs = require('qs');
const cookies = require('cookies');
const keygrip = require('keygrip');

module.exports = (opts = {}) => {
  const {
    cookie = '___dylan',
    secret = 'PutAS3CretHereANDmAK3itSUP3rG00d'
  } = opts;
  const secretKey = keygrip([secret]);
  const options = {
    signed: true,
    overwrite: true
  };

  return (req, res, next) => {
    const jar = new cookies(req, res, { keys: secretKey });
    let _session = qs.parse(jar.get(cookie, options));

    req.session = {};
    req.session.get = (key) => key ? _session[key] : _session;
    req.session.set = (key, value) => {
      _session[key] = value;
      jar.set(cookie, qs.stringify(_session), options);
      return req.session;
    }
    req.session.reset = () => {
      _session = {};
      jar.set(cookie, qs.stringify(_session), options);
    }
    req.session.flash = () => {
      const flash = req.session.get('flash');
      req.session.set('flash', '');
      return flash;
    }

    if (!req.session.get('flash')) {
      req.session.set('flash', '');
    }

    next();
  }
}
