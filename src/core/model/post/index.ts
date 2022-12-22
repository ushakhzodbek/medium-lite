import { db as database } from "../../../init/database/sqlite";

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

const table = "posts";

export async function get(page: number = 0, size: number = 10): Promise<Array<IPost>> {
	const offset = page * size;
	const limit = size;
	return await (await database).all(`SELECT id, title, content, reading_time, author, (rating_value / rating_count) as rating FROM ${table} LIMIT ${offset},${limit}`);
}

export async function get_by_id(id: number): Promise<IPost> {
	return await (await database).get(`SELECT id, title, content, reading_time, author, (rating_value / rating_count) as rating FROM ${table} WHERE id = ${id}`);
}

export async function create(post: IPost): Promise<void | Error> {
	const reading_time = Math.round(post.content.split(" ").length / 150);
	await (await database).run(`INSERT INTO ${table}(id, title, content, reading_time, rating_value, rating_count, author) VALUES (${post.id}, '${post.title}', '${post.content}', ${reading_time}, 0, 0, ${post.author})`);
}

export async function add_rate(id: number, rate_value: number): Promise<void | Error> {
	await (await database).run(`UPDATE ${table} SET rating_value = (rating_value + ${rate_value}), rating_count = (rating_count + 1) WHERE id = ${id}`);
}

export async function get_by_user_id(user_id: number): Promise<Array<IPost>> {
	return await (await database).all(`SELECT id, title, content, reading_time, author, (rating_value / rating_count) as rating FROM ${table} WHERE author = ${user_id}`);
}

export async function get_all_posts_rating_by_user_id(user_id: number) {
	return await (await database).get(`SELECT (sum(rating_value) / sum(rating_count)) as rating FROM ${table} WHERE author = ${user_id}`);
}