import 'reflect-metadata'
import { createConnection } from 'typeorm'
import * as Express from 'express'
import * as bodyParser from 'body-parser'
import { createTodo, getAllTodos, getTodoById, updateTodo, deleteTodo } from './manager/todoManager'
import { createComment } from './manager/commentManager'

createConnection().then(() => {
  const app = Express()

  app.use(
    bodyParser.urlencoded({
      extended: false,
    }),
  )

  app.get('/', (_, res) => {
    res.send('Hello')
  })

  // CRUD : CREATE - READ - UPDATE - DELETE
  // RESTFUL API
  app.post('/todo', createTodo)
  app.get('/todo', getAllTodos)
  app.get('/todo/:id', getTodoById)
  app.patch('/todo/:id', updateTodo)
  app.delete('/todo/:id', deleteTodo)

  app.post('/todo/:id/comment', createComment)

  app.listen(3000)
})
