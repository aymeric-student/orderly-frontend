import { AddressDialogComponent } from "@/core/components/address-dialog/AddressForm.component";
import type { Address } from "@/core/models/Menu";
import { NgIf } from "@angular/common";
import { Component, Input, inject } from "@angular/core";
import { type FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatOptionModule } from "@angular/material/core";
import { MatDialog } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatStepperModule } from "@angular/material/stepper";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
    selector: "general-info-form",
    standalone: true,
    templateUrl: "./GeneralInfoForm.component.html",
    styleUrl: "./GeneralInfoForm.component.scss",
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
        NgIf,
        TranslatePipe,
        MatChipsModule,
    ],
})
export class GeneralInfoFormComponent {
    address?: Address;
    @Input() formGroup!: FormGroup;

    private readonly dialog = inject(MatDialog);

    formatPhoneNumber(): void {
        const control = this.formGroup.get("phone");
        if (!control) return;

        const raw = control.value?.replace(/\D/g, "").slice(0, 10);
        if (!raw) return;

        const formatted = raw.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
        control.setValue(formatted);
    }

    openAddressDialog(): void {
        this.dialog
            .open(AddressDialogComponent, {
                data: this.address,
            })
            .afterClosed()
            .subscribe((result: Address | undefined) => {
                if (result) {
                    this.address = result;
                    this.formGroup.get("address")?.setValue(result);
                }
            });
    }
}
