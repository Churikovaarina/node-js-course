import { randomUUID } from 'node:crypto'
import { BaseEntity } from "../enities";

export abstract class BaseRepository<T extends BaseEntity> {
    private data: Array<T> = [];
    protected constructor(collectionName: string) {
        (async () => {
            const module = await import(`../data/${collectionName}.json`, { assert: { type: "json" } });
            this.data = module.default;
        })();
    };
    generateId() {
        return randomUUID().toString();
    };

    getAll() {
        return this.data;
    }

    search(predicate: (param: T) => boolean)  {
        return this.data.find(predicate);
    }

    insertOne(data: Omit<T, `id`>) {
        const id = this.generateId();
        const entity = {
            id,
            ...data,
        } as T;
        this.data.push(entity);
        return entity;
    }

    updateOne(id: string, body: Partial<T>) {
        const entity =  this.data.find(entity => entity.id === id);
        if(!entity)
            return;
        const newEntity = {
            ...entity,
            ...body,
        } as T;
        const entityIndex = this.data.findIndex(entity => entity.id === id);
        this.data.splice(entityIndex, 1, newEntity);
        return newEntity;
    }

    removeOne(id: string) {
        const entityIndex = this.data.findIndex(entity => entity.id === id);
        if (entityIndex === -1)
            return;
        return this.data.splice(entityIndex,1);
    }
}