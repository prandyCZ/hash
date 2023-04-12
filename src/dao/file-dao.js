const { Client } = require("pg")const dbConfig = require("../config/config").DB;class FileDao {  async _queryDB (query) {    let result;    try {      const client = new Client({        user: dbConfig.user,        host: dbConfig.host,        database: dbConfig.name,        password: dbConfig.password,        port: dbConfig.port      })      await client.connect()      result = await client.query(query)    } catch (e) {      console.log(e);      throw e;    }    return result;  }  async createTable() {    const query = `CREATE TABLE IF NOT EXISTS ${dbConfig.table} (          "id" SERIAL,          "hash" VARCHAR(40),          "filesize" INTEGER,          PRIMARY KEY ("id")    );`;    try {      await this._queryDB(query);    } catch (e) {      console.log(e);      throw new Error("Creating table failed.");    }  }  async saveFileInfo({hash, fileSize}) {    await this.createTable();    const query = `        INSERT INTO ${dbConfig.table}(hash, filesize)         VALUES ('${hash || null}', '${fileSize || null}')        RETURNING *;    `    return await this._queryDB(query);  }}module.exports = new FileDao();