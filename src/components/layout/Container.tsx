import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** `page` for index/landing widths, `prose` for long-form reading measure. */
  width?: "page" | "prose";
  className?: string;
};

export function Container({ children, width = "page", className = "" }: Props) {
  const max = width === "prose" ? "max-w-measure" : "max-w-page";
  return (
    <div className={`mx-auto w-full ${max} px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}
