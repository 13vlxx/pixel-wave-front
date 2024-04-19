import { boolean, number, string } from "yup";

export enum FieldValidationType {
  STRING = "STRING",
  REQUIRED_STRING = "REQUIRED_STRING",
  REQUIRED_DOMAIN_NAME = "REQUIRED_DOMAIN_NAME",
  REQUIRED_STRING_ARRAY = "REQUIRED_STRING_ARRAY",
  REQUIRED_STRING_NUMBER = "REQUIRED_STRING_NUMBER",
  REQUIRED_WEBSITE = "REQUIRED_WEBSITE",
  WEBSITE = "WEBSITE",
  REQUIRED_LAT_LNG = "REQUIRED_LAT_LNG",
  LAT_LNG = "LAT_LNG",
  STRING_ARRAY = "STRING_ARRAY",
  NUMBER = "NUMBER",
  REQUIRED_NUMBER = "REQUIRED_NUMBER",
  REQUIRED_EMAIL = "REQUIRED_EMAIL",
  EMAIL = "EMAIL",
  REQUIRED_PASSWORD = "REQUIRED_PASSWORD",
  CONFIRM_PASSWORD = "CONFIRM_PASSWORD",
  REQUIRED_SIRET = "REQUIRED_SIRET",
  DATE = "DATE",
  REQUIRED_DATE = "REQUIRED_DATE",
  REQUIRED_PHONE = "REQUIRED_PHONE",
  PHONE = "PHONE",
  REQUIRED_FILE = "REQUIRED_FILE",
  REQUIRED_BOOLEAN = "REQUIRED_BOOLEAN",
  BOOLEAN = "BOOLEAN",
  FILE = "FILE",
  REQUIRED_ARRAY = "REQUIRED_ARRAY",
  REQUIRED_SELECT_ITEM = "REQUIRED_SELECT_ITEM",
  ARRAY_OF_CONTACTS = "ARRAY_OF_CONTACTS",
  REQUIRED_DOMAIN = "REQUIRED_DOMAIN",
}

export const fieldsValidation = {
  [FieldValidationType.REQUIRED_BOOLEAN]: boolean().required(),
  [FieldValidationType.STRING]: string(),
  [FieldValidationType.REQUIRED_STRING]: string().nullable().required("Ce champ est requis"),
  [FieldValidationType.REQUIRED_EMAIL]: string().required("Email requis").email("Email invalide"),
  [FieldValidationType.EMAIL]: string().email("errors:field.fieldEmail"),
  [FieldValidationType.NUMBER]: number(),
};

export type FieldErrorType = string | undefined;
