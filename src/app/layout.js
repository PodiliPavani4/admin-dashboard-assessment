import "./globals.css";

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard built with Next.js App Router and reusable component architecture.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased font-sans transition-colors">
        {children}
      </body>
    </html>
  );
}