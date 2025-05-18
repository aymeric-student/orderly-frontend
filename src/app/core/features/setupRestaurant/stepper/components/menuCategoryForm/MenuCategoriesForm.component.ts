import { NgForOf, NgIf } from "@angular/common";
import { Component, Input, ViewEncapsulation, inject } from "@angular/core";
import {
    type FormArray,
    FormBuilder,
    type FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatDivider } from "@angular/material/divider";
import {
    MatExpansionPanel,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
} from "@angular/material/expansion";
import { MatError, MatFormField, MatLabel, MatPrefix } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatOption, MatSelect } from "@angular/material/select";
import { MatStepperNext, MatStepperPrevious } from "@angular/material/stepper";
import { MatTooltip } from "@angular/material/tooltip";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
    standalone: true,
    selector: "info-menu",
    templateUrl: "./MenuCategoriesForm.component.html",
    styleUrl: "./MenuCategoriesForm.component.scss",
    imports: [
        ReactiveFormsModule,
        NgIf,
        NgForOf,
        MatIcon,
        MatButton,
        MatIconButton,
        MatTooltip,
        MatFormField,
        MatLabel,
        MatInput,
        MatSelect,
        MatOption,
        MatError,
        MatExpansionPanel,
        MatExpansionPanelHeader,
        MatExpansionPanelTitle,
        MatExpansionPanelDescription,
        MatDivider,
        MatPrefix,
        MatCheckbox,
        MatStepperNext,
        TranslatePipe,
        MatStepperPrevious,
    ],
    encapsulation: ViewEncapsulation.None,
})
export class MenuCategoriesFormComponent {
    @Input() itemForm!: FormGroup;

    private readonly fb = inject(FormBuilder);

    get categories(): FormArray {
        return this.itemForm.get("categories") as FormArray;
    }

    createCategory(): FormGroup {
        return this.fb.group({
            name: ["", Validators.required],
            icon: ["restaurant_menu", Validators.required],
            items: this.fb.array([]),
        });
    }

    addCategory(): void {
        const newCategory = this.createCategory();
        this.categories.push(newCategory);
        (newCategory.get("items") as FormArray).push(this.createItem());
    }

    removeCategory(index: number): void {
        this.categories.removeAt(index);
    }

    categoryItems(index: number): FormArray {
        return this.categories.at(index).get("items") as FormArray;
    }

    removeItem(categoryIndex: number, itemIndex: number) {
        const items = this.categoryItems(categoryIndex);
        items.removeAt(itemIndex);
    }

    createItem(): FormGroup {
        return this.fb.group({
            name: ["", Validators.required],
            price: [0, [Validators.required, Validators.min(0)]],
            description: [""],
            ingredients: [[]],
            vegetarian: [false],
            vegan: [false],
            glutenFree: [false],
            spicy: [false],
        });
    }

    addItem(categoryIndex: number) {
        const items = this.categoryItems(categoryIndex);
        items.push(this.createItem());
    }
}
