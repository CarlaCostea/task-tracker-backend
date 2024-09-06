import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(
    @Query('title') title?: string,
    @Query('completed') completed?: string,
  ) {
    const isCompleted = completed === 'true';
    
    return this.tasksService.getAllTasks({ title, completed: isCompleted });
  }

  @Get(':id')
  getTaskById(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  addTask(@Body() taskDto: CreateTaskDto) {
    return this.tasksService.addTask(taskDto);
  }

  @Put(':id')
  markTaskAsCompleted(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.markTaskAsCompleted(id);
  }

  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.deleteTask(id);
  }
}
