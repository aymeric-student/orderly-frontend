import { Component, inject } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MatDialogRef } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
    selector: "restaurant-confirmation-dialog",
    standalone: true,
    imports: [MatIcon, MatButton, TranslatePipe],
    templateUrl: "./RestaurantConfirmationDialog.component.html",
    styleUrls: ["./RestaurantConfirmationDialog.component.scss"],
})
export class RestaurantConfirmationDialogComponent {
    public readonly dialogRef = inject(MatDialogRef<RestaurantConfirmationDialogComponent>);
}
