import "./globals.css";
import Link from "next/link";
import { FaUserNurse } from "react-icons/fa";

export const metadata = {
  title: "Crud Tutorial",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="max-w-4xl mx-auto text-slate-800">
          {/* <header className="p-6 border-b flex justify-between bg-blue-500 rounded-bl-lg rounded-br-lg items-center">
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-bold text-white hover:text-blue-200 transition"
            >
              <span>Clinipedia</span>
              <FaUserNurse className="text-3xl" />
            </Link>

            <Link
              href={"/create"}
              className="bg-slate-100 grid place-items-center py-2 px-4 rounded-full font-bold shadow-md cursor-pointer whitespace-nowrap hover:bg-slate-300"
            >
              Add Entry
            </Link>
          </header> */}
           <header className="sticky top-0 z-50 p-6 border-b flex justify-between bg-blue-500 rounded-bl-lg rounded-br-lg items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold text-white hover:text-blue-200 transition"
          >
            <span>Clinipedia</span>
            <FaUserNurse className="text-3xl" />
          </Link>

          <Link
            href={"/create"}
            className="bg-slate-100 grid place-items-center py-2 px-4 rounded-full font-bold shadow-md cursor-pointer whitespace-nowrap hover:bg-slate-300"
          >
            Add Entry
          </Link>
        </header>
          <main className="p-4 text-lg">{children}</main>
        </div>
      </body>
    </html>
  );
}
