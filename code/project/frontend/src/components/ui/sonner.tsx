import { Toaster as SonnerToaster } from "sonner";

/** Re-export Toaster so `@/components/ui/sonner` works */
export function Toaster() {
  return <SonnerToaster richColors position="top-right" />;
}
