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

const posts: Array<IPost> = [
    { id: 1, title: "1 Post", content: "Hello World!!!", author: users[0] },
    { id: 2, title: "2 Post", content: "Hello World!!!", author: users[1] },
    { id: 3, title: "3 Post", content: "Hello World!!!", author: users[2] },
];

//! Only For Test

export function get(page: number = 0, size: number = 10): Array<IPost> {
    const offset = page * size;
    const limit = size;
    return posts.slice(offset, offset + limit);
}

export function get_by_id(id: number): IPost {
    return posts.find(user => user.id === id);
}

export function create(post: IPost): void | Error {
    posts.push(post);
}