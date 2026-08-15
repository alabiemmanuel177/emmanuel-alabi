type IconProps = { className?: string };

const base = "h-[18px] w-[18px]";

export function GitHubIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
      className={`${base} ${className}`}
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

export function LinkedInIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
      className={`${base} ${className}`}
    >
      <path d="M3.6 1.6a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2ZM2.2 6.1h2.8V15H2.2V6.1Zm4.6 0h2.7v1.2h.04c.38-.7 1.3-1.44 2.68-1.44 2.86 0 3.39 1.83 3.39 4.2V15h-2.83v-4.4c0-1.05-.02-2.4-1.5-2.4-1.5 0-1.73 1.14-1.73 2.32V15H6.8V6.1Z" />
    </svg>
  );
}

export function ArrowIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-[14px] w-[14px] ${className}`}
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function ExternalIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-[12px] w-[12px] ${className}`}
    >
      <path d="M6 3H3.5A1.5 1.5 0 0 0 2 4.5v8A1.5 1.5 0 0 0 3.5 14h8a1.5 1.5 0 0 0 1.5-1.5V10M9.5 2H14v4.5M14 2 7.5 8.5" />
    </svg>
  );
}

export function DownloadIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-[14px] w-[14px] ${className}`}
    >
      <path d="M8 2v8m0 0L5 7m3 3 3-3M2.5 12.5h11" />
    </svg>
  );
}
