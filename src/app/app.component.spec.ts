import { TestBed } from '@angular/core/testing';
import { AppComponent } from '@/app.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { provideRouter } from '@angular/router';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppComponent, TranslateModule.forRoot()],
            providers: [provideRouter([])],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should set default language to "fr"', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const translate = TestBed.inject(TranslateService);
        fixture.detectChanges();
        expect(translate.getDefaultLang()).toBe('fr');
        expect(translate.currentLang).toBe('fr');
    });
});
