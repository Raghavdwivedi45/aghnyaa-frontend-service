import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { sanskrit } from "./fonts";
import "./globals.scss";
import styles from "./layout.module.scss"
import AuthProvider from "@/provider/AuthProvider";
import ToasterProvider from "@/provider/ToasterProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // sanskrit.variable only defines the --font-sanskrit CSS variable; it does NOT set font-family, so the global font (Arial) is unaffected. Opt in per-selector via font-family: var(--font-sanskrit).
  return (
    <html lang="en" className={sanskrit.variable}>
      <body suppressHydrationWarning>
        <AuthProvider>
          <ToasterProvider>
            <Header />
            <div className={styles["header-space-fill-up"]}></div>
            <main className={styles["aghnyaa-main"]}>
              {children}
            </main>
            <Footer />
          </ToasterProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
