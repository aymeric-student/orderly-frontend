import { SetupSummaryComponent } from '@/core/features/setupRestaurant/setupSummary/SetupSummary.component';
import { GeneralInfoFormComponent } from '@/core/features/setupRestaurant/stepper/components/generalInfoForm/GeneralInfoForm.component';
import { MenuCategoriesFormComponent } from '@/core/features/setupRestaurant/stepper/components/menuCategoryForm/MenuCategoriesForm.component';
import { OrderSettingsFormComponent } from '@/core/features/setupRestaurant/stepper/components/orderSettingsForm/OrderSettingsForm.component';
import { RestaurantConfirmationDialogComponent } from '@/core/features/setupRestaurant/stepper/components/restaurantConfirmationDialog/RestaurantConfirmationDialog.component';
import { RestaurantConfirmationFormComponent } from '@/core/features/setupRestaurant/stepper/components/restaurantConfirmationForm/RestaurantConfirmationForm.component';
import { TeamFormComponent } from '@/core/features/setupRestaurant/stepper/components/teamForm/TeamForm.component';
import { minSelectedDays } from '@/core/features/setupRestaurant/stepper/validators/minSelectedDays.validator';
import { validateTimeRange } from '@/core/features/setupRestaurant/stepper/validators/validateTimeRange.validator';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  type FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'setupRestaurant',
  standalone: true,
  templateUrl: './RestaurantSetup.component.html',
  styleUrl: './RestaurantSetup.component.scss',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatStepperModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    SetupSummaryComponent,
    TranslatePipe,
    GeneralInfoFormComponent,
    TeamFormComponent,
    RestaurantConfirmationFormComponent,
    MenuCategoriesFormComponent,
    OrderSettingsFormComponent,
  ],
})
export class RestaurantSetupComponent {
  currentStep = 0;
  private readonly fb = inject(FormBuilder);
  form = this.fb.group({
    generalInfo: this.fb.group({
      name: ['', Validators.required],
      website: ['', Validators.pattern(/^https?:\/\/[\w.-]+(:\d+)?(\/.*)?$/i)],
      phone: ['', [Validators.pattern(/^(\d{2} ?){4}\d{2}$/)]],
      email: ['', Validators.email],
      cuisine: [''],
    }),
    menu: this.fb.group({
      categories: this.fb.array([
        this.fb.group({
          name: ['', Validators.required],
          icon: ['restaurant_menu', Validators.required],
          items: this.fb.array([
            this.fb.group({
              name: ['', Validators.required],
              price: [0, [Validators.required, Validators.min(0)]],
              description: [''],
              ingredients: [[]],
              vegetarian: [false],
              vegan: [false],
              glutenFree: [false],
              spicy: [false],
            }),
          ]),
        }),
      ]),
    }),
    settings: this.fb.group(
      {
        enableOnlineOrdering: [false],
        onSite: [false],
        takeAway: [false],
        delivery: [false],
        minOrderAmount: [0, [Validators.required, Validators.min(0)]],
        openingTime: ['', Validators.required],
        closingTime: ['', Validators.required],
        orderMode: this.fb.control('on_site'),
        prepTime: [15, [Validators.required]],
      },
      {
        validators: [validateTimeRange()],
      },
    ),
    team: this.fb.group({
      employees: this.fb.array([this.createEmployeeGroup()]),
    }),
    confirmation: this.fb.group({
      qualityStandards: [false, Validators.requiredTrue],
      accurateInfo: [false, Validators.requiredTrue],
      termsAndConditions: [false, Validators.requiredTrue],
      notifications: [false],
    }),
  });

  private readonly dialog = inject(MatDialog);

  get generalInfoForm(): FormGroup {
    return this.form.get('generalInfo') as FormGroup;
  }

  get menuForm(): FormGroup {
    return this.form.get('menu') as FormGroup;
  }

  get settingsForm(): FormGroup {
    return this.form.get('settings') as FormGroup;
  }

  get teamForm(): FormGroup {
    return this.form.get('team') as FormGroup;
  }

  get confirmationForm(): FormGroup {
    return this.form.get('confirmation') as FormGroup;
  }

  createEmployeeGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
      photo: [''],
      email: ['', [Validators.email]],
      phone: ['', [Validators.pattern(/^(\d{2} ?){4}\d{2}$/)]],
      schedule: this.fb.control([], minSelectedDays(3)),
    });
  }

  handleFinalSubmit(): void {
    this.dialog
      .open(RestaurantConfirmationDialogComponent, {
        width: '480px',
        disableClose: true,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === true) {
          console.log('Dialog confirmée : redirection vers le menu');
        }
      });
  }
}
