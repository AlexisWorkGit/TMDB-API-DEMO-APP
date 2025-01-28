"use server";

import { cookies } from "next/headers";
import { SettingsIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RegionSelect } from "@/components/composite/region";
import { ThemeToggle } from "@/components/composite/theme";

export const SiteSettings = async () => {
  const cookieStore = await cookies();
  const region = cookieStore.get("region")?.value ?? "US";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0">
          <SettingsIcon className="size-4" />
          <span className="sr-only">Settings</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="space-y-4" align="end">
        <div>
          <h5>Settings</h5>

          <div className="mt-2 space-y-2">
            <Label className="text-xs text-muted-foreground">Region</Label>
            <RegionSelect value={region} />
          </div>

          <div className="mt-4 space-y-2">
            <Label className="text-xs text-muted-foreground">Theme</Label>
            <ThemeToggle />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
