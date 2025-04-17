import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResearchListComponent } from './research-list/research-list.component';
import { AddResearchComponent } from './add-research/add-research.component';
import { EditResearchComponent } from './edit-research/edit-research.component';
import { ResearchRoutingModule } from './research-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResearchDetailsComponent } from './research-details/research-details.component';

@NgModule({
  declarations: [
    ResearchListComponent,
    AddResearchComponent,
    EditResearchComponent,
    ResearchDetailsComponent,
  ],
  imports: [
    CommonModule,
    ResearchRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ResearchModule {}
