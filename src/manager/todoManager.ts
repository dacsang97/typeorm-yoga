import { Request, Response } from 'express'
import { getRepository, Repository } from 'typeorm'
import { Todo } from '../entity/Todo'
import { Comment } from '../entity/Comment'
import { Category } from '../entity/Category'

let initialized: boolean = false
let todoRepository: Repository<Todo>
let commentRepository: Repository<Comment>
let categoryRepository: Repository<Category>

const initialize = () => {
  initialized = true
  todoRepository = getRepository(Todo)
  commentRepository = getRepository(Comment)
  categoryRepository = getRepository(Category)
}

export const createTodo = async (req: Request, res: Response) => {
  if (!initialized) {
    initialize()
  }
  const comment = new Comment()
  comment.content = 'Ahihi'
  await commentRepository.save(comment)

  const category = new Category()
  category.name = 'Phim x'
  await categoryRepository.save(category)

  const todo = new Todo()
  const { title, content } = req.body
  todo.title = title
  todo.content = content
  todo.comment = comment
  todo.category = category
  await todoRepository.save(todo)
  res.send(todo)
}

export const getAllTodos = async (_, res: Response) => {
  if (!initialized) {
    initialize()
  }
  const todos = await todoRepository.find({
    relations: ['comment', 'category'],
  })
  res.send(todos)
}

export const getTodoById = async (req: Request, res: Response) => {
  if (!initialized) {
    initialize()
  }
  const { id } = req.params
  let todo
  try {
    todo = await todoRepository.find({
      where: {
        id,
      },
      relations: ['comment'],
    })
    res.send(todo)
  } catch (error) {
    res.status(404).send({
      error: 'D tim thay',
    })
  }
}

export const updateTodo = async (req, res) => {
  if (!initialized) {
    initialize()
  }
  const { title, content } = req.body
  const { id } = req.params

  let todo
  try {
    todo = await todoRepository.findOneOrFail({
      where: {
        id,
      },
    })
    todo.title = title
    todo.content = content
    await todo.save()
    res.send(todo)
  } catch (error) {
    console.log(error)
    res.status(404).send({
      error: 'D tim thay',
    })
  }
}

export const deleteTodo = async (req, res) => {
  const { id } = req.params
  if (!initialized) {
    initialize()
  }
  let todo
  try {
    todo = await todoRepository.delete({
      id,
    })
    res.send(todo)
  } catch (error) {
    console.log(error)
    res.status(404).send({
      error: 'D tim thay',
    })
  }
}
