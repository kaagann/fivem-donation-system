module.exports = {
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    database: 'rapixeldb',
    synchronize: true,
    logging: false,
    keepConnectionAlive: true,
    useUnifiedTopology: true,
    entities: [
        `${process.env.NODE_ENV === 'prod' ? 'dist' : 'src'}/models/**/*.[tj]s`
    ]
};
