import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private readonly getTasksUrl: string = '/api/GetTasks';
  private readonly addTaskUrl: string = '/api/AddTask';
  private readonly deleteTaskUrl: string = '/api/DeleteTask';
  private readonly editTaskUrl: string = '/api/EditTask';

  public readonly tasks$: Observable<Task[]>;
  private readonly _tasks$: ReplaySubject<Task[]> = new ReplaySubject<Task[]>(1);

  constructor(private http: HttpClient) {
    this.tasks$ = this._tasks$.asObservable();
    this.updateTasks();
  }

  public addTask(taskName: string): void {
    this.http.post(this.addTaskUrl, { name: taskName }).pipe(take(1)).subscribe(() => {
      this.updateTasks();
    });
  }

  public deleteTask(taskId: string) {
    this.http.post(this.deleteTaskUrl, { id: taskId }).pipe(take(1)).subscribe(() => {
      this.updateTasks();
    });
  }

  public editTask(taskId: string, taskName: string, taskComplete: boolean) {
    this.http.post(this.editTaskUrl, { id: taskId, name: taskName, complete: taskComplete }).pipe(take(1)).subscribe(() => {
      this.updateTasks();
    });
  }

  private updateTasks(): void {
    this.http.get<Task[]>(this.getTasksUrl).pipe(take(1)).subscribe(tasks => {
      this._tasks$.next(tasks);
    });
  }
}
