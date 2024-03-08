import Headers from "./component/header/Headers";
import "./globals.css";
import { Inter } from "next/font/google";
import ReduxProvider from "./store/ReduxProvider";
import Footer from "./component/ui/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Shop",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Headers />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
