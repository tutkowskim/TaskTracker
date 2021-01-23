import { moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, debounceTime, retry, skipWhile, take } from 'rxjs/operators';

import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  public readonly loading$: Observable<boolean>;
  public readonly tasks$: Observable<Task[]>;

  private readonly tasksSubject$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  public readonly loadingSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  private readonly getTasksUrl: string = '/api/GetTasks';
  private readonly setTasksUrl: string = '/api/SetTasks';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.loading$ = this.loadingSubject$.asObservable();
    this.tasks$ = this.tasksSubject$.asObservable();
    this.tasks$.pipe(skipWhile(() => this.loadingSubject$.value), debounceTime(5000)).subscribe((tasks: Task[]) => this.saveTasks(tasks));
    this.fetchTasks();
  }

  public addTask(taskName: string): void {
    const newTasks = [...this.tasksSubject$.value];
    newTasks.push({ name: taskName, complete: false });
    this.tasksSubject$.next(newTasks);
  }

  public deleteTask(task: Task): void {
    const newTasks = this.tasksSubject$.value.filter(t => t !== task);
    this.tasksSubject$.next(newTasks);
  }

  public toggleTaskComplete(task: Task) {
    task.complete = !task.complete;
    this.tasksSubject$.next(this.tasksSubject$.value);
  }

  public rearrangeTasks(previousIndex: number, currentIndex: number) {
    const updatedTasks = [...this.tasksSubject$.value];
    moveItemInArray(updatedTasks, previousIndex, currentIndex);
    this.tasksSubject$.next(updatedTasks);
  }

  private fetchTasks(): void {
    this.loadingSubject$.next(true);
    this.http.get<Task[]>(this.getTasksUrl)
    .pipe(retry(3), take(1))
    .pipe(catchError((error) => {
      console.error(error);
      this.snackBar.open(`Failed to fetch tasks`, undefined, { duration: 2000});
      return throwError('Something bad happened; please try again later.');
    }))
    .subscribe(tasks => {
      this.tasksSubject$.next(tasks);
      this.loadingSubject$.next(false);
    });
  }

  private saveTasks(tasks: Task[]): void {
    this.http.post(this.setTasksUrl, tasks)
    .pipe(take(1))
    .pipe(catchError((error) => {
      console.error(error);
      this.snackBar.open(`Failed to save tasks`, undefined, { duration: 2000});
      return throwError('Something bad happened; please try again later.');
    }))
    .subscribe(() => {
      this.snackBar.open('Saved tasks', undefined, { duration: 2000});
    });
  }
}
