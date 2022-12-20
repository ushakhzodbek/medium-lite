export interface IServerConfig {
    host: string;
    port: number;
}

export const server: IServerConfig = {
	host: "0.0.0.0",
	port: 80
};

export interface IDataBaseConfig {
    file: string;
}

export const database: IDataBaseConfig = {
	file: ""
};