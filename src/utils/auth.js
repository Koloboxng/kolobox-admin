/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import Vue from 'vue';
import axios from 'axios';

const LIVE_SERVER = process.env.VUE_APP_LIVE_API_URL || 'https://api.kolobox.ng';
const STAGING_SERVER = process.env.VUE_APP_STAGING_API_URL || 'https://api-staging.kolobox.ng';
const LOCAL_SERVER = process.env.VUE_APP_LOCAL_API_URL || 'http://localhost:9200';

// Auto-select API URL based on VUE_APP_NODE_ENV
const getApiUrl = () => {
  switch (process.env.VUE_APP_NODE_ENV) {
    case 'local':
      return LOCAL_SERVER;
    case 'development':
      return STAGING_SERVER;
    case 'production':
      return LIVE_SERVER;
    default:
      return STAGING_SERVER;
  }
};

// set defaults
axios.defaults.baseURL = getApiUrl();

const redirect = (context, redirectUrl) => {
  if (redirectUrl) context.$router.replace(redirectUrl);
};

const validToken = token => !!token;

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
    axios.post(this.loginUrl, input).then((response) => {
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
    localStorage.removeItem('email');
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
    vue.prototype.$auth = new Authenticate(vue, options.loginUrl, options.logoutUrl);
    if (options.refresh) {
      axios.interceptors.request.use(
        (config) => {
          config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
          config.headers.Accept = 'application/json';
          return config;
        },
        err => Promise.reject(err.request),
      );

      axios.interceptors.response.use(
        (response) => {
          if (response.status === 401) vue.prototype.$auth.removeToken();
          if (response.data.data.token) vue.prototype.$auth.setToken(response.data.data.token);
          return response;
        },
        err => Promise.reject(err.response),
      );
    }
  },
};

if (typeof exports === 'object') module.exports = Auth;
else if (window.Vue) Vue.use(Auth);

export default Auth;
