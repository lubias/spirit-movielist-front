"use client";
import Link from "next/link";
import React from "react";
import { useAtom } from "jotai";
import { watchlistAtom } from "@/states/WatchlistAtom";

function Header() {
  const [watchlist] = useAtom(watchlistAtom);

  return (
    <header className="h-24 flex items-center justify-between px-40 lg_4:px-10 sm_1:px-5 w-full bg-black-06/50 z-50 relative">
      <Link href="/">
        <img src="/Logo.png" className="h-16" alt="Spirit - Movie List" />
      </Link>
      <Link
        href="/watchlist"
        className="flex items-center gap-2 text-sm font-semibold hover:text-green-45 transition"
      >
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 21s-7.5-4.9-10-9.3C.4 8.2 2 4.5 5.6 4c2-.3 3.9.7 5 2.3C11.7 4.7 13.6 3.7 15.6 4c3.6.5 5.2 4.2 3.6 7.7C16.5 16.1 12 21 12 21z" />
        </svg>
        <span className="sm_1:hidden">Minha lista</span>
        {watchlist.length > 0 && (
          <span className="bg-green-45 text-white text-xs font-bold rounded-full min-w-5 h-5 px-1 flex items-center justify-center">
            {watchlist.length}
          </span>
        )}
      </Link>
    </header>
  );
}

export default Header;
