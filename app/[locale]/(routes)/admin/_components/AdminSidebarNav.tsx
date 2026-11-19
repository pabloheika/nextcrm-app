"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Key, Users, Settings, SlidersHorizontal, ClipboardList, Coins, FileText, CalendarClock, Puzzle, Tags, ShoppingCart } from "lucide-react";

const navItems = [
  { key: "llmKeys",          href: "/admin/llm-keys",          icon: Key },
  { key: "users",            href: "/admin/users",             icon: Users },
  { key: "services",         href: "/admin/services",          icon: Settings },
  { key: "crmSettings",      href: "/admin/crm-settings",      icon: SlidersHorizontal },
  { key: "funnelSettings",   href: "/admin/funnel-settings",   icon: SlidersHorizontal },
  { key: "calendarSettings", href: "/admin/calendar-settings", icon: CalendarClock },
  { key: "auditLog",         href: "/admin/audit-log",         icon: ClipboardList },
  { key: "currencies",       href: "/admin/currencies",        icon: Coins },
  { key: "pricing",          href: "/admin/pricing",           icon: Tags },
  { key: "orders",           href: "/admin/orders",            icon: ShoppingCart },
  { key: "invoices",         href: "/admin/invoices",          icon: FileText },
  { key: "plugins",          href: "/admin/plugins",           icon: Puzzle },
] as const;

export function AdminSidebarNav() {
  const pathname = usePathname();
  const t = useTranslations("AdminPage.nav");

  return (
    <nav className="flex flex-col gap-1">
      <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        {t("title")}
      </p>
      {navItems.map(({ key, href, icon: Icon }) => {
        const isActive = pathname.includes(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {t(key)}
          </Link>
        );
      })}
    </nav>
  );
}
