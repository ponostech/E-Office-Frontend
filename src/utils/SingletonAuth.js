
var instance = null;
var user=null;

export default class SingletonAuth {
  constructor() {

    if(!instance){
      instance = this;
    }

    this.currentUser = user;
    return instance;
  }

  setCurrentUser(currentUser){
    this.currentUser=currentUser;
    user=currentUser
  }
  getCurrentUser() {
    return this.currentUser
  }
}