import express from 'express';
import {
  existsSync, mkdirSync,
} from 'fs';
import { join } from 'path';
import eformidable from 'express-formidable';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { createTables } from './db/filmek.js';
import router from './routes/router.js';
import ReviewRouter from './routes/review.js';
import handleNotFound from './middleware/error.js';
import deleteRouter from './routes/delete.js';
import infoRouter from './routes/inforouter.js';
import authroute from './auth/auth.js';
import regrouter from './auth/register.js';
import mycommentrouter from './routes/mycomments.js';
import adminrouter from './routes/admin.js';
import { checkJwtCookie, validateJwtCookie } from './auth/middleware.js';

const app = express();

const uploadDir = join(process.cwd(), 'uploadDir');

if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir);
}

app.use(express.static(join(process.cwd(), 'static')));

app.set('view engine', 'ejs');
app.set('views', join(process.cwd(), 'views'));

app.use(morgan('tiny'));

app.use(eformidable({ uploadDir }));

app.use(cookieParser());
app.use('/', checkJwtCookie);

app.use('/auth', authroute);
app.use('/register', regrouter);

app.use('/', validateJwtCookie);

app.use('/mycomments', mycommentrouter);

app.use('/getmoreinfo', infoRouter);

app.use('/user_review', ReviewRouter);

app.use('/delete', deleteRouter);

app.use('/admin', adminrouter);

app.use('/', router);

app.use(handleNotFound);

createTables().then(() => {
  app.listen(8080, () => { console.log('Server listening on http://localhost:8080/ ...'); });
});
