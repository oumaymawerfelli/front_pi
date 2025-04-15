import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  { path: 'post', component: PostComponent },
  { path: '', redirectTo: 'post', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] // ✅ Important ici, pas dans app.module.ts
})
export class AppRoutingModule {}
