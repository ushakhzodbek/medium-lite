export interface IPost {
    id: number;
    title: string;
    content: string;
    author: IUser;
}

export interface IUser {
    id: number;
    email: string;
    password: number;
    posts: IPost[];
}

//! Only For Test

const users: Array<IUser> = [
    { id: 1, email: "test1@test.com", password: 132456, posts: [] },
    { id: 2, email: "test2@test.com", password: 132456, posts: [] },
    { id: 3, email: "test3@test.com", password: 132456, posts: [] },
];

//! Only For Test

export function get(page: number = 0, size: number = 10): Array<IUser> {
    const offset = page * size;
    const limit = size;
    return users.slice(offset, offset + limit);
}

export function get_by_id(id: number): IUser {
    return users.find(user => user.id === id);
}

export function create(user: IUser): void | Error {
    users.push(user);
}