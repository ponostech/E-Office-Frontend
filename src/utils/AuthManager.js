import storage from './Storage';

function expiryTime(expiresIn = 0) {
  return new Date(Date.now() + expiresIn * 1000);
}

const defaultTokenName = 'access_token';

export default class AuthManager {
  //////////////////////////////////////////////////////////////////////
  /////////////////////////////// TOKEN ////////////////////////////////
  //////////////////////////////////////////////////////////////////////

  /**
   * @param {string} token
   * @param {Number} expiresIn
   * @param {Object} options
   * @param {string} name
   */
  static setToken(
    token,
    expiresIn = 0,
    options = {},
    name = defaultTokenName,
  ) {
    const expires = expiryTime(expiresIn);

    storage.set(name, token, {
      ...options,
      expires,
    });
  }

  /**
   * @param {string} name
   *
   * @returns {string}
   */
  static getToken(name = defaultTokenName) {
    return storage.get(name);
  }

  /**
   * Delete the currently stored token
   *
   * @param {Object} options
   * @param {string} name
   */
  static deleteToken(options = {}, name = defaultTokenName) {
    storage.remove(name, options);
  }

  //////////////////////////////////////////////////////////////////////
  //////////////////////////////// USER ////////////////////////////////
  //////////////////////////////////////////////////////////////////////

  /**
   * Log in an user
   *
   * @param {Object} user
   * @param {Number} expiresIn
   * @param {Object} options
   */
  static login(user, expiresIn = 0, options = {}) {
    if (!user) {
      return;
    }

    storage.set(
      'user',
      { id: user.id },
      { ...options, expires: expiryTime(expiresIn) },
    );
  }

  /**
   * Get the current authenticated user
   *
   * @return {Object|null}
   */
  static getUser() {
    return storage.get('user');
  }

  /**
   * Check if the user is logged in
   *
   * @returns {boolean}
   */
  static isLoggedIn() {
    const user = AuthManager.getUser();

    return Boolean(user && user.id && AuthManager.getToken());
  }

  /**
   * Log the user out
   *
   * @param {Object} options
   */
  static logout(options = {}) {
    AuthManager.deleteToken(options);
    storage.remove('user', options);
  }
}