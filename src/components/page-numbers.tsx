import { SetStateAction } from "jotai";
import { Dispatch } from "react";
import { tw } from "~lib/helpers";

type PageNumbersProps = {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  pageNumbers: number[];
};

export default function PageNumbers({
  currentPage,
  setCurrentPage,
  pageNumbers,
}: PageNumbersProps) {
  return (
    <div className="flex justify-center flex-wrap gap-3 items-center mt-8">
      {pageNumbers.map((page) => (
        <button
          type="button"
          aria-label="per page"
          className={tw(
            "cursor-pointer px-4 py-2 bg-primary text-white font-bold rounded-md duration-200 transition-all",
            currentPage === page ? "bg-meta-1" : ""
          )}
          onClick={() => setCurrentPage(page)}
          key={page}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
