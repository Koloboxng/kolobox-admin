/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import Vue from 'vue';
import axios from 'axios';
// set defaults
axios.defaults.baseURL = 'https://api-staging.kolobox.ng';
// axios.defaults.

const redirect = (context, redirectUrl) => {
  if (redirectUrl) context.$router.replace(redirectUrl);
};

const validToken = token => (!!token);

const handleErrors = errorHandler => (errors) => {
  if (errorHandler) errorHandler(errors);
};


class Authenticate {
  constructor(context, loginUrl, logoutUrl) {
    this.loginUrl = loginUrl;
    this.logoutUrl = logoutUrl;
    this.authenticated = this.check();
    this.context = context;
  }

  login(context, input, redirectUrl = false, errorHandler = false) {
    axios.post(this.loginUrl, input)
      .then((response) => {
        console.log('response', response);
        this.setToken(response.data.data.token);
        this.authenticated = true;
        localStorage.setItem('email', response.data.data.email);
        redirect(context, redirectUrl);
      }, handleErrors(errorHandler));
  }

  logout(context, refreshUrl = false) {
    this.removeToken();
    this.authenticated = false;

    redirect(context, refreshUrl);
  }

  check() {
    return validToken(this.getToken());
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  removeToken() {
    localStorage.removeItem('token');
  }
}

const Auth = {
  install(
    vue,
    options = {
      loginUrl: '/api/login',
      logoutUrl: '/api/logout',
      refresh: false,
    },
  ) {
    vue.prototype.$auth = new Authenticate(
      vue,
      options.loginUrl,
      options.logoutUrl,
    );
    if (options.refresh) {
      axios.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        config.headers.Accept = 'application/json';
        return config;
      }, err => Promise.reject(err.request));

      axios.interceptors.response.use((response) => {
        if (response.status === 401) vue.prototype.$auth.removeToken();
        if (response.data.data.token) vue.prototype.$auth.setToken(response.data.data.token);
        return response;
      }, err => Promise.reject(err.response));
    }
  },
};

if (typeof exports === 'object') module.exports = Auth;
else if (window.Vue) Vue.use(Auth);

export default Auth;
