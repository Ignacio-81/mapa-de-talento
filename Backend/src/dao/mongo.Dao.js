import MongoClient from "../classes/MongoClient.class.js";
import CustomError from "../classes/CustomError.class.js";

export default class MongoDao {
  constructor(collection) {
    this.db = new MongoClient();
    this.collection = collection;
  }

  async findById(id) {
    try {
      await this.db.connect();
      //Find object inside the array with the id

      const data = await this.collection.find({ _id: id });
      return data[0];
    } catch (err) {
      const error = new CustomError(
        500,
        "Error getting data from the database"
      );
    } finally {
      await this.db.disconnect();
    }
  }
  async findAll() {
    try {
      await this.db.connect();
      const data = await this.collection.find({});
      return data;
    } catch (err) {
      const error = new CustomError(
        500,
        "Error getting data from the database"
      );
    } finally {
      await this.db.disconnect();
    }
  }

  async save(data) {
    try {
      await this.db.connect();
      const res = await this.collection(data).save();
      console.log("New Product Inserted");
      return res._id;
    } catch (err) {
      const error = new CustomError(500, "Error while writing DataBase:");
    } finally {
      await this.db.disconnect();
    }
  }

  async modif(id, data) {
    try {
      await this.db.connect();
      const response = await this.collection.updateOne({ _id: id }, data);
      if (response.modifiedCount) {
        console.log("respuesta");
        console.log(response);
        return data;
      } else {
        throw new Error(`A problem while updating object: ${response}`);
      }
    } catch (err) {
      const error = new CustomError(500, "Error while reading DataBase");
    } finally {
      await this.db.disconnect();
    }
  }

  async deleteById(id) {
    try {
      await this.db.connect();
      const response = await this.collection.deleteOne({ _id: id });
      if (response.deletedCount) {
      } else {
        throw new Error(`A problem while deleting object: ${response}`);
      }
      return res._id;
    } catch (err) {
      const error = new CustomError(500, "Error while deleting data with id");
    } finally {
      await this.db.disconnect();
    }
  }

  async deleteAll() {
    try {
      await this.db.connect();
      await this.collection.deleteMany();
      console.log("All products were deleted successfully");
    } catch (err) {
      const error = new CustomError(
        500,
        "Error while deleting all data from table"
      );
    } finally {
      await this.db.disconnect();
    }
  }
}
