import { getRepository } from 'typeorm'
import { Todo } from '../../entity/Todo'

export const resolvers = {
  Query: {
    hello: () => {
      return 'Hello baby'
    },
    todoList: async () => {
      const todoRepo = getRepository(Todo)
      const todos = await todoRepo.find({
        relations: ['comment', 'category'],
      })
      return todos
    },
  },
}
