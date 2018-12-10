import 'reflect-metadata'
import { join } from 'path'
import { GraphQLServer } from 'graphql-yoga'
import { createConnection } from 'typeorm'
import { importSchema } from 'graphql-import'
import { makeExecutableSchema } from 'graphql-tools'

import { resolvers } from './modules/todo/resolvers'

createConnection().then(() => {
  const typeDefs = importSchema(join(__dirname, './modules/todo/schema.graphql'))
  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const server = new GraphQLServer({
    schema,
  })
  server.start()
})
