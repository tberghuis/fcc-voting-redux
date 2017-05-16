import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const apiRoot = process.env.REACT_APP_API_BASE_URL;

const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

const requests = {
  del: url =>
    superagent.del(`${apiRoot}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${apiRoot}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${apiRoot}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${apiRoot}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (email, password) => {
    console.log(email, password);

    return requests.post('/auth/login', { user: { email, password } })
  },
  register: (username, email, password) =>
    requests.post('/auth/register', { user: { username, email, password } }),
  save: user =>
    requests.put('/user', { user })
};

const Polls = {
  delete: id => requests.del('/polls/' + id),
  get: id => requests.get('/polls/' + id),
  all: () => requests.get('/polls'),
  my: () => requests.get('/polls/my'),
  create: (title, options) =>
    requests.post('/polls/create', { title, options }),
  vote: (id, optionIndex, newOption) =>
    requests.post('/polls/' + id, { optionIndex, newOption })
};


export default {
  Auth,
  Polls,
  setToken: _token => { token = _token; }
};
