import knex from 'knex';
import path from 'path';

const connection = knex({
    client: 'pg',
    connection: {
        database: 'ecoleta',
        user: 'postgres',
        password: '4l9u2i7s',
        host: 'localhost',
        port: 5432
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    }
})

export default connection;