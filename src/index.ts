import express from 'express';

const app = express();
const PORT = 8080;

app.get('/', (req: any, res: any) => res.send('Express + Typescript server!!!'));
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
