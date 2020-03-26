export type covid =  {
    provinceState: string;
    countryRegion: string;
    lastUpdate: any;
    lat: number;
    long: number;
    confirmed: number;
    recovered: number;
    deaths: number;
    active: number;
    admin2: string;
    fips: string;
    combinedKey: string;
    incidentRate?: any;
    peopleTested?: any;
    iso2: string;
    iso3: string;
}

export type covidArray=Array<covid>