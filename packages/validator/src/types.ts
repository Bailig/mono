import * as yup from "yup";

export type ValidationError = yup.ValidationError & { name: "ValidationError" };
