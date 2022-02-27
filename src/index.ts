import express from 'express';
import cron from 'node-cron';
import mysql from 'mysql';
import fs from 'fs';

import { stringify } from 'csv-stringify';
const app = express();
const PORT = 8080;

app.get('/', (req: any, res: any) => res.send('Express + Typescript server!!!'));
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

var someData = [
    {
        "Country": "Nigeria",
        "Population": "200m",
        "Continent": "Africa",
        "Official Language(s)": "English"
    },
    {
        "Country": "India",
        "Population": "1b",
        "Continent": "Asia",
        "Official Language(s)": "Hindi, English"
    },
    {
        "Country": "United States of America",
        "Population": "328m",
        "Continent": "North America",
        "Official Language": "English"
    },
    {
        "Country": "United Kingdom",
        "Population": "66m",
        "Continent": "Europe",
        "Official Language": "English"
    },
    {
        "Country": "Brazil",
        "Population": "209m",
        "Continent": "South America",
        "Official Language": "Portugese"
    }
]

stringify(someData, {
    header: true
}, function (err: any, output: any) {
    fs.writeFile('./exports/csv/someData.csv', output, (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully");
        }
    });
});

// Node-Cron
cron.schedule('* 4 * * *', () => {
    const date = new Date();
    const dateTime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    // console.log('This message logs every minute. ', dateTime);

    const connectionMysql = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: ''
    });
    const connectionMysqlScreen = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: ''
    });

    connectionMysql.connect();

    connectionMysql.query('SELECT * FROM usuarios', function (error: any, results: any, fields: any) {
        if (error) throw error;
        let dataToImport: Array<any> = [];
        results.forEach( (row: any) => {
            dataToImport.push(row);
        });

        if (!!dataToImport.length) {
            dataToImport.forEach( (item: object) => {
                var post: object  = item;
                connectionMysqlScreen.query('INSERT INTO usuarios SET ?', post, function (error: any, results: any, fields: any) {
                if (error) throw error;
                // Neat!
                });
            })
        }
    });

    connectionMysql.end();
});
