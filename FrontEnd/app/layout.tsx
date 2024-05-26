
import "./globals.css";
import { Figtree } from "next/font/google";
import Sidebar from "@/components/Sidebar/Sidebar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const font = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify AI",
  description: "AI update Spotify App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Sidebar>
          {children}
        </Sidebar>
        <ToastContainer />
      </body>
    </html>
  );
}
