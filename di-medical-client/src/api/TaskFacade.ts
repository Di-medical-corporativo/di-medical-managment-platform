import { AxiosError } from "axios";
import { api } from "src/boot/axios";
import { Either, Left, Right } from "src/entities/Either";
import { Task } from "src/entities/task/Task";

export interface TaskFacadeI {
  registerTask(task: Task): Promise<Either<string, void>>
  kanban(): Promise<Either<string, Task[]>>
}

export class TaskFacade implements TaskFacadeI{
  async registerTask(task: Task): Promise<Either<string, void>> {
    try {
      const { id, status, ...data } = task.toPrimitives()
      console.log(data)
      await api.post('/tasks/new', data)
      return Right.create(undefined)
    } catch (error) {
      const axiosError: AxiosError = error as AxiosError
      const data = axiosError.response?.data as { message: string }
      return Left.create(data.message)
    }
  }

  async kanban(): Promise<Either<string, Task[]>> {
    try {
      const { data } = await api.get('/tasks/kanban')
      const tasks: Task[] = data.map((task: { id: string; name: string; description: string; userAssignedId: string; userAssignedName: string; userAssignedPicture: string; status: { name: string; }; startedDate: string; dueDate: string; }) => 
        Task.fromPrimitives(
        task.id,
        task.name,
        task.description,
        task.userAssignedId,
        task.userAssignedName,
        task.userAssignedPicture,
        task.status.name,
        task.startedDate,
        task.dueDate
      ))
      return Right.create(tasks)
    } catch (error) {
      console.log(error)
      const axiosError: AxiosError = error as AxiosError
      const data = axiosError.response?.data as { message: string }
      return Left.create(data.message)
    }
  }
}
