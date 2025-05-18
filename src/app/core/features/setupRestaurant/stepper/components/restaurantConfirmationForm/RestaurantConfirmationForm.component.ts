import { Component, EventEmitter, Input, Output } from '@angular/core';
import { type FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'restaurant-confirmation-form',
  imports: [
    ReactiveFormsModule,
    MatCard,
    MatCardContent,
    MatCheckbox,
    MatDivider,
    MatIcon,
    TranslatePipe,
    MatButton,
  ],
  templateUrl: './RestaurantConfirmationForm.component.html',
  styleUrls: ['./RestaurantConfirmationForm.component.scss'],
})
export class RestaurantConfirmationFormComponent {
  @Input() confirmationForm!: FormGroup;
  @Output() finish = new EventEmitter<void>();

  finishSetupRestaurant() {
    if (this.confirmationForm.valid) {
      this.finish.emit();
    } else {
      this.confirmationForm.markAllAsTouched();
    }
  }
}
