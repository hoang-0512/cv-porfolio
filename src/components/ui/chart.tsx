import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ChartTooltipProps {
  content?: React.ReactNode;
  children?: React.ReactNode;
}

export function ChartTooltip({
  children,
  content,
  ...props
}: ChartTooltipProps & Omit<React.ComponentProps<typeof Tooltip>, "content">) {
  if (!content) {
    return <>{children}</>;
  }

  return (
    <Tooltip {...props}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  );
}

interface ChartTooltipContentProps {
  active?: boolean;
  payload?: Array<{ value: number; name: string }>;
  label?: string;
  formatter?: (value: number) => string;
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  formatter,
}: ChartTooltipContentProps) {
  const value = payload?.[0]?.value;

  if (!active || typeof value === "undefined") {
    return null;
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid grid-cols-2 gap-2">
        <span className="font-medium">{label}</span>
        <span className="font-mono">
          {formatter ? formatter(value) : value}
        </span>
      </div>
    </div>
  );
}

interface ChartContainerProps {
  children: React.ReactNode;
  config: Record<string, { label: string; color: string }>;
  className?: string;
}

export function ChartContainer({
  children,
  config,
  className,
}: ChartContainerProps) {
  return (
    <div
      className={className}
      style={
        {
          "--color-grade": config.grade?.color,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
