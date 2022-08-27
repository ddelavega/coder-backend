export default {
  sqlite3: {
    client: 'sqlite3',
    connection: {
      filename: './DB/ecommerce.sqlite'
    },
    useNullAsDefault: true
  },
  mariaDb: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      port: 8889,
      user: 'root',
      password: 'root',
      database: 'ecommerce'
    },
    pool: { min: 0, max: 7 }
  }
}