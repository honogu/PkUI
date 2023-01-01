export interface Firm {
    id: string;
    name: string;
    image: any;
    englishDescription: string;
    estonianDescription: string;
    key: string;
}

export interface FirmValidation {
    Name: string;
    Image: string;
    EnglishDescription: string;
    EstonianDescription: string;
    title: string;
}
