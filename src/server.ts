import 'dotenv/config'
import express from 'express';
import routes from './routes/index.routes';

const app = express();
app.use(express.json());
app.use(routes);



app.listen(3333);
console.log("server running into port 3333")
export default app;