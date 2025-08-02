import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTodoModalComponent } from './assign-todo-modal.component';

describe('AssignTodoModalComponent', () => {
  let component: AssignTodoModalComponent;
  let fixture: ComponentFixture<AssignTodoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignTodoModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignTodoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
