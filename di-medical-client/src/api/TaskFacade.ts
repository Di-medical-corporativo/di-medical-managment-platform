import { AxiosError } from "axios";
import { api } from "src/boot/axios";
import { Either, Left, Right } from "src/entities/Either";
import { Task } from "src/entities/task/Task";

export interface TaskFacadeI {
  registerTask(task: Task): Promise<Either<string, void>>
}

export class TaskFacade implements TaskFacadeI{
  async registerTask(task: Task): Promise<Either<string, void>> {
    try {
      const { id, status, ...data } = task.toPrimitives()
      await api.post('/tasks/new', data)
      return Right.create(undefined)
    } catch (error) {
      console.log(error)  
      const axiosError: AxiosError = error as AxiosError
      const data = axiosError.response?.data as { message: string }
      return Left.create(data.message)
    }
  }
}
