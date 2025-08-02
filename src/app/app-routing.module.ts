import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyBinderComponent } from './pages/my-binder/my-binder.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/myBinder',
        pathMatch: 'full'
    },
    {
        path: 'myBinder',
        component: MyBinderComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
