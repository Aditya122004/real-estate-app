import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner"
const inter = Plus_Jakarta_Sans({subsets: ['latin'],
  weight: [ '600', '700','800']
})
export const metadata = {
  title: "A&A House Hunt",
  description: "A&A House Hunt offers a curated selection of luxury real estate, from elegant estates to modern penthouses. Experience seamless service, exclusive listings, and refined living—your dream home awaits.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" >
        {/* className={inter.className} */}
      <body className="font-cormorant">
       <Provider>
          <Toaster />
          {children}
        </Provider>
      </body>
    </html>
    </ClerkProvider>
  );
}
