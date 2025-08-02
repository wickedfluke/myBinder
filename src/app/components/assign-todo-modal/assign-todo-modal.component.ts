import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../entities/user.entity';
import { Todo } from '../../entities/todo.entity';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-assign-todo-modal',
  templateUrl: './assign-todo-modal.component.html',
  styleUrls: ['./assign-todo-modal.component.css']
})
export class AssignTodoModalComponent {
  @Input() todo!: Todo;
  @Input() users: User[] = [];
  selectedUserId: string = '';
  formSubmittedSuccessfully: boolean = false;

  constructor(public modal: NgbActiveModal, private todoService: TodoService) { }

  onSubmit(): void {
    if (!this.selectedUserId) {
      this.formSubmittedSuccessfully = false;
      console.error('User not selected');
      return;
    }

    if (this.selectedUserId === 'none') {
      this.todo.assignedTo = null;
      this.modal.close('Unassigned');
    } else {
      this.todoService.assignTodo(this.todo.id!, this.selectedUserId).subscribe(
        (todo: Todo) => {
          this.todo.assignedTo = this.users.find(u => u.id === this.selectedUserId) || null;
          this.modal.close('Assigned');
        },
        (error) => {
          console.error('Error assigning todo:', error);
        }
      );
    }
  }
}
