import { InjectionToken } from '@angular/core';

// import translations
import { LANG_EN_NAME, LANG_EN_TRANS } from './lang-en';
import { LANG_PT_NAME, LANG_PT_TRANS } from './lang-pt';
import { LANG_ZH_NAME, LANG_ZH_TRANS } from './lang-zh';


// translation token
export const TRANSLATIONS = new InjectionToken('translations');

export const Languages: { value: string, name: string }[] = [
    { value: 'pt', name: 'Português' },
    { value: 'en', name: 'English' }
];

// all translations
export const Dictionary = {
    [LANG_EN_NAME]: LANG_EN_TRANS,
    [LANG_PT_NAME]: LANG_PT_TRANS,
    [LANG_ZH_NAME]: LANG_ZH_TRANS
};

// providers
export const TRANSLATION_PROVIDERS = [
    { provide: TRANSLATIONS, useValue: Dictionary },
];
