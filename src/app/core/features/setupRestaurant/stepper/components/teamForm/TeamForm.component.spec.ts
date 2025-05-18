import { TeamFormComponent } from '@/core/features/setupRestaurant/stepper/components/teamForm/TeamForm.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { i18nProviders } from '@/lib/i18n/i18n.providers';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CdkStepper } from '@angular/cdk/stepper';

describe('TeamFormComponent', () => {
  let component: TeamFormComponent;
  let fixture: ComponentFixture<TeamFormComponent>;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamFormComponent, ReactiveFormsModule],
      providers: [...i18nProviders, { provide: CdkStepper, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamFormComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);

    component.teamForm = fb.group({
      employees: fb.array([
        fb.group({ name: ['John'] }),
        fb.group({ name: ['Jane'] }),
        fb.group({ name: ['Paul'] }),
      ]),
    });
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should remove the employee', () => {
    expect(component.employees.length).toBe(3);

    component.removeEmployee(1);

    expect(component.employees.length).toBe(2);
    expect(component.employees.at(0).get('name')?.value).toBe('John');
    expect(component.employees.at(1).get('name')?.value).toBe('Paul');
  });

  it('should check if step is well valid', () => {
    component.teamForm = fb.group({
      employees: fb.array([
        fb.group({
          name: ['John', []],
          role: ['Chef', []],
          photo: [''],
          email: ['john@example.com', []],
          phone: ['01 23 45 67 89', []],
          schedule: [['Monday', 'Tuesday', 'Wednesday']],
        }),
      ]),
    });

    expect(component.teamForm.valid).toBeTruthy();
    component.isStepValid();
    expect(component.isStepValid()).toBeTruthy();
  });

  it('should return false if no employees', () => {
    component.teamForm = fb.group({
      employees: fb.array([]),
    });

    expect(component.isStepValid()).toBeFalsy();
  });
});
