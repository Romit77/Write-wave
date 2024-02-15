import conf from "../conf/conf.js";
//eslint-disable-next-line
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, Content, FeaturedImage, Status, UserId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          Content,
          FeaturedImage,
          Status,
          UserId,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: createPost :: error", error);
    }
  }

  async updatePost(slug, { title, Content, FeaturedImage, Status }) {
    //which dosument we need to update , its id is required in this method so we take the slug first
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          //what to update
          title,
          Content,
          FeaturedImage,
          Status,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deletePost :: error", error);
      return false;
    }
  }

  //how to get single post

  async getPost(slug) {
    //eslint-disable-next-line
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  }

  // query docs end
  async getPosts(queries = [Query.equal("Status", "active")]) {
    // here queries is just a variable ...main method is inside the [] brackets

    // Query.equal("Status", "active")  -> return a document if attribute is equal to any value in the provided array

    try {
      return await this.databases.listDocuments(
        //see documentation for these methods
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries // method inside the [] in queries is passed here
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //file upload methods

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //delete file
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}
const service = new Service();
export default service;
