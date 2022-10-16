import { DefinitionObject } from 'urban-dictionary';

// NOAA Space Weather JSON response
export interface SpaceWeatherResponse {
  product_id: string;
  issue_datetime: string;
  message: string;
}

// Fun Translations JSON response
export interface FunTranslationResponse {
  success: {
    total: number;
  }
  contents: {
    translated: string;
    text: string;
    translation: string;
  }
}

// Nutritionix JSON response
export interface NutritionixResponse {
  total_hits: number;
  max_score: number;
  hits: Array<NutritionixHit>;
}

interface NutritionixHit {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  fields: {
    item_name: string;
    brand_name: string;
    nf_calories: number;
    nf_serving_size_qty: number;
    nf_serving_size_unit: string;
  }
}

// Chuck Norris JSON Response
export interface ChuckNorrisResponse {
  categories: Array<string>;
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
}

// Urban Dictionary JSON Response
export interface UrbanDictionaryResponse {
  list: Array<DefinitionObject>;
}

// XKCD JSON Response
export interface XKCDJSONResponse {
  month: string;
  num: number;
  link: string;
  year: string;
  news: string;
  safe_title: string;
  transcript: string;
  alt: string;
  img: string;
  title: string;
  day: string;
}

// Random Dog JSON Response
export interface RandomDogJSONResponse {
  fileSizeBytes: string;
  url: string;
}

// Random Cat JSON Response
export interface RandomCatJSONResponse {
  file: string;
}

// Random Fox JSON Response
export interface RandomFoxJSONResponse {
  image: string;
  link: string;
}
