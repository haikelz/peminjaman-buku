import { addDays, format, parse } from "date-fns";

export const TGL_PINJAM = format(new Date(), "yyyy-MM-dd");
export const MAKS_TGL_PENGEMBALIAN = format(
  addDays(parse(format(new Date(), "yyyy-MM-dd"), "yyyy-MM-dd", new Date()), 7),
  "yyyy-MM-dd"
);
