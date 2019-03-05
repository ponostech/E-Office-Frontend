
let instance = null;

export default class SingletonAuth {
  constructor() {

    if(!instance){
      instance = this;
    }

    this.currentUser = null;
    return instance;
  }

  setCurrentUser(currentUser){
    this.currentUser=currentUser
  }
  getCurrentUser() {
    return this.currentUser
  }
}