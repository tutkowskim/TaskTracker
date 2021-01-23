export interface Task {
  name: string;
  complete: boolean;
}

export interface UserTasks {
  id: string;
  tasks: Task[];
}
