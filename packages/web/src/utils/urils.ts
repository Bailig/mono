import * as R from "ramda";

export const findIndexById: FindIndexById = (id, items) =>
  R.findIndex(R.propEq("id", id), items);

type FindIndexById = (id: string, items: { id: string }[]) => number;
