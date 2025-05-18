import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

@Component({
    selector: "app-not-found",
    standalone: true,
    imports: [CommonModule, MatButtonModule, RouterLink, TranslateModule],
    templateUrl: "./NotFound.component.html",
    styleUrls: ["./NotFound.component.scss"],
})
export class NotFoundComponent {}
