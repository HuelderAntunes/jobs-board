module.exports = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    migrations: ['dist/database/migrations/*.js'],
    cli: {
        migrationsDir: './src/database/migrations',
        entitiesDir: './src/entities'
    },
    entities: ['dist/entities/**/*.js']
}
