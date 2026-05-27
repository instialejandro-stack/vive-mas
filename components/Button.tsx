import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  className?: string;
};

const variants = {
  primary:
    "bg-leaf-600 text-white shadow-sm hover:bg-leaf-700 active:bg-leaf-800 hover:shadow-md",
  secondary:
    "border-2 border-leaf-600/25 bg-white text-leaf-900 hover:border-leaf-500 hover:bg-leaf-50 hover:text-leaf-700",
  ghost: "text-leaf-900 hover:bg-leaf-50 hover:text-leaf-700"
};

const sizes = {
  sm: "min-h-9 px-4 py-2 text-xs gap-1.5",
  md: "min-h-11 px-5 py-2.5 text-sm gap-2",
  lg: "min-h-12 px-7 py-3 text-base gap-2"
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  type = "button",
  className
}: ButtonProps) {
  const classes = cn(
    "focus-ring inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type={type}>
      {children}
    </button>
  );
}
