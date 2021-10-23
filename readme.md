# Session

Middleware for Dylan which provides cookie based sessions.

## Install

`npm install @dylan/session`

## Usage

``` js
const dylan = require('dylan');
const session = require('@dylan/session');
const app = dylan();

app.use(session({
  cookie: 'foo',
  secret: 'boo'
}));

app.get('/foo', (req, res) => {
  req.session.set('message', 'hello world');
});

app.get('/boo', (req, res) => {
  req.session.get('message'); // returns 'hello world'
});
```
