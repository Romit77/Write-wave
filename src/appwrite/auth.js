import conf from "../config/conf.js";

//eslint-disable-next-line
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    //eslint-disable-next-line
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login(email, password) {
    //eslint-disable-next-line
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    //eslint-disable-next-line
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    //eslint-disable-next-line
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
