export interface CountryFlag {
    name: string;
    code: string;
    flag?: string;
}

export interface RestCountry {
    name: {
        common: string;
    };
    cca2: string;
    flags: {
        png?: string;
        svg?: string;
        emoji?: string;
    };
}
