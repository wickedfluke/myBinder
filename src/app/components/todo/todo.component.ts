import { AuthService } from '../../services/auth.service';
import { UserService } from './../../services/user.service';
import { User } from '../../entities/user.entity';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../entities/todo.entity';
import { TodoService } from '../../services/todo.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssignTodoModalComponent } from '../assign-todo-modal/assign-todo-modal.component';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  @Input() todo!: Todo;
  @Output() todoUpdated = new EventEmitter<void>();
  @Output() todoChecked = new EventEmitter<void>();
  userList: any[] = [];
  users: User[] = [];
  showUserListFlag: boolean = false;
  selectedUserId: string = ''
  currentUser: any
  formSubmittedSuccessfully: boolean = false;

  constructor(private todoService: TodoService, private userService: UserService, private modalService: NgbModal, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => this.currentUser = user)
    this.userService.getUsers().subscribe(users => {
      this.users = users
  })
}

  toggleCompletion(): void {

    if (!this.todo || !this.todo.id) {
      console.error('Todo ID not defined');
      return;
    }
    if (this.todo.completed) {
      this.markAsNotChecked();
    } else {
      this.markAsChecked();
    }
  }

  markAsChecked(): void {
    if (!this.todo || !this.todo.id) {
      console.error('Todo ID not defined');
      return;
    }
    this.todoService.markAsChecked(this.todo.id).subscribe(
      (updatedTodo: Todo) => {
        this.todo.completed = true;
        this.todoChecked.emit();
      },
      (error) => {
        console.error('Error during the operation:', error);
      }
    );
  }

  markAsNotChecked(): void {
    if (!this.todo || !this.todo.id) {
      console.error('Todo ID not defined');
      return;
    }
    this.todoService.markAsNotChecked(this.todo.id).subscribe(
      (updatedTodo: Todo) => {
        this.todo.completed = false;
      },
      (error) => {
        console.error('Error during the operation:', error);
      }
    );
  }

  openAssignTodoModal(): void {
    const modalRef = this.modalService.open(AssignTodoModalComponent, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.componentInstance.todo = this.todo;
    modalRef.componentInstance.users = this.users;

    modalRef.result.then((result) => {
      console.log(`Modal closed with result: ${result}`);
      this.todoUpdated.emit();
    }, (reason) => {
      console.log(`Modal dismissed with reason: ${reason}`);
    });
  }


  isTodoCreatedByCurrentUser(): boolean {
    return this.currentUser && this.todo.createdBy && this.todo.createdBy.id === this.currentUser.id;
  }
}