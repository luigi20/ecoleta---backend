module.exports = {
    client: 'pg',
    connection: {
        database: 'ecoleta',
        user: 'postgres',
        password: '4l9u2i7s',
        host: 'localhost',
        port: 5432,
        extension: 'ts'
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        directory: './src/database/migrations'
    },
    seeds: {
        directory: './src/database/seeds'
    }
};