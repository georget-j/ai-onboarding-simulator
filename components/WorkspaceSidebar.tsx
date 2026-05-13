"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useWorkspace } from "@/components/WorkspaceProvider";

const STEPS = [
  { href: "", label: "Overview", icon: "⬡" },
  { href: "/discovery", label: "Discovery", icon: "○" },
  { href: "/workflow", label: "Workflow", icon: "○" },
  { href: "/systems", label: "Systems & Data", icon: "○" },
  { href: "/requirements", label: "Requirements", icon: "○" },
  { href: "/risks", label: "Risk Register", icon: "○" },
  { href: "/pilot", label: "Pilot Plan", icon: "○" },
  { href: "/outputs", label: "Outputs", icon: "○" },
];

export function WorkspaceSidebar() {
  const pathname = usePathname();
  const { project } = useWorkspace();

  const base = project ? `/workspace/${project.id}` : "";

  return (
    <aside className="w-52 shrink-0 border-r border-border bg-muted/20 flex flex-col">
      <div className="px-4 py-4 border-b border-border">
        <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Workspace</p>
        <p className="text-sm font-semibold mt-0.5 truncate">
          {project?.customer.companyName ?? "Loading…"}
        </p>
        {project && (
          <span className="inline-block mt-1 text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground capitalize">
            {project.status}
          </span>
        )}
      </div>

      <nav className="flex-1 px-2 py-3 space-y-0.5">
        {STEPS.map(({ href, label }) => {
          const fullHref = `${base}${href}`;
          const isActive = pathname === fullHref;
          return (
            <Link
              key={fullHref}
              href={fullHref}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                isActive
                  ? "bg-background text-foreground font-medium shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-3 border-t border-border">
        <Link
          href="/scenarios"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          ← All Scenarios
        </Link>
      </div>
    </aside>
  );
}
