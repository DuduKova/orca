import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    // getAll() {
    //     return this.http.get<User[]>(`localhost:3000/users`);
    // }

    getById(id: number) {
        return this.http.get(`localhost:3000/users/${id}`);
    }

    register(user: User) {
        return this.http.post(`localhost:3000/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`localhost:3000/users/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`localhost:3000/users/${id}`);
    }
}
