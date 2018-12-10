import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn, ManyToOne } from 'typeorm'
import { Comment } from './Comment'
import { Category } from './Category'

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public title: string

  @Column()
  public content: string

  @OneToOne(() => Comment)
  @JoinColumn()
  public comment: Comment

  @ManyToOne(() => Category)
  @JoinColumn()
  public category: Category
}
