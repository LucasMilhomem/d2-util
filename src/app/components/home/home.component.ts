import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HomeService } from './home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewChecked {

  @ViewChild('logContainer') logContainer!: ElementRef;

  logs: string[] = [
    'App Starting...',
  ];

  constructor(
    private homeService: HomeService,
    private router: Router,
  ){}

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    if (this.logContainer) {
      this.logContainer.nativeElement.scrollTop = this.logContainer.nativeElement.scrollHeight;
    }
  }

  ngOnInit(): void {
    this.homeService.runStartupFlow(this.logs).then(() => {
      this.logs.push('Startup flow completed successfully!');
      this.router.navigate(['/build-assistant']);
    });
  }

}
