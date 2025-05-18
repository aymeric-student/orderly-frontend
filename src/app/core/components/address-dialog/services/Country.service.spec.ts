import type { RestCountry } from "@/core/components/address-dialog/models/Country.model";
import { CountryService } from "@/core/components/address-dialog/services/CountryFlag.service";
import { environmentDevelopment } from "@/environments/environment.development";
import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

describe("CountryService", () => {
    let service: CountryService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CountryService, provideHttpClient(), provideHttpClientTesting()],
        });

        service = TestBed.inject(CountryService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should call API and return mapped country flags", (done) => {
        const mockResponse: RestCountry[] = [
            {
                name: {
                    common: "France",
                },
                cca2: "FR",
                flags: {
                    emoji: "🇫",
                    png: "https://flagcdn.com/w320/fr.png",
                    svg: "https://flagcdn.com/fr.svg",
                },
            },
            {
                name: {
                    common: "Germany",
                },
                cca2: "DE",
                flags: {
                    emoji: "🇩",
                    png: "https://flagcdn.com/w320/de.png",
                    svg: "https://flagcdn.com/de.svg",
                },
            },
        ];

        service.getCountries().subscribe((countries) => {
            expect(countries.length).toBe(2);
            expect(countries[0]).toEqual({
                name: "France",
                code: "FR",
                flag: "🇫",
            });
            expect(countries[1]).toEqual({
                name: "Germany",
                code: "DE",
                flag: "🇩",
            });
            done();
        });

        const req = httpMock.expectOne(environmentDevelopment.countryRestApiUrl);
        expect(req.request.method).toBe("GET");

        req.flush(mockResponse);
    });
});
