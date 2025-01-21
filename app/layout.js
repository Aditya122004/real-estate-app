import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner"
const inter = Plus_Jakarta_Sans({subsets: ['latin'],
  weight: ['400', '500', '600', '700','800']
})
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en" >
      <body className={inter.className}>
       <Provider>
          <Toaster />
          {children}
        </Provider>
      </body>
    </html>
    </ClerkProvider>
  );
}
