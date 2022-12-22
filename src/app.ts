import express from "express";

import * as config from "./init/config";

import apiv1 from "./api/v1";

const app = express();

app.use(express.json());

app.use("/api/v1", apiv1);

app.listen(
	config.server.port, 
	config.server.host, 
	console.log.bind(void 0, `Server listen on ${config.server.host}:${config.server.port}`)
);