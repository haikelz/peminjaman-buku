import dynamic from "next/dynamic";
import { tw } from "~lib/helpers";

type HeaderProps = {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (args: boolean) => void;
};

const DarkModeSwitcher = dynamic(
  () => import("./dark-mode-switcher").then((obj) => obj.DarkModeSwitcher),
  { ssr: false },
);
const Searchbar = dynamic(() => import("./searchbar").then((obj) => obj.Searchbar));
const DropdownUser = dynamic(() => import("./dropdown-user").then((obj) => obj.DropdownUser));

export default function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  return (
    <header
      data-cy="header"
      className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none"
    >
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={tw(
                    "relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white",
                    !sidebarOpen && "!w-full delay-300",
                  )}
                ></span>
                <span
                  className={tw(
                    "relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white",
                    !sidebarOpen && "delay-400 !w-full",
                  )}
                ></span>
                <span
                  className={tw(
                    "relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white",
                    !sidebarOpen && "!w-full delay-500",
                  )}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={tw(
                    "absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white",
                    !sidebarOpen && "!h-0 !delay-[0]",
                  )}
                ></span>
                <span
                  className={tw(
                    "delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white",
                    !sidebarOpen && "!h-0 !delay-200",
                  )}
                ></span>
              </span>
            </span>
          </button>
        </div>
        <div>
          <Searchbar />
        </div>
        <div className="flex items-center gap-3 lg:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <DarkModeSwitcher />
          </ul>
          <DropdownUser />
        </div>
      </div>
    </header>
  );
}
