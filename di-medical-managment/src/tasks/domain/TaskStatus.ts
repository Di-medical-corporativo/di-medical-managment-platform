import { TaskStatusName } from "./TaskStatusName";

export abstract class TaskStatus {
  constructor(
    private name: TaskStatusName
  ) {}

  public static fromPrimitive(name: string): TaskStatus {
    let status = Backlog.create()
    switch(name) {
      case "Backlog":
        status = Backlog.create()
        break
      case "En curso":
        status = Doing.create()
        break
      case "Hecho":
        status = Done.create()
        break
      case "Destiempo":
        status = Delayed.create()
        break
    }

    return status
  }

  toPrimitives() {
    return {
      name: this.name.value
    }
  }
}

export class Backlog extends TaskStatus {
  constructor() {
    super(new TaskStatusName('Backlog'))
  }

  static create(): TaskStatus {
    return new Backlog()
  }
}

export class Doing extends TaskStatus {
  constructor() {
    super(new TaskStatusName('En curso'))
  }

  static create(): TaskStatus {
    return new Doing()
  }
}

export class Delayed extends TaskStatus {
  constructor() {
    super(new TaskStatusName('Destiempo'))
  }

  static create(): TaskStatus {
    return new Delayed()
  }
 }

export class Done extends TaskStatus {
  constructor() {
    super(new TaskStatusName('Hecho'))
  }

  static create(): TaskStatus {
    return new Done()
  }
}
