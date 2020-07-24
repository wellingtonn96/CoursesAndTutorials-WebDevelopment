import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common';

const mockUser = { id: 12, username: 'Test user' };

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
  createTask: jest.fn(),
  delete: jest.fn(),
});

describe('TaskService', () => {
  let tasksService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    tasksService = await module.get<TasksService>(TasksService);
    taskRepository = await module.get<TaskRepository>(TaskRepository);
  });

  describe('getTasks', () => [
    it('get all from the repository', async () => {
      taskRepository.getTasks.mockResolvedValue('someValue');

      expect(taskRepository.getTasks).not.toHaveBeenCalled();

      const filters: GetTasksFilterDto = {
        status: TaskStatus.IN_PROGRESS,
        search: 'Some search query',
      };

      const results = await tasksService.getTasks(filters, mockUser);

      expect(taskRepository.getTasks).toHaveBeenCalled();
      expect(results);
    }),
  ]);

  describe('getTaskById', () => {
    it('calls taskRepository.findO ne and  succesiffuly retrive and return the task', async () => {
      const mockTask = { title: 'test task', description: 'Test desc' };
      taskRepository.findOne.mockResolvedValue(mockTask);

      const results = await tasksService.getTaskById(1, mockUser);

      expect(results).toEqual(mockTask);

      expect(taskRepository.findOne).toHaveBeenCalledWith({
        where: {
          id: 1,
          userId: mockUser.id,
        },
      });
    });

    it('throws an error as task is not found', () => {
      taskRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById(1, mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });

    describe('createTask', () => {
      it('calls taskRepository.create() and returns the result', async () => {
        taskRepository.createTask.mockResolvedValue('someTask');

        expect(taskRepository.createTask).not.toHaveBeenCalled();
        const createTaskDto = { title: 'Task task', description: 'task desc' };
        const result = await tasksService.createTask(createTaskDto, mockUser);
        expect(taskRepository.createTask).toHaveBeenCalledWith(
          createTaskDto,
          mockUser,
        );
        expect(result).toEqual('someTask');
      });
    });

    describe('deleteTask', () => {
      // it('calls taskRepository.deleteTask() to delete a task', async () => {
      //   taskRepository.delete.mockResolvedValue({ affected: 1 });

      //   expect(taskRepository.delete).not.toHaveBeenCalled();
      //   await tasksService.deleteTask(1, mockUser);
      //   expect(taskRepository.delete).toHaveBeenCalledWith({
      //     id: 1,
      //     userId: mockUser.id,
      //   });
      // });

      it('throws an error as task coud not be found', () => {
        taskRepository.delete.mockResolvedValue({ affected: 0 });
        expect(tasksService.deleteTask(1, mockUser)).rejects.toThrow(
          NotFoundException,
        );
      });
    });

    describe('updateTaskStatus', () => {
      it('updates a task status', async () => {
        const save = jest.fn().mockResolvedValue(true);

        tasksService.getTaskById = jest.fn().mockResolvedValue({
          status: TaskStatus.OPEN,
          save,
        });

        expect(tasksService.getTaskById).not.toHaveBeenCalled();
        expect(save).not.toHaveBeenCalled();
        const result = await tasksService.updateStatusTask(
          1,
          TaskStatus.DONE,
          mockUser,
        );
        expect(save).toHaveBeenCalled();
        expect(result.status).toEqual(TaskStatus.DONE);
      });
    });
  });
});
