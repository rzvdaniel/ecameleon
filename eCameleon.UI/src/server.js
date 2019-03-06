import sirv from 'sirv';
import compression from 'compression';
import express from 'express';
import bodyParser from 'body-parser';
import * as sapper from '../__sapper__/server.js';

// API routes
import appRoutes from './api/app.routes';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/app', appRoutes);

app.use(
	compression({ threshold: 0 }),
	sirv('static', { dev }),
	sapper.middleware()
)
.listen(PORT, function () {
  console.log('App on PORT: ' + PORT);
});