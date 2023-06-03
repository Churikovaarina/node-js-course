import { BaseEntity } from "./base.entity.js";

export interface UserEntity extends BaseEntity {
    username: string;
    name?: string;
}