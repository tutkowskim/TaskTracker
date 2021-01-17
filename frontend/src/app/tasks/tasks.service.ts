import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, retry, take } from 'rxjs/operators';

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
  private readonly tasksSubject$: ReplaySubject<Task[]> = new ReplaySubject<Task[]>(1);

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.tasks$ = this.tasksSubject$.asObservable();
    this.updateTasks();
  }

  public addTask(taskName: string): void {
    this.http.post(this.addTaskUrl, { name: taskName })
    .pipe(take(1))
    .pipe(catchError(() => {
      this.snackBar.open(`Failed to add task ${taskName}`, undefined, { duration: 2000});
      return throwError('Something bad happened; please try again later.');
    }))
    .subscribe(() => {
      this.snackBar.open(`Added task ${taskName}`, undefined, { duration: 2000});
      this.updateTasks();
    });
  }

  public deleteTask(task: Task): void {
    this.http.post(this.deleteTaskUrl, { id: task.id })
    .pipe(take(1))
    .pipe(catchError(() => {
      this.snackBar.open(`Failed to delete task ${task.name}`, undefined, { duration: 2000});
      return throwError('Something bad happened; please try again later.');
    }))
    .subscribe(() => {
      this.snackBar.open(`Deleted task ${task.name}`, undefined, { duration: 2000});
      this.updateTasks();
    });
  }

  public editTask(taskId: string, taskName: string, taskComplete: boolean): void {
    this.http.post(this.editTaskUrl, { id: taskId, name: taskName, complete: taskComplete })
    .pipe(take(1))
    .pipe(catchError(() => {
      this.snackBar.open(`Failed to edit task ${taskName}`, undefined, { duration: 2000});
      return throwError('Something bad happened; please try again later.');
    }))
    .subscribe(() => {
      this.updateTasks();
    });
  }

  private updateTasks(): void {
    this.http.get<Task[]>(this.getTasksUrl)
    .pipe(retry(3), take(1))
    .pipe(catchError(() => {
      this.snackBar.open(`Failed to update tasks`, undefined, { duration: 2000});
      return throwError('Something bad happened; please try again later.');
    }))
    .subscribe(tasks => {
      this.tasksSubject$.next(tasks);
    });
  }
}
