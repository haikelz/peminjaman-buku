import { tw } from "~lib/helpers";

type PageNumbersProps = {
  currentPage: number;
  setCurrentPage: any;
  pageNumbers: number[];
};

export default function PageNumbers({
  currentPage,
  setCurrentPage,
  pageNumbers,
}: PageNumbersProps) {
  return (
    <div className="flex justify-center items-center mt-8 space-x-4">
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
