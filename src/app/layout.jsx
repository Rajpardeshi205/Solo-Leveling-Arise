import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import PageTransitionWrapper from "@/Components/PageTransitionWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Solo Leveling: Arise",
  description: "Solo Leveling: Arise By Raj Pardeshi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased `}>
        <Header />
        <PageTransitionWrapper>{children}</PageTransitionWrapper>
        <Footer />
      </body>
    </html>
  );
}
