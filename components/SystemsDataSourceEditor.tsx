"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { generateId } from "@/lib/utils";
import type { CustomerSystem, DataSource, SystemType, AccessMethod, DataSensitivity, IntegrationComplexity, DataType, DataFormat, DataQuality, AccessStatus } from "@/lib/types";

// ─── Systems Table ─────────────────────────────────────────────────────────────

function newSystem(): CustomerSystem {
  return {
    id: generateId(),
    name: "",
    type: "other",
    owner: "",
    accessMethod: "api",
    apiAvailable: "unknown",
    authenticationMethod: "",
    dataSensitivity: "medium",
    integrationComplexity: "medium",
    notes: "",
  };
}

const SENSITIVITY_COLOR: Record<DataSensitivity, string> = {
  low: "bg-green-100 text-green-800 border-green-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  high: "bg-orange-100 text-orange-800 border-orange-200",
  regulated: "bg-red-100 text-red-800 border-red-200",
};

const COMPLEXITY_COLOR: Record<IntegrationComplexity, string> = {
  low: "bg-green-100 text-green-800 border-green-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  high: "bg-orange-100 text-orange-800 border-orange-200",
};

type SystemRowProps = {
  system: CustomerSystem;
  onUpdate: (patch: Partial<CustomerSystem>) => void;
  onRemove: () => void;
};

function SystemRow({ system, onUpdate, onRemove }: SystemRowProps) {
  const [open, setOpen] = useState(false);
  const apiFlag = system.apiAvailable === false;

  return (
    <div className={cn("rounded-lg border bg-background", apiFlag && "border-orange-200 bg-orange-50/30", open && "ring-1 ring-primary/20")}>
      <div className="flex items-center gap-3 px-4 py-3">
        {apiFlag && (
          <span className="text-orange-600 text-xs shrink-0" title="No API available">⚠</span>
        )}
        <div className="flex-1 min-w-0">
          {open ? (
            <Input value={system.name} onChange={(e) => onUpdate({ name: e.target.value })} placeholder="System name…" className="h-7 text-sm font-medium" />
          ) : (
            <p className="text-sm font-medium truncate">{system.name || <span className="text-muted-foreground italic">Unnamed system</span>}</p>
          )}
        </div>
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <span className="text-xs text-muted-foreground capitalize">{system.type.replace("_", " ")}</span>
          <Badge variant="outline" className={cn("text-xs", SENSITIVITY_COLOR[system.dataSensitivity])}>
            {system.dataSensitivity}
          </Badge>
          <Badge variant="outline" className={cn("text-xs", COMPLEXITY_COLOR[system.integrationComplexity])}>
            {system.integrationComplexity} complexity
          </Badge>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button type="button" onClick={() => setOpen((o) => !o)} className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded hover:bg-muted transition-colors">
            {open ? "Done" : "Edit"}
          </button>
          <button type="button" onClick={onRemove} className="text-xs text-destructive/70 hover:text-destructive px-2 py-1 rounded hover:bg-destructive/10 transition-colors">×</button>
        </div>
      </div>

      {open && (
        <>
          <Separator />
          <div className="px-4 py-4 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>System Type</Label>
                <Select value={system.type} onValueChange={(v) => onUpdate({ type: v as SystemType })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {(["crm","case_management","document_management","data_warehouse","ticketing","email","chat","core_system","custom","other"] as SystemType[]).map((t) => (
                      <SelectItem key={t} value={t}>{t.replace(/_/g, " ")}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Owner / Team</Label>
                <Input value={system.owner} onChange={(e) => onUpdate({ owner: e.target.value })} placeholder="e.g. IT, Compliance…" />
              </div>
              <div className="space-y-1.5">
                <Label>Access Method</Label>
                <Select value={system.accessMethod} onValueChange={(v) => onUpdate({ accessMethod: v as AccessMethod })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {(["api","database","csv_export","manual_upload","webhook","unknown"] as AccessMethod[]).map((m) => (
                      <SelectItem key={m} value={m}>{m.replace(/_/g, " ")}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>API Available</Label>
                <Select
                  value={String(system.apiAvailable)}
                  onValueChange={(v) => onUpdate({ apiAvailable: v === "unknown" ? "unknown" : v === "true" })}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                    <SelectItem value="unknown">Unknown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Data Sensitivity</Label>
                <Select value={system.dataSensitivity} onValueChange={(v) => onUpdate({ dataSensitivity: v as DataSensitivity })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="regulated">Regulated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Integration Complexity</Label>
                <Select value={system.integrationComplexity} onValueChange={(v) => onUpdate({ integrationComplexity: v as IntegrationComplexity })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label>Authentication Method</Label>
                <Input value={system.authenticationMethod} onChange={(e) => onUpdate({ authenticationMethod: e.target.value })} placeholder="OAuth 2.0, API key, SSO…" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Notes</Label>
              <Textarea rows={2} value={system.notes} onChange={(e) => onUpdate({ notes: e.target.value })} placeholder="Integration caveats, known blockers…" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Data Sources Table ────────────────────────────────────────────────────────

function newDataSource(): DataSource {
  return {
    id: generateId(),
    name: "",
    sourceSystem: "",
    dataType: "other",
    format: "unknown",
    quality: "unknown",
    volumeEstimate: "",
    updateFrequency: "",
    pii: "unknown",
    accessStatus: "unknown",
    openQuestions: [],
  };
}

const ACCESS_STATUS_COLOR: Record<AccessStatus, string> = {
  available: "bg-green-100 text-green-800 border-green-200",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  blocked: "bg-red-100 text-red-800 border-red-200",
  unknown: "bg-muted text-muted-foreground border-muted-foreground/30",
};

const QUALITY_COLOR: Record<DataQuality, string> = {
  good: "bg-green-100 text-green-800 border-green-200",
  mixed: "bg-yellow-100 text-yellow-800 border-yellow-200",
  poor: "bg-red-100 text-red-800 border-red-200",
  unknown: "bg-muted text-muted-foreground border-muted-foreground/30",
};

type DataSourceRowProps = {
  source: DataSource;
  onUpdate: (patch: Partial<DataSource>) => void;
  onRemove: () => void;
};

function DataSourceRow({ source, onUpdate, onRemove }: DataSourceRowProps) {
  const [open, setOpen] = useState(false);
  const blocked = source.accessStatus === "blocked";

  return (
    <div className={cn("rounded-lg border bg-background", blocked && "border-red-200 bg-red-50/30", open && "ring-1 ring-primary/20")}>
      <div className="flex items-center gap-3 px-4 py-3">
        {blocked && <span className="text-red-600 text-xs shrink-0" title="Access blocked">✕</span>}
        <div className="flex-1 min-w-0">
          {open ? (
            <Input value={source.name} onChange={(e) => onUpdate({ name: e.target.value })} placeholder="Data source name…" className="h-7 text-sm font-medium" />
          ) : (
            <p className="text-sm font-medium truncate">{source.name || <span className="text-muted-foreground italic">Unnamed source</span>}</p>
          )}
        </div>
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          {source.sourceSystem && !open && <span className="text-xs text-muted-foreground">{source.sourceSystem}</span>}
          <Badge variant="outline" className={cn("text-xs capitalize", ACCESS_STATUS_COLOR[source.accessStatus])}>
            {source.accessStatus}
          </Badge>
          <Badge variant="outline" className={cn("text-xs capitalize", QUALITY_COLOR[source.quality])}>
            {source.quality} quality
          </Badge>
          {source.pii === true && (
            <Badge variant="outline" className="text-xs bg-purple-100 text-purple-800 border-purple-200">PII</Badge>
          )}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button type="button" onClick={() => setOpen((o) => !o)} className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded hover:bg-muted transition-colors">
            {open ? "Done" : "Edit"}
          </button>
          <button type="button" onClick={onRemove} className="text-xs text-destructive/70 hover:text-destructive px-2 py-1 rounded hover:bg-destructive/10 transition-colors">×</button>
        </div>
      </div>

      {open && (
        <>
          <Separator />
          <div className="px-4 py-4 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Source System</Label>
                <Input value={source.sourceSystem} onChange={(e) => onUpdate({ sourceSystem: e.target.value })} placeholder="e.g. Salesforce CRM…" />
              </div>
              <div className="space-y-1.5">
                <Label>Data Type</Label>
                <Select value={source.dataType} onValueChange={(v) => onUpdate({ dataType: v as DataType })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {(["documents","tickets","customer_records","transactions","contracts","messages","logs","other"] as DataType[]).map((t) => (
                      <SelectItem key={t} value={t}>{t.replace(/_/g, " ")}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Format</Label>
                <Select value={source.format} onValueChange={(v) => onUpdate({ format: v as DataFormat })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {(["pdf","docx","csv","xlsx","json","api","database","mixed","unknown"] as DataFormat[]).map((f) => (
                      <SelectItem key={f} value={f}>{f}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Data Quality</Label>
                <Select value={source.quality} onValueChange={(v) => onUpdate({ quality: v as DataQuality })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                    <SelectItem value="unknown">Unknown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Access Status</Label>
                <Select value={source.accessStatus} onValueChange={(v) => onUpdate({ accessStatus: v as AccessStatus })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                    <SelectItem value="unknown">Unknown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Contains PII</Label>
                <Select
                  value={String(source.pii)}
                  onValueChange={(v) => onUpdate({ pii: v === "unknown" ? "unknown" : v === "true" })}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                    <SelectItem value="unknown">Unknown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Volume Estimate</Label>
                <Input value={source.volumeEstimate} onChange={(e) => onUpdate({ volumeEstimate: e.target.value })} placeholder="e.g. 10k records/month…" />
              </div>
              <div className="space-y-1.5">
                <Label>Update Frequency</Label>
                <Input value={source.updateFrequency} onChange={(e) => onUpdate({ updateFrequency: e.target.value })} placeholder="e.g. real-time, daily…" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label>Open Questions <span className="text-muted-foreground">(comma-separated)</span></Label>
                <Input
                  value={source.openQuestions.join(", ")}
                  onChange={(e) => onUpdate({ openQuestions: e.target.value.split(",").map((v) => v.trim()).filter(Boolean) })}
                  placeholder="Who owns schema changes? Is historical data retained?…"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Combined Editor ────────────────────────────────────────────────────────────

type Props = {
  systems: CustomerSystem[];
  dataSources: DataSource[];
  onSystemsChange: (systems: CustomerSystem[]) => void;
  onDataSourcesChange: (sources: DataSource[]) => void;
};

export function SystemsDataSourceEditor({ systems, dataSources, onSystemsChange, onDataSourcesChange }: Props) {
  const updateSystem = (id: string, patch: Partial<CustomerSystem>) =>
    onSystemsChange(systems.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  const removeSystem = (id: string) => onSystemsChange(systems.filter((s) => s.id !== id));

  const updateSource = (id: string, patch: Partial<DataSource>) =>
    onDataSourcesChange(dataSources.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  const removeSource = (id: string) => onDataSourcesChange(dataSources.filter((s) => s.id !== id));

  return (
    <div className="space-y-10">
      {/* Systems */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Customer Systems</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Systems the AI product must integrate with. Rows flagged ⚠ have no API.</p>
          </div>
          <span className="text-xs text-muted-foreground">{systems.length} system{systems.length !== 1 ? "s" : ""}</span>
        </div>

        {systems.length === 0 && (
          <div className="rounded-lg border border-dashed px-6 py-10 text-center text-sm text-muted-foreground">
            No systems added yet.
          </div>
        )}
        {systems.map((s) => (
          <SystemRow key={s.id} system={s} onUpdate={(p) => updateSystem(s.id, p)} onRemove={() => removeSystem(s.id)} />
        ))}
        <button
          type="button"
          onClick={() => onSystemsChange([...systems, newSystem()])}
          className="w-full rounded-lg border border-dashed px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:border-border hover:bg-muted/30 transition-colors"
        >
          + Add system
        </button>
      </section>

      <Separator />

      {/* Data Sources */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Data Sources</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Datasets the AI model will consume. Rows flagged ✕ have blocked access.</p>
          </div>
          <span className="text-xs text-muted-foreground">{dataSources.length} source{dataSources.length !== 1 ? "s" : ""}</span>
        </div>

        {dataSources.length === 0 && (
          <div className="rounded-lg border border-dashed px-6 py-10 text-center text-sm text-muted-foreground">
            No data sources added yet.
          </div>
        )}
        {dataSources.map((s) => (
          <DataSourceRow key={s.id} source={s} onUpdate={(p) => updateSource(s.id, p)} onRemove={() => removeSource(s.id)} />
        ))}
        <button
          type="button"
          onClick={() => onDataSourcesChange([...dataSources, newDataSource()])}
          className="w-full rounded-lg border border-dashed px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:border-border hover:bg-muted/30 transition-colors"
        >
          + Add data source
        </button>
      </section>
    </div>
  );
}
