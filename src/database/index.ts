import 'dotenv/config';
import knex from 'knex';
import path from 'path';

const processo = process.env.ESTADO_DA_APLICACAO;

console.log("processo: ", processo);


const db = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'DB', `${processo === 'testing' ? 'teste.db': 'database.db'}`)
    },
    migrations: {
        directory: path.resolve(__dirname, 'migrations')
    },
    useNullAsDefault: true
});

export default db;