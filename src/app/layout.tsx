import type { Metadata } from "next";
import "./globals.scss";
import { Toaster } from "sonner";


export const metadata: Metadata = {
  title: "Pizzaria - The best!",
  description: "Gerencie seus pedidos aqui!",
  keywords: ["Pizzaria", "Pizzas"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Toaster
          position="top-center"
          toastOptions={{
            style:{
              backgroundColor: "#f1f1f1",
              color: "#131313",
              borderColor: "rgba(255,255,255, 0.5)"
            }
          }}
        />
        {children}
      </body>
    </html>
  );
}
