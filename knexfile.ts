import path from 'path';
import 'dotenv/config';

const processo = process.env.ESTADO_DA_APLICACAO;

module.exports = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'src', 'database', 'DB', 
        `${processo === 'testing' ? 'test.db': 'database.db'}`)
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault: true
}