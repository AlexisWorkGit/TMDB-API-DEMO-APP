"use client";

import Image from "next/image";
import Link from "next/link";
import { navigation, NavItem } from "@/config";
import { useActiveNav, useIsMobile } from "@/hooks";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

// import { Icons } from "@/components/composite/icons";

const SiteNav = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex items-center">
      <Link href="/">
        {isMobile ? (
          <Image src="/popcorn-glyph.png" width={40} height={47} alt="PopCorn" />
        ) : (
          <Image src="/popcorn-logo-horizontal.png" width={175} height={47} alt="PopCorn" />
        )}
      </Link>

      <NavigationMenu className="ml-4 hidden lg:flex">
        <NavigationMenuList>
          {navigation.items
            .filter((item) => item.href !== "/")
            .map((item) =>
              item.items ? (
                <SiteNavItem key={item.title} {...item} />
              ) : (
                <SiteNavItemSingle key={item.title} {...item} />
              )
            )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

const SiteNavItem = ({ title, icon, items, href, description }: NavItem) => {
  const isActive = useActiveNav(href);
  const Icon = icon;

  const menuTriggerClasses = "bg-[#a51210] accent-red-50/[.1]";

  const menuTriggerAccent = "bg-[#910602] accent-red-50/[.2]";

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={cn(isActive && menuTriggerAccent, "gap-2", menuTriggerClasses)}
      >
        <Icon className="size-4" /> {title}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="p-6 pb-0">
          <Icon className="mr-1 inline size-4" /> {title}
          <p className="mt-2 text-sm">{description}</p>
        </div>
        <div className="grid w-[650px] grid-cols-2 p-4">
          {items?.map((item) => <SiteNavListItem key={item.title} {...item} />)}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

const SiteNavItemSingle = ({ title, icon, href }: NavItem) => {
  const isActive = useActiveNav(href);
  const Icon = icon;

  return (
    <NavigationMenuItem>
      <Link legacyBehavior passHref href={href}>
        <NavigationMenuLink
          className={cn(navigationMenuTriggerStyle(), isActive && "bg-accent", "gap-2")}
        >
          <Icon className="size-4" /> {title}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};

const SiteNavListItem = ({ title, icon, description, href }: NavItem) => {
  const Icon = icon;

  return (
    <NavigationMenuLink asChild>
      <Link href={href} className="select-none space-y-2 rounded-md p-3 hover:bg-accent">
        <div className="text-sm font-medium leading-none">
          <Icon className="mr-1 inline size-3" /> {title}
          {title === "Discover" && (
            <Badge className="ml-2 px-1 py-0 text-[9px] leading-normal tracking-wide">NEW</Badge>
          )}
        </div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{description}</p>
      </Link>
    </NavigationMenuLink>
  );
};

export { SiteNav };
