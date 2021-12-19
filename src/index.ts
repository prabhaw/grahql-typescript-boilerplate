import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import http from 'http'
import { buildSchema } from 'type-graphql'
import { resolvers } from './resolvers/resolvers'
import { ApolloServerPluginLandingPageProductionDefault } from 'apollo-server-core/dist/plugin/landingPage/default'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core/dist/plugin/landingPage/graphqlPlayground'
import connectdb from './config/mongodb'

async function listen(port: number) {
  const app = express()
  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: resolvers,
      validate: false,
    }),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    context: () => {},
  })

  await server.start()
  server.applyMiddleware({ app })

  return new Promise((resolve, reject) => {
    httpServer.listen(port).once('listening', resolve).once('error', reject)
  })
}

async function main() {
  try {
    const PORT = Number(process.env.PORT) || 4000
    const db = await connectdb()
    console.log(db)
    await listen(PORT)
    console.log(`🚀 Server is ready at http://localhost:${PORT}/graphql`)
  } catch (error) {
    console.error('💀 Error starting the server', error)
  }
}

void main()
