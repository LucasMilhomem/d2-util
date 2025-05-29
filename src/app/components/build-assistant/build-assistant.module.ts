import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildAssistantComponent } from './build-assistant.component';
import { BuildAssistantService } from './build-assistant.service';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BuildAssistantComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [
    BuildAssistantService,
  ],
})
export class BuildAssistantModule { }
