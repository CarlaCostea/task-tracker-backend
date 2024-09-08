import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  getAllTasks(filter?: {
    title?: string;
    completed?: boolean;
  }): Promise<Task[]> {
    const query = this.taskRepository.createQueryBuilder('task');

    if (filter?.title) {
      query.andWhere('task.title LIKE :title', { title: `%${filter.title}%` });
    }

    if (typeof filter?.completed === 'boolean') {
      query.andWhere('task.completed = :completed', {
        completed: filter.completed,
      });
    }

    return query.getMany();
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  addTask(taskDto: { title: string; description: string }): Promise<Task> {
    const newTask = this.taskRepository.create({
      ...taskDto,
      completed: false,
    });
    return this.taskRepository.save(newTask);
  }

  async markTaskAsCompleted(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (task) {
      task.completed = !task.completed;
      return this.taskRepository.save(task);
    }
    return null;
  }

  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
