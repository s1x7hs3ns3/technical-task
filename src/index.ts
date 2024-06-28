import 'module-alias/register';
import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import postRoutes from 'routes/posts';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use(bodyParser.json());
app.use('/api', postRoutes);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
