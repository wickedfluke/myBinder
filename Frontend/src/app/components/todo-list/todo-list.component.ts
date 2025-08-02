import { Component, Input, OnChanges, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { Todo } from '../../entities/todo.entity';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnChanges {
  @Input() todos: Todo[] = [];
  itemsPerPage = 10;
  currentPage = 1;
  paginatedTodos: Todo[] = [];
  totalPages = 0;
  pagesArray: number[] = [];
  @Output() todoChecked = new EventEmitter<void>();

  ngOnInit() {
    this.currentPage = 1;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['todos']) {
      this.updatePagination();
    }
  }

  updatePagination() {
    if (this.todos.length <= this.itemsPerPage) {
      this.currentPage = 1;
    }
    this.totalPages = Math.ceil(this.todos.length / this.itemsPerPage);
    this.pagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
    if (this.currentPage > this.totalPages) {
    this.currentPage = this.totalPages;
  } 
    this.paginatedTodos = this.todos.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }
  
  onTodoChecked(): void {
    this.todoChecked.emit(); 
  }

}
