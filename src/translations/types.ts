
export type Language = 'en' | 'pt-BR';

export interface Translation {
  en: string;
  'pt-BR': string;
}

export interface Translations {
  [key: string]: Translation;
}
