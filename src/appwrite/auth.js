import conf from "../conf/conf";

// see appwrite auth docs for below code

//eslint-disable-next-line
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  //here we createed the methods and then if we want to use these other places we do this.account and this.client etc

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client); // docs -> const account = new account(client) -- same code-- just made classes and constructors
  }

  async createAccount({ email, password, name }) {
    //eslint-disable-next-line
    try {
      const userAccount = await this.account.create(
        ID.unique(), // appwrite docs says we need a user id first for create account
        email,
        password,
        name
      );
      if (userAccount) {
        //cal method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    //eslint-disable-next-line
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    // to check if user logged in or not
    //eslint-disable-next-line
    try {
      return await this.account.get(); // built in method
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    //eslint-disable-next-line
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
