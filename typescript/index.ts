import { FormikProps } from "formik";

export type Import = {
  attributes: DataPhotos
  html: any
  default: any
}


export interface PostData {
  default: { attributes: any, html: string }
  attributes: {
    templateKey: string;
    title: string;
    Subtitle?: string
    date: Date;
    headerPhoto: string;
    onderwerp: string
    auteur: string;
    tags: string[]
    ["photo's"]: string[]
  }
  html: string
  slug: string
  photos?: any
}

export interface DataPhotos {
  onderschrift: string
  bron: string
  image: string
}

export interface DataPhotosTotal {
  headerData: DataPhotos
  photosData: DataPhotos[]
}


export type SpecificPhotos1 = {
  headerData: DataPhotos;
  photosData: DataPhotos[];
}

export type SpecificPhotos = {
  headerData: string;
  photosData: string[]
}

export type Num = {
  start: number,
  end: number
}

export interface Point {
  name: string
  date: string
}

export interface Point1 {
  [key: string]: {
    headerPhoto: string
    photos: string[]
    date: Date
  }
}

export type FullPost = {
  title: string
  subtitle?: string
  date: Date
  onderwerp: string
  auteur: string
  tags: string[]
  html: string
  photos: SpecificPhotos1
  slug: string
}




export interface PostMeta {
  FileNames: string[];
  amountOfPosts: number;
  postPerSubject: { [key: string]: string[] }
  amountOfPostPerSubject: { [key: string]: number }
  subjectNames: string[]
  postMeta: {
    [key: string]: {
      headerPhoto: string
      photos: string[]
      date: Date
    }
  }
}


type Values = {
  email: "";
  instantie: "";
  message: "";
  name: "";
  subject: "";
};


type SelectOptions = { value: string; label: string };

export interface IFormItems {
  label: string;
  name: string;
  formik: FormikProps<Values>;
  type: string;
  options?: SelectOptions[];
}
