const express = require('express')
const graphqlHTTP = require('express-graphql')
const app = express()
const schema = require('./schema')

app.use(
  '/graphql',
  graphqlHTTP(req => {
    return {
      schema,
      context: {},
      graphiql: true
    }
  })
)

app.listen(4000)
