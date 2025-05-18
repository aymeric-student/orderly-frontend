import { RestaurantConfirmationFormComponent } from '@/core/features/setupRestaurant/stepper/components/restaurantConfirmationForm/RestaurantConfirmationForm.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { i18nProviders } from '@/lib/i18n/i18n.providers';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

describe('RestaurantConfirmationFormComponent', () => {
  let component: RestaurantConfirmationFormComponent;
  let fixture: ComponentFixture<RestaurantConfirmationFormComponent>;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantConfirmationFormComponent, ReactiveFormsModule],
      providers: [...i18nProviders],
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantConfirmationFormComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
  });

  it('component should be defined !', () => {
    expect(component).toBeTruthy();
  });

  it('should emit finish when form is valid', () => {
    component.confirmationForm = fb.group({
      agree: [true, Validators.requiredTrue],
    });

    spyOn(component.finish, 'emit');

    component.finishSetupRestaurant();

    expect(component.finish.emit).toHaveBeenCalled();
  });

  it('should mark all as touched when form is invalid', () => {
    component.confirmationForm = fb.group({
      agree: [false, Validators.requiredTrue],
    });

    spyOn(component.confirmationForm, 'markAllAsTouched');
    spyOn(component.finish, 'emit');

    component.finishSetupRestaurant();

    expect(component.confirmationForm.markAllAsTouched).toHaveBeenCalled();
    expect(component.finish.emit).not.toHaveBeenCalled();
  });
});
