import * as yup from "yup";

export const id = yup
  .string()
  .matches(
    /^[\da-f]{8}-[\da-f]{4}-[0-5][\da-f]{3}-[089ab][\da-f]{3}-[\da-f]{12}$/i,
    "id must be UUID",
  )
  .required();
