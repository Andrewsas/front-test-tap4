import { BaseModel } from './base-model';

export class Language extends BaseModel {
    name: string;
    creator: string;
    site: string;
    type: string;
    year: number;
    image: number;
    version: string;
}
