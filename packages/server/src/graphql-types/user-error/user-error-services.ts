import * as validator from "@mono/validator";
import * as R from "ramda";
import { UserError } from "./user-error";

export const handleErrors: HandleErrors = error => {
  if (error.name !== "ValidationError") throw error;

  const validationError = error as validator.ValidationError;

  if (validationError.inner.length > 0) {
    return R.map(R.pick(["path", "message"]), validationError.inner);
  }

  return [R.pick(["path", "message"], validationError)];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HandleErrors = (error: any) => UserError[];
