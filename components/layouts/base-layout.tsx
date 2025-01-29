import { Analytics } from "@vercel/analytics/next";
import HolyLoader from "holy-loader";

import { ThemeProvider } from "@/lib/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { GridBg } from "@/components/atoms/images";
import { ScrollTop } from "@/components/atoms/scroll";
import { SiteFooter, SiteHeader } from "@/components/organism/site";
import { TailwindIndicator } from "@/components/tailwind";

interface BaseLayoutProps {
  children: React.ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <>
      <HolyLoader color="#ccc" />
      <ThemeProvider attribute="class" defaultTheme="dark">
        <div className="relative flex min-h-screen flex-col bg-background" vaul-drawer-wrapper="">
          <GridBg />
          <SiteHeader />
          <div className="relative flex-1 py-4">{children}</div>
          <SiteFooter />
        </div>
        <TailwindIndicator />
        <ScrollTop />
      </ThemeProvider>
      <Analytics />
      <Toaster />
    </>
  );
}
