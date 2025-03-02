// import mysql, { Connection } from 'mysql2/promise';
// // Create the connection to database
// export default async function connection(): Promise<Connection> {
//     const connection = await mysql.createConnection({
//         host: process.env.MYSQL_HOST,
//         user: process.env.MYSQL_USER,
//         database: process.env.MYSQL_DATABASE,
//         port: Number(process.env.MYSQL_PORT),
//         waitForConnections: true,
//         connectionLimit: 10, // Número máximo de conexiones simultáneas
//         queueLimit: 0 // Sin límite de conexiones en espera
//     });
//     return connection;
// }


import mysql from 'mysql2/promise';
// Create the connection to database

const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    port: Number(process.env.MYSQL_PORT),
    waitForConnections: true,
    connectionLimit: 10, // Número máximo de conexiones simultáneas
    queueLimit: 0 // Sin límite de conexiones en espera
});


export default connection;