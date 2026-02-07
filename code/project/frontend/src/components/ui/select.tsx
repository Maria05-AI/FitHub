import * as React from "react";
import { cn } from "@/lib/utils";

type SelectContextType = {
  value?: string;
  onChange?: (v: string) => void;
  open?: boolean;
  setOpen?: (v: boolean) => void;
};

const SelectContext = React.createContext<SelectContextType>({});

export const Select = ({ value, onValueChange, children, className, ...props }: any) => {
  const [open, setOpen] = React.useState(false);
  return (
    <SelectContext.Provider value={{ value, onChange: onValueChange, open, setOpen }}>
      <div className={cn("relative inline-block", className)} {...props}>
        {children}
      </div>
    </SelectContext.Provider>
  );
};

export const SelectTrigger = ({ children, className, ...props }: any) => {
  const ctx = React.useContext(SelectContext);
  return (
    <button
      type="button"
      onClick={() => ctx.setOpen && ctx.setOpen(!ctx.open)}
      className={cn("inline-flex items-center justify-between w-44 h-9 px-3 rounded-md border bg-background text-sm", className)}
      {...props}
    >
      {children}
    </button>
  );
};

export const SelectValue = ({ placeholder = "Select...", children }: any) => {
  const ctx = React.useContext(SelectContext);
  return <span>{children ?? ctx.value ?? placeholder}</span>;
};

export const SelectContent = ({ children, className, align = "start", ...props }: any) => {
  const ctx = React.useContext(SelectContext);
  if (!ctx.open) return null;
  return (
    <div className={cn("absolute z-50 mt-1 w-44 rounded-md border bg-popover p-1 shadow-lg", className)} {...props}>
      {children}
    </div>
  );
};

export const SelectItem = ({ children, value, className, ...props }: any) => {
  const ctx = React.useContext(SelectContext);
  return (
    <div
      role="option"
      onClick={() => {
        ctx.onChange && ctx.onChange(value);
        ctx.setOpen && ctx.setOpen(false);
      }}
      className={cn("cursor-pointer px-2 py-1 rounded text-sm hover:bg-accent/50", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Select;
