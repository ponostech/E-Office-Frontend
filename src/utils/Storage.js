
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default {
  get(value) {
    return cookies.get(value);
  },
  set(key, value, options) {
    cookies.set(key, value, { path: '/', ...options });
  },
  remove(key, options) {
    cookies.remove(key, { path: '/', ...options });
  },
};