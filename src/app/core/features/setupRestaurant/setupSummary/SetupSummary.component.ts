import { NgForOf, NgIf } from "@angular/common";
import { Component, Input } from "@angular/core";
import type { FormGroup } from "@angular/forms";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { MatDivider } from "@angular/material/divider";
import { MatIcon } from "@angular/material/icon";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
    selector: "setup-restaurant-summary",
    standalone: true,
    imports: [
        MatCard,
        MatCardContent,
        MatCardHeader,
        MatCardTitle,
        MatDivider,
        MatIcon,
        NgForOf,
        NgIf,
        TranslatePipe,
    ],
    templateUrl: "./SetupSummary.component.html",
    styleUrls: ["./SetupSummary.component.scss"],
})
export class SetupSummaryComponent {
    @Input() form!: FormGroup;
    @Input() currentStep!: number;

    get generalInfo() {
        return this.form.get("generalInfo")?.value;
    }

    get categories() {
        return this.form.get("menu")?.get("categories")?.value || [];
    }

    get team() {
        return this.form.get("team")?.get("employees")?.value || [];
    }

    get orderSettings() {
        return this.form.get("settings")?.value;
    }

    getCuisineLabel(code: string): string {
        const cuisineMap: Record<string, string> = {
            french: "Française",
            italian: "Italienne",
            japanese: "Japonaise",
        };
        return cuisineMap[code] ?? code;
    }

    hasAnyInfo(): boolean {
        return (
            (this.currentStep >= 1 && this.generalInfo?.name) ||
            (this.currentStep >= 2 && this.categories?.length > 0) ||
            (this.currentStep >= 3 && this.orderSettings) ||
            (this.currentStep >= 4 && this.team?.length > 0)
        );
    }
}
