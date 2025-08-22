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
          <header className="p-6 border-b flex justify-between bg-blue-500 rounded-bl-lg rounded-br-lg items-center">
            <div className="flex items-center gap-2">
              <Link
                href={"/"}
                className="text-2xl font-bold text-white hover:text-blue-400 transition"
              >
                Clinipedia
              </Link>

              <FaUserNurse className="text-3xl text-white" />
            </div>

            <Link
              href={"/create"}
              className="bg-slate-100 grid place-items-center py-2 px-4 rounded-full font-bold shadow-md cursor-pointer whitespace-nowrap"
            >
              Add New Definition
            </Link>
          </header>
          <main className="p-4 text-lg">{children}</main>
        </div>
      </body>
    </html>
  );
}
