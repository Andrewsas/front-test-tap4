import { BaseModel } from './base-model';

export class Framework extends BaseModel {
    'name': string;
    'creator': string;
    'site': string;
    'language': string;
    'id_language': string;
    'type': string;
    'year': number;
    'version': string;
    'against': string;
    'pro': string;
}
