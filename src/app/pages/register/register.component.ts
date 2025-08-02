import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit, OnDestroy {

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    picture: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });

  registrationError = '';

  protected destroyed$ = new Subject<void>();

  constructor(
    protected fb: FormBuilder,
    protected authSrv: AuthService,
    protected router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm.valueChanges
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe(() => {
        this.registrationError = '';
      });
    const forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms).forEach((form: any) => {
      form.addEventListener('submit', (event: any) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  isFieldInvalid(field: string): boolean {
    const control = this.registerForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  async register(form: NgForm) {
    if (form.valid && form.value.password === form.value.confirmPassword) {
      const { firstName, lastName, username, password, picture } = form.value;
      try {
        await this.authSrv.register({ firstName, lastName, username, password, picture }).toPromise();
        alert('Registration successful, confirm to redirect to login page');
        this.router.navigate(['/login']);
      } catch (err) {
        console.log(err);
        this.registrationError = (err as any).error.message;
        if (this.registrationError === undefined)  {
        this.registrationError = (err as any).error;
        }
      }
    } else {
      if (form.value.password !== form.value.confirmPassword) {
        this.registrationError = 'Passwords do not match';
      }
    }
  }
}
