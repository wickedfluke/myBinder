import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../entities/user.entity';
import { Todo } from '../../entities/todo.entity';
import { TodoService } from '../../services/todo.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-todo-modal',
  templateUrl: './add-todo-modal.component.html',
  styleUrls: ['./add-todo-modal.component.css']
})
export class AddTodoModalComponent implements OnInit {
  @Input() users: User[] = [];
  newTodo: Todo = { title: '', dueDate: undefined, completed: false, assignedTo: null };
  formSubmittedSuccessfully: boolean = false;
  currentUser: any;

  constructor(public modal: NgbActiveModal, private todoService: TodoService, private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => this.currentUser = user);
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  onSubmit(): void {
    if (this.newTodo.title) {
      this.formSubmittedSuccessfully = true; 
      this.todoService.addTodo(this.newTodo).subscribe(
        () => {
          this.modal.close('Todo added');
        },
        (error) => {
          console.error('Error during todo posting:', error);
        }
      );
    } else {
      console.error('Todo title is required!');
      this.formSubmittedSuccessfully = false;
    }
  }
}
