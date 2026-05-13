import { WorkspaceProvider } from "@/components/WorkspaceProvider";
import { WorkspaceSidebar } from "@/components/WorkspaceSidebar";

export default function WorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  // params is a Promise in Next.js 15 — unwrap synchronously via use() in a client component
  // For the layout, pass the id via WorkspaceProvider which handles async
  return (
    <WorkspaceLayoutInner params={params}>
      {children}
    </WorkspaceLayoutInner>
  );
}

async function WorkspaceLayoutInner({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <WorkspaceProvider id={id}>
      <div className="flex flex-1 min-h-0" style={{ height: "calc(100vh - 3.5rem)" }}>
        <WorkspaceSidebar />
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </WorkspaceProvider>
  );
}
