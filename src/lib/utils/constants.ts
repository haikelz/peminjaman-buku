import { addDays, format, parse } from "date-fns";
import id from "date-fns/locale/id";

export const TGL_PINJAM = format(new Date(), "dd MMMM yyyy", { locale: id });
export const MAKS_TGL_PENGEMBALIAN = format(
  addDays(parse(format(new Date(), "yyyy-MM-dd"), "yyyy-MM-dd", new Date()), 7),
  "dd MMMM yyyy",
  { locale: id }
);
