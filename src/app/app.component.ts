import { NavbarComponent } from "@/core/layout/navbar/Navbar.component";
import { Component, type OnInit, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "app-root",
    imports: [RouterOutlet, NavbarComponent],
    templateUrl: "./app.component.html",
    standalone: true,
    styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
    title = "app";
    private readonly translate = inject(TranslateService);

    ngOnInit(): void {
        this.translate.setDefaultLang("fr");
        this.translate.use("fr");
    }
}
