import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatPostComponent } from '../stat-post/stat-post.component';

const routes: Routes = [
  // {path:'statPost',component:StatPostComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
