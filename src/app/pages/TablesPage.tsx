import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown, MoreHorizontal } from "lucide-react";

type SortDir = "asc" | "desc" | null;

const data = [
  { id: 1, name: "Alice Johnson", role: "Designer", status: "Active", joined: "Jan 2023", salary: "$95,000" },
  { id: 2, name: "Bob Smith", role: "Engineer", status: "Active", joined: "Mar 2022", salary: "$120,000" },
  { id: 3, name: "Carol White", role: "Manager", status: "Away", joined: "Aug 2021", salary: "$135,000" },
  { id: 4, name: "Dave Brown", role: "Engineer", status: "Inactive", joined: "Dec 2023", salary: "$110,000" },
  { id: 5, name: "Eve Davis", role: "Designer", status: "Active", joined: "Feb 2024", salary: "$88,000" },
];

const statusColors: Record<string, string> = {
  Active: "bg-green-100 text-green-800",
  Away: "bg-amber-100 text-amber-800",
  Inactive: "bg-gray-100 text-gray-600",
};

function SortIcon({ col, sortCol, sortDir }: { col: string; sortCol: string; sortDir: SortDir }) {
  if (sortCol !== col) return <ArrowUpDown className="w-3.5 h-3.5 opacity-40" />;
  if (sortDir === "asc") return <ArrowUp className="w-3.5 h-3.5 text-primary" />;
  return <ArrowDown className="w-3.5 h-3.5 text-primary" />;
}

export function TablesPage() {
  const [sortCol, setSortCol] = useState("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleSort = (col: string) => {
    if (sortCol === col) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortCol(col);
      setSortDir("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const av = a[sortCol as keyof typeof a] as string;
    const bv = b[sortCol as keyof typeof b] as string;
    return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
  });

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelectedRows(selectedRows.length === data.length ? [] : data.map((d) => d.id));
  };

  return (
    <div className="space-y-10">
      <PageHeader
        title="Tables"
        description="Data tables with sorting, selection, striped rows, and action menus."
        badge="Component"
      />

      <ComponentSection
        title="Basic Table"
        description="Simple data table with headers and alternating row styles."
        code={`<table className="w-full text-sm">
  <thead>
    <tr className="border-b border-border">
      <th className="text-left py-3 px-4 text-muted-foreground">Name</th>
      <th className="text-left py-3 px-4 text-muted-foreground">Role</th>
      <th className="text-left py-3 px-4 text-muted-foreground">Status</th>
    </tr>
  </thead>
  <tbody>
    {rows.map((row, i) => (
      <tr key={row.id} className={\`border-b border-border \${i % 2 === 0 ? "" : "bg-muted/30"}\`}>
        <td className="py-3 px-4 text-foreground">{row.name}</td>
        <td className="py-3 px-4 text-muted-foreground">{row.role}</td>
        <td className="py-3 px-4">
          <span className={\`px-2 py-0.5 rounded-full text-xs \${statusColors[row.status]}\`}>
            {row.status}
          </span>
        </td>
      </tr>
    ))}
  </tbody>
</table>`}
      >
        <div className="w-full overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left py-3 px-4 text-muted-foreground">Name</th>
                <th className="text-left py-3 px-4 text-muted-foreground">Role</th>
                <th className="text-left py-3 px-4 text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-muted-foreground">Joined</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={row.id} className={`border-b border-border ${i % 2 === 1 ? "bg-muted/20" : ""}`}>
                  <td className="py-3 px-4 text-foreground">{row.name}</td>
                  <td className="py-3 px-4 text-muted-foreground">{row.role}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${statusColors[row.status]}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{row.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Sortable Table"
        description="Click column headers to sort ascending or descending."
        code={`const [sortCol, setSortCol] = useState("name");
const [sortDir, setSortDir] = useState("asc");

const handleSort = (col) => {
  if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
  else { setSortCol(col); setSortDir("asc"); }
};

<th onClick={() => handleSort("name")} className="cursor-pointer select-none">
  <span className="flex items-center gap-1">Name <SortIcon /></span>
</th>`}
      >
        <div className="w-full overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                {["name", "role", "status", "salary"].map((col) => (
                  <th
                    key={col}
                    onClick={() => handleSort(col)}
                    className="text-left py-3 px-4 text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors"
                  >
                    <span className="flex items-center gap-1.5 capitalize">
                      {col}
                      <SortIcon col={col} sortCol={sortCol} sortDir={sortDir} />
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData.map((row) => (
                <tr key={row.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-4 text-foreground">{row.name}</td>
                  <td className="py-3 px-4 text-muted-foreground">{row.role}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${statusColors[row.status]}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{row.salary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Selectable Rows"
        description="Table with checkboxes for bulk selection and actions."
        code={`<tr>
  <td>
    <input type="checkbox" checked={selectedRows.includes(row.id)}
      onChange={() => toggleRow(row.id)} />
  </td>
  ...
</tr>
{selectedRows.length > 0 && (
  <div className="bg-primary text-primary-foreground px-4 py-2 text-sm rounded-lg">
    {selectedRows.length} selected — <button>Delete</button>
  </div>
)}`}
      >
        <div className="w-full space-y-2">
          {selectedRows.length > 0 && (
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm">
              <span>{selectedRows.length} row{selectedRows.length > 1 ? "s" : ""} selected</span>
              <button onClick={() => setSelectedRows([])} className="underline text-xs">Clear</button>
            </div>
          )}
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="w-10 py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === data.length}
                      onChange={toggleAll}
                      className="rounded cursor-pointer"
                    />
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-4 text-muted-foreground">Role</th>
                  <th className="text-left py-3 px-4 text-muted-foreground">Status</th>
                  <th className="w-10 py-3 px-4" />
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr
                    key={row.id}
                    className={`border-b border-border hover:bg-muted/30 transition-colors ${
                      selectedRows.includes(row.id) ? "bg-primary/5" : ""
                    }`}
                  >
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row.id)}
                        onChange={() => toggleRow(row.id)}
                        className="rounded cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-4 text-foreground">{row.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{row.role}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${statusColors[row.status]}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="p-1 rounded hover:bg-accent text-muted-foreground">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ComponentSection>
    </div>
  );
}
