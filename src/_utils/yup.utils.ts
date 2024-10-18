import { boolean, number, string } from "yup";

export enum FieldValidationType {
  STRING = "STRING",
  REQUIRED_STRING = "REQUIRED_STRING",
  REQUIRED_STAFF_REQUEST = "REQUIRED_STAFF_REQUEST",
  REQUIRED_POST_CONTENT = "REQUIRED_POST_CONTENT",
  REQUIRED_DOMAIN_NAME = "REQUIRED_DOMAIN_NAME",
  REQUIRED_STRING_ARRAY = "REQUIRED_STRING_ARRAY",
  REQUIRED_STRING_NUMBER = "REQUIRED_STRING_NUMBER",
  REQUIRED_WEBSITE = "REQUIRED_WEBSITE",
  WEBSITE = "WEBSITE",
  REQUIRED_FILE = "REQUIRED_FILE",
  FILE = "FILE",
  REQUIRED_LAT_LNG = "REQUIRED_LAT_LNG",
  LAT_LNG = "LAT_LNG",
  STRING_ARRAY = "STRING_ARRAY",
  NUMBER = "NUMBER",
  REQUIRED_NUMBER = "REQUIRED_NUMBER",
  REQUIRED_EMAIL = "REQUIRED_EMAIL",
  EMAIL = "EMAIL",
  REQUIRED_PASSWORD = "REQUIRED_PASSWORD",
  REQUIRED_BOOLEAN = "REQUIRED_BOOLEAN",
  BOOLEAN = "BOOLEAN",
}

const passwordSecurityRegex = /^(?=.*\d)(?=.*[A-Z]).{6,}$/;

export const fieldsValidation = {
  [FieldValidationType.STRING]: string().nullable(),
  [FieldValidationType.REQUIRED_STRING]: string().nullable().required("Ce champ est requis"),
  [FieldValidationType.REQUIRED_STAFF_REQUEST]: string().required("Ce champ est requis").min(20),
  [FieldValidationType.REQUIRED_POST_CONTENT]: string().required("Ce champ est requis").max(255),
  [FieldValidationType.EMAIL]: string().email("errors:field.fieldEmail"),
  [FieldValidationType.REQUIRED_EMAIL]: string().required("Email requis").email("Email invalide"),
  [FieldValidationType.REQUIRED_PASSWORD]: string()
    .required("Mot de passe requis")
    .matches(passwordSecurityRegex, "Le mot de passe doit contenir au moins 6 caractères, une majuscule et un chiffre"),
  [FieldValidationType.NUMBER]: number(),
  [FieldValidationType.REQUIRED_NUMBER]: number().required("Ce champ est requis").min(0).max(5),
  [FieldValidationType.REQUIRED_BOOLEAN]: boolean().required(),
  [FieldValidationType.BOOLEAN]: boolean(),
};

export type FieldErrorType = string | undefined;
