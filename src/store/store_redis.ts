import { IStore } from "./IAsyncStore"
import { IdGenerator as IdGen } from "../generator"

import redis from "redis"

export class Store implements IStore {
    client: redis.RedisClient
    generator?: IdGen

    constructor() {
        this.client = redis.createClient()
        this.init()
    }

    async init(): Promise<void> {
        this.generator = new IdGen(await this.getSize())
    }

    get(key: string): Promise<string | null> {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, value) => {
                if (err) reject(err)
                else resolve(value)
            })
        }
        );
    }

    put(value: string): Promise<string> {
        return new Promise((resolve, reject) => {
            if (!this.generator) return reject();
            const key = this.generator.getId()
            this.client.set(key, value, (err) => {
                if (err) reject(err)
                else resolve(key)
            });
        }
        );
    }

    getSize(): Promise<number> {
        return new Promise((resolve, reject) => {
            this.client.dbsize((err, number) => {
                if (err) reject(err);
                else resolve(number)
            })
        })
    }
}