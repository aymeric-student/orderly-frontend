import { NgIf } from "@angular/common";
import { Component, Input } from "@angular/core";
import { type FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatCheckbox } from "@angular/material/checkbox";
import {
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
} from "@angular/material/expansion";
import { MatIcon } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSlideToggle } from "@angular/material/slide-toggle";
import { MatStepperNext, MatStepperPrevious } from "@angular/material/stepper";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
    standalone: true,
    selector: "order-settings-form",
    imports: [
        ReactiveFormsModule,
        MatSlideToggle,
        MatInputModule,
        MatIcon,
        MatButton,
        MatStepperNext,
        TranslatePipe,
        MatExpansionPanel,
        MatExpansionPanelTitle,
        MatExpansionPanelHeader,
        MatCheckbox,
        NgIf,
        MatStepperPrevious,
    ],
    templateUrl: "./OrderSettingsForm.component.html",
    styleUrl: "./OrderSettingsForm.component.scss",
})
export class OrderSettingsFormComponent {
    @Input() formGroup!: FormGroup;
}
