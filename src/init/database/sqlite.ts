import sqlite3 from "sqlite3";
import { open } from "sqlite";

import { database } from "../config";

export const db = open({
	filename: database.file,
	driver: sqlite3.Database
});