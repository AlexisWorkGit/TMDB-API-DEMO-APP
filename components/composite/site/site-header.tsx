import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { SearchInput } from "@/components/composite/search";
import { SiteMenu, SiteNav, SiteSettings } from "@/components/composite/site";

export const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-[#c94542]">
      <div className="container flex h-14 items-center space-x-4 sm:justify-between sm:space-x-0">
        <SiteNav />

        <div className="flex flex-1 justify-end gap-2">
          <Suspense fallback={<Skeleton className="h-10 w-60" />}>
            <SearchInput />
          </Suspense>

          <SiteSettings />

          <div className="lg:hidden">
            <SiteMenu />
          </div>
        </div>
      </div>
    </header>
  );
};
