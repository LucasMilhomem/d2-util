import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildViewerComponent } from './build-viewer.component';
import { BuildViewerService } from './build-viewer.service';



@NgModule({
  declarations: [BuildViewerComponent],
  providers: [BuildViewerService],
  imports: [
    CommonModule
  ]
})
export class BuildViewerModule { }
