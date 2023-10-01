import { ReactNode } from "react";

type TableProps = {
  tableHead: ReactNode;
  tableData: ReactNode;
};

export default function Table({ tableHead, tableData }: TableProps) {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>{tableHead}</thead>
          <tbody>{tableData}</tbody>
        </table>
      </div>
    </div>
  );
}
