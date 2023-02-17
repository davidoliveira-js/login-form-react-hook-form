const Redis = require('ioredis');
const redis = new Redis({});

class MainCacheManipulator {
  constructor(prefix) {
    this._prefix = prefix;
  }

  async expireAt(key, expirationDate) {
    try {
      return await redis.expireat(
        `${this._prefix}${key}`,
        expirationDate
      );
    } catch (error) {
      throw error;
    }
  }

  /* comandos básicos */

  async set(key, value, expirationDate) {
    try {
      await redis.set(`${this._prefix}${key}`, value);

      return await this.expireAt(
        `${this._prefix}${key}`,
        expirationDate
      );
    } catch (error) {
      throw error;
    }
  }

  async mset(values) {
    try {
      let msetValues = [];
      Object.keys(values).map((key) =>
        msetValues.push(`${this._prefix}${key}`, values[key])
      );
      return await redis.mset(msetValues);
    } catch (error) {
      throw error;
    }
  }

  async get(key) {
    try {
      return await redis.get(`${this._prefix}${key}`);
    } catch (error) {
      throw error;
    }
  }

  async exists(key) {
    try {
      return await redis.exists(`${this._prefix}${key}`);
    } catch (error) {
      throw error;
    }
  }

  async del(key) {
    try {
      return await redis.del(`${this._prefix}${key}`);
    } catch (error) {
      throw error;
    }
  }

  /* comandos de incrementação básicos */

  async incr(key) {
    try {
      return await redis.incr(`${this._prefix}${key}`);
    } catch (error) {
      throw error;
    }
  }

  async decr(key) {
    try {
      return await redis.decr(`${this._prefix}${key}`);
    } catch (error) {
      throw error;
    }
  }

  async incrby(key, value) {
    try {
      return await redis.incrby(`${this._prefix}${key}`, value);
    } catch (error) {
      throw error;
    }
  }

  async decrby(key, value) {
    try {
      return await redis.decrby(`${this._prefix}${key}`, value);
    } catch (error) {
      throw error;
    }
  }

  /* comandos de hashe */

  async hset(key, field, value) {
    try {
      return await redis.hset(`${this._prefix}${key}`, field, value);
    } catch (error) {
      throw error;
    }
  }

  async hmset(key, values, expirationDate) {
    try {
      let hmsetValues = [];

      Object.keys(values).map((key) =>
        hmsetValues.push(key, values[key])
      );

      await redis.hmset(`${this._prefix}${key}`, hmsetValues);
      return await this.expireAt(
        `${this._prefix}${key}`,
        expirationDate
      );
    } catch (error) {
      throw error;
    }
  }

  async hmsetsimple(key, values, expirationDate) {
    try {
      await redis.hmset(`${this._prefix}${key}`, values);
      return await this.expireAt(
        `${this._prefix}${key}`,
        expirationDate
      );
    } catch (error) {
      throw error;
    }
  }

  async hget(key, field) {
    try {
      return await redis.hget(`${this._prefix}${key}`, field);
    } catch (error) {
      throw error;
    }
  }

  async hgetall(key) {
    try {
      const data = await redis.hgetall(`${this._prefix}${key}`);
      if (Object.keys(data).length == 0) {
        throw error;
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  async hgetallAndParseToJson(key) {
    try {
      const data = await this.hgetall(key);
      if (Object.keys(data).length == 0) {
        throw error;
      }
      let parsedData = [];
      Object.keys(data).forEach((item) => {
        parsedData.push(JSON.parse(data[item]));
      });

      return parsedData;
    } catch (error) {
      throw error;
    }
  }

  /* comandos de incrementação de dicionário */

  async hincrby(key, field, value) {
    try {
      return await redis.hincrby(
        `${this._prefix}${key}`,
        field,
        value
      );
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MainCacheManipulator;
