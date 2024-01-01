import { Injectable, Scope } from "@nestjs/common";

interface User {
    name: string,
    age: number,
    id: number
}

@Injectable({ scope: Scope.DEFAULT })
export class UserStore {
    private store = new Map<Number, User>();

    constructor() {
        console.log("object init")
    }

    addUser(user: User) {
        this.store.set(user.id, user);
    }

    getAllUser() {
        return Array.from(this.store).map((_, user) => user);
    }

    getUserById(id: number) {
        return this.store.get(id);
    }

    updateUser(id: number, user: User) {
        this.store.set(id, user);
    }

    deleteUser(id: number) {
        this.store.delete(id)
    }

}