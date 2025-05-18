import { minSelectedDays } from '@/core/features/setupRestaurant/stepper/validators/minSelectedDays.validator';
import { NgForOf, NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import {
  type FormArray,
  FormBuilder,
  type FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatStepperNext, MatStepperPrevious } from '@angular/material/stepper';
import { TranslatePipe } from '@ngx-translate/core';
import { format } from 'date-fns';

@Component({
  selector: 'team-form',
  standalone: true,
  imports: [
    MatIcon,
    MatButton,
    MatFormField,
    MatInputModule,
    ReactiveFormsModule,
    MatSelect,
    MatLabel,
    MatOption,
    NgForOf,
    MatIconButton,
    MatAccordion,
    MatExpansionModule,
    MatStepperNext,
    MatStepperPrevious,
    TranslatePipe,
    NgIf,
  ],
  templateUrl: './TeamForm.component.html',
  styleUrls: ['./TeamForm.component.scss'],
})
export class TeamFormComponent {
  @Input() teamForm!: FormGroup;
  protected readonly format = format;
  private readonly fb = inject(FormBuilder);

  get employees(): FormArray {
    return this.teamForm.get('employees') as FormArray;
  }

  addEmployee(): void {
    this.employees.push(
      this.fb.group({
        name: [''],
        role: [''],
        photo: [''],
        email: [''],
        phone: [''],
        schedule: [[], minSelectedDays(3)],
      }),
    );
  }

  removeEmployee(index: number): void {
    this.employees.removeAt(index);
  }

  isStepValid(): boolean {
    return this.employees.length > 0 && this.teamForm.valid;
  }
}
