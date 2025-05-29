import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildAssistantComponent } from './build-assistant.component';

describe('BuildAssistantComponent', () => {
  let component: BuildAssistantComponent;
  let fixture: ComponentFixture<BuildAssistantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildAssistantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
