import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
// Import { Todo } from './Todo'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public name: string

  // @OneToMany(() => Todo, todo => todo.category)
  // todos: Todo[]
}
