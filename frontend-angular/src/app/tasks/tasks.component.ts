import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './task';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  public readonly tasks$: Observable<Task[]>;
  public readonly isLoading$: Observable<boolean>;
  public newTaskValue: string = '';

  constructor(private tasksService: TasksService) {
    this.tasks$ = this.tasksService.tasks$;
    this.isLoading$ =  this.tasksService.loading$;
  }

  public addTask(): void {
    if (this.newTaskValue) {
      this.tasksService.addTask(this.newTaskValue);
      this.newTaskValue = '';
    }
  }

  public deleteTask(event: MouseEvent, task: Task): void {
    event.stopPropagation();
    this.tasksService.deleteTask(task);
  }

  public toggleTaskComplete(task: Task): void {
    this.tasksService.toggleTaskComplete(task);
  }

  public drop(event: CdkDragDrop<string[]>) {
    this.tasksService.rearrangeTasks(event.previousIndex, event.currentIndex);
  }
}
