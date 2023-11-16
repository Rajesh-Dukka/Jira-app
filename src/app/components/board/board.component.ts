import { Component, OnInit } from '@angular/core';
import { TicketsService } from 'src/app/services/tickets.service';
import { NgZone } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
export class Column {
  constructor(public name: string, public tasks: any[]) {}
}
export class Board {
  constructor(public name: string, public columns: Column[]) {}
}
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  todo: any[] = [];
  Progress: any[] = [];
  done: any[] = [];
  ticketsArray: any[] = [];
  statusList: string[] = ['To Do', 'In Progress', 'Done'];
  doneList: any[] = [];
  todoList: any[] = [];
  inProgressList: any[] = [];
  todos = new Array();
  inprogresses = new Array();
  dones = new Array();
  currentItem: any;
  constructor(
    private ticketService: TicketsService,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  getTasksByStatus(status: string): any[] {
    switch (status) {
      case 'To Do':
        return this.todo;
      case 'In Progress':
        return this.Progress;
      case 'Done':
        return this.done;
      default:
        return [];
    }
  }

  // deleteTicket(ticket: any) {
  //   if (this.todo.includes(ticket)) {
  //     this.todo = this.todo.filter((item) => item !== ticket);
  //   } else if (this.Progress.includes(ticket)) {
  //     this.Progress = this.Progress.filter((item) => item !== ticket);
  //   } else if (this.done.includes(ticket)) {
  //     this.done = this.done.filter((item) => item !== ticket);
  //   }
  // }
  ngOnInit() {
    this.ticketService.projectTicketsArray$.subscribe((tickets) => {
      this.ticketsArray = tickets;

      this.doneList = tickets.filter((m) => m.status === 'Done');
      console.log('doneList', this.doneList);
      this.done = this.doneList;

      this.todoList = tickets.filter((m) => m.status === 'To Do');
      console.log('todoList', this.todoList);
      this.todo = this.todoList;

      this.inProgressList = tickets.filter((m) => m.status === 'In Progress');
      console.log('inProgressList', this.inProgressList);
      this.Progress = this.inProgressList;
      console.log('ngOnInit', this.ticketsArray);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
