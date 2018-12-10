import { Request, Response, NextFunction } from 'express'
import { Repository, getRepository } from 'typeorm'
import { Todo } from '../entity/Todo'
import { Comment } from '../entity/Comment'

let initialized: boolean = false
let todoRepository: Repository<Todo>
let commentRepository: Repository<Comment>

const initialize = () => {
  initialized = true
  todoRepository = getRepository(Todo)
  commentRepository = getRepository(Comment)
}

export const createComment = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const { content } = req.body
  if (!initialized) {
    initialize()
  }

  try {
    const comment = new Comment()
    comment.content = content
    await commentRepository.save(comment)

    const todo = await todoRepository.findOneOrFail({
      id,
    })
    todo.comment = comment
    todoRepository.save(todo)
    res.send(todo)
  } catch (error) {
    next(error)
  }
}
