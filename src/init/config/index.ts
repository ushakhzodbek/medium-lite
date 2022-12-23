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
    pass_salt: string;
}

export const database: IDataBaseConfig = {
	file: "database/medium-lite",
	pass_salt: "medium-lite-password.uz.com.co.ru.io.net"
};

export interface IJWTConfig {
    secret: string;
}

export const jwt: IJWTConfig = {
	secret: "medium-lite-password.uz.com.co.ru.io.net"
};