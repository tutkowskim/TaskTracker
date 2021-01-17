import { Component } from '@angular/core';
import { Task } from './task';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  public readonly tasks$;

  constructor(private tasksService: TasksService) {
    this.tasks$ = this.tasksService.tasks$;
  }

  public addTask() {
    const fakeTaskName: string = new Date().toLocaleString();
    this.tasksService.addTask(`New Task ${fakeTaskName}`);
  }

  public deleteTask(event: MouseEvent, task: Task) {
    event.stopPropagation();
    this.tasksService.deleteTask(task.id);
  }
}
