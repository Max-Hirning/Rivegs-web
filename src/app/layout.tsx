import "./globals.css";
import type {Metadata} from "next";
import {theme} from "@/configs/theme";
import {Inter} from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import React, {ReactNode, Suspense} from "react";
import {ThemeProvider} from "@mui/material/styles";
import {ProviderComponent} from "@/components/provider";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";

interface IProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Rivegs",
  description: "Recipes app",
};
const inter = Inter({subsets: ["latin"]});

export default async function RootLayout({children}: Readonly<IProps>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderComponent>
          <Suspense>
            <AppRouterCacheProvider options={{key: "css"}}>
              <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </AppRouterCacheProvider>
          </Suspense>
        </ProviderComponent>
      </body>
    </html>
  );
}
