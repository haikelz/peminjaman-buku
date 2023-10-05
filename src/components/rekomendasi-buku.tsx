"use client";

import { atom, useAtom } from "jotai";
import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import { useClickOutside } from "~hooks";
import { randomize, tw } from "~lib/helpers";
import { booksData } from "~lib/utils/data";
import { saveDataToLocalStorage } from "~lib/utils/save-data-to-local-storage";

const isRekomendasiAtom = atom<boolean>(true);

export default function RekomendasiBuku() {
  const [isRekomendasi, setIsRekomendasi] = useAtom(isRekomendasiAtom);

  const rekomendasiRef = useRef<HTMLDivElement>(null);

  function handleClick() {
    setIsRekomendasi(false);
    saveDataToLocalStorage("is-rekomendasi", false);
  }

  const rekomendasiBuku = useMemo(() => randomize(booksData.slice(0, 12)), [booksData]);

  useEffect(() => {
    if (localStorage.getItem("is-rekomendasi")) {
      setIsRekomendasi(JSON.parse(localStorage.getItem("is-rekomendasi") || ""));
    }
  }, [setIsRekomendasi]);

  useClickOutside(setIsRekomendasi, rekomendasiRef);

  return (
    <>
      {isRekomendasi ? (
        <div
          className={tw(
            "w-full min-h-screen max-w-full overflow-hidden fixed",
            "p-4 top-0 left-0 flex justify-center z-99999 items-center bg-black-2/70",
          )}
        >
          <div
            className="bg-gray dark:bg-boxdark-2 p-6 rounded-md max-w-4xl w-full"
            ref={rekomendasiRef}
          >
            <div className="flex justify-between items-center w-full">
              <h1 className="font-bold text-2xl dark:text-white text-black">Rekomendasi buku:</h1>
              <button
                type="button"
                aria-label="close modal"
                onClick={handleClick}
                className="p-1 hover:bg-stroke transition-all dark:hover:bg-boxdark rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex overflow-x-auto my-6 w-full space-x-6">
              {rekomendasiBuku.map((item, index) => (
                <div
                  key={index + 1}
                  className="flex justify-center items-center relative cursor-pointer"
                >
                  <Image
                    className="min-w-full aspect-square sm:w-full h-full sm:min-w-[250px]"
                    src={item.imageLink}
                    width={350}
                    height={350}
                    alt={item.title}
                  />
                  <div
                    className={tw(
                      "absolute text-transparent hover:text-white w-full p-4",
                      "flex justify-center items-center h-full hover:bg-black-2/50 transition-all",
                    )}
                  >
                    <span className="font-bold text-center text-xl">{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
