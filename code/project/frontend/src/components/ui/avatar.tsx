import * as React from "react";
import { cn } from "@/lib/utils";

type AvatarProps = React.ImgHTMLAttributes<HTMLDivElement> & { children?: React.ReactNode };

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("inline-flex items-center justify-center overflow-hidden rounded-full", className)} {...props}>
      {children}
    </div>
  );
});
Avatar.displayName = "Avatar";

const AvatarFallback = ({ children, className, ...props }: { children?: React.ReactNode; className?: string }) => (
  <div className={cn("flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium", className)} {...props}>
    {children}
  </div>
);

export { Avatar, AvatarFallback };
