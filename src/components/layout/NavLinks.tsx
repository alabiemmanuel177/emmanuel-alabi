"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigation } from "@/lib/site";

type Props = { orientation?: "horizontal" | "vertical"; onNavigate?: () => void };

export function NavLinks({ orientation = "horizontal" }: Props) {
  const pathname = usePathname();

  return (
    <ul
      className={
        orientation === "horizontal"
          ? "flex items-center gap-6"
          : "flex flex-col gap-1 py-3"
      }
    >
      {navigation.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`inline-block text-[0.9375rem] transition-colors ${
                orientation === "vertical" ? "py-1.5" : ""
              } ${
                active
                  ? "text-ink font-medium"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
