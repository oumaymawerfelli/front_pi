import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './post/post.component';
import { AppComponent } from './app.component';

const routes: Routes = [

  { path: 'post', component: PostComponent }, // Only for Forum

  // { path: '', redirectTo: 'post', pathMatch: 'full' }, */
 
];

@NgModule({

  imports: [RouterModule.forRoot(routes, { useHash: false })], // Disable hash routing

  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] // ✅ Important ici, pas dans app.module.ts 
})
export class AppRoutingModule {}