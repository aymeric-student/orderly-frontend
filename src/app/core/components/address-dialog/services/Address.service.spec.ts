import type { AddressApiResponse } from "@/core/components/address-dialog/models/Address.model";
import { AddressService } from "@/core/components/address-dialog/services/Address.service";
import { environmentDevelopment } from "@/environments/environment.development";
import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

describe("AddressService", () => {
    let service: AddressService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AddressService, provideHttpClient(), provideHttpClientTesting()],
        });

        service = TestBed.inject(AddressService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should call API and return address features", (done) => {
        const mockResponse: AddressApiResponse = {
            type: "FeatureCollection",
            version: "1.0",
            features: [
                {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [2.3522, 48.8566],
                    },
                    properties: {
                        label: "1 Rue de Paris, 75001 Paris",
                        score: 0.99,
                        name: "1 Rue de Paris",
                        city: "Paris",
                        postcode: "75001",
                        country_code: "fr",
                        context: "75, Paris, Île-de-France",
                    },
                },
            ],
        };

        service.searchAddress("Paris").subscribe((features) => {
            expect(features.length).toBe(1);
            expect(features[0].properties.name).toBe("1 Rue de Paris");
            done();
        });

        const req = httpMock.expectOne(
            (request) =>
                request.url === environmentDevelopment.addressApiUrl &&
                request.params.get("q") === "Paris" &&
                request.params.get("type") === "housenumber" &&
                request.params.get("autocomplete") === "1",
        );

        expect(req.request.method).toBe("GET");

        req.flush(mockResponse);
    });
});
