import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-slate-800 text-slate-100`}>
        {children}
      </body>
    </html>
  );
}
