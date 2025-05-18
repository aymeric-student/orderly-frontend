export interface AddressFeature {
	type: string;
	geometry: {
		type: string;
		coordinates: [number, number];
	};
	properties: {
		label: string;
		score: number;
		housenumber?: string;
		street?: string;
		name: string;
		postcode: string;
		city: string;
		context?: string;
		importance?: number;
		country_code?: string;
	};
}

export interface AddressApiResponse {
	type: string;
	version: string;
	features: AddressFeature[];
}
