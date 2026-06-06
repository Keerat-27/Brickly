import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Checkbox } from "../components/ui/checkbox";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../components/ui/dropdown-menu";
import { useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown, MoreHorizontal, Edit, Copy, Trash2 } from "lucide-react";

type SortDir = "asc" | "desc" | null;

const data = [
  { id: 1, name: "Alice Johnson", role: "Designer", status: "Active", joined: "Jan 2023", salary: "$95,000" },
  { id: 2, name: "Bob Smith", role: "Engineer", status: "Active", joined: "Mar 2022", salary: "$120,000" },
  { id: 3, name: "Carol White", role: "Manager", status: "Away", joined: "Aug 2021", salary: "$135,000" },
  { id: 4, name: "Dave Brown", role: "Engineer", status: "Inactive", joined: "Dec 2023", salary: "$110,000" },
  { id: 5, name: "Eve Davis", role: "Designer", status: "Active", joined: "Feb 2024", salary: "$88,000" },
];

const StatusBadge = ({ status }: { status: string }) => {
  if (status === "Active") return <Badge className="bg-green-100 text-green-800 border-transparent dark:bg-green-900/30 dark:text-green-400">{status}</Badge>;
  if (status === "Away") return <Badge className="bg-amber-100 text-amber-800 border-transparent dark:bg-amber-900/30 dark:text-amber-400">{status}</Badge>;
  return <Badge variant="secondary">{status}</Badge>;
}

const SortIcon = ({ col, sortCol, sortDir }: { col: string; sortCol: string; sortDir: SortDir }) => {
  if (sortCol !== col) return <ArrowUpDown className="w-3.5 h-3.5 opacity-40" />;
  if (sortDir === "asc") return <ArrowUp className="w-3.5 h-3.5 text-primary" />;
  return <ArrowDown className="w-3.5 h-3.5 text-primary" />;
}

export const TablesPage = () => {
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
        code={`import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Role</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {rows.map((row) => (
      <TableRow key={row.id}>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.role}</TableCell>
        <TableCell><StatusBadge status={row.status} /></TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`}
      >
        <div className="w-full rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, i) => (
                <TableRow key={row.id} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                  <TableCell className="text-foreground">{row.name}</TableCell>
                  <TableCell className="text-muted-foreground">{row.role}</TableCell>
                  <TableCell><StatusBadge status={row.status} /></TableCell>
                  <TableCell className="text-muted-foreground">{row.joined}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Sortable Table"
        description="Click column headers to sort ascending or descending."
        code={`const [sortCol, setSortCol] = useState("name");
const [sortDir, setSortDir] = useState("asc");

<TableHead
  className="cursor-pointer select-none hover:text-foreground"
  onClick={() => handleSort("name")}
>
  <span className="flex items-center gap-1.5">
    Name <SortIcon col="name" sortCol={sortCol} sortDir={sortDir} />
  </span>
</TableHead>`}
      >
        <div className="w-full rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                {["name", "role", "status", "salary"].map((col) => (
                  <TableHead
                    key={col}
                    onClick={() => handleSort(col)}
                    className="cursor-pointer select-none hover:text-foreground transition-colors"
                  >
                    <span className="flex items-center gap-1.5 capitalize">
                      {col}
                      <SortIcon col={col} sortCol={sortCol} sortDir={sortDir} />
                    </span>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="text-foreground">{row.name}</TableCell>
                  <TableCell className="text-muted-foreground">{row.role}</TableCell>
                  <TableCell><StatusBadge status={row.status} /></TableCell>
                  <TableCell className="text-muted-foreground">{row.salary}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Selectable Rows"
        description="Table with checkboxes for bulk selection and actions."
        code={`{selectedRows.length > 0 && (
  <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm">
    {selectedRows.length} rows selected
    <button onClick={() => setSelectedRows([])}>Clear</button>
  </div>
)}
<Table>
  <TableHeader>
    <TableRow>
      <TableHead><Checkbox checked={allSelected} onCheckedChange={toggleAll} /></TableHead>
      ...
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map(row => (
      <TableRow key={row.id} data-state={selectedRows.includes(row.id) ? "selected" : undefined}>
        <TableCell><Checkbox checked={selectedRows.includes(row.id)} onCheckedChange={() => toggleRow(row.id)} /></TableCell>
        ...
      </TableRow>
    ))}
  </TableBody>
</Table>`}
      >
        <div className="w-full space-y-2">
          {selectedRows.length > 0 && (
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm">
              <span>{selectedRows.length} row{selectedRows.length > 1 ? "s" : ""} selected</span>
              <Button variant="link" size="sm" className="h-auto p-0 text-xs text-primary" onClick={() => setSelectedRows([])}>Clear</Button>
            </div>
          )}
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <Checkbox
                      checked={selectedRows.length === data.length}
                      onCheckedChange={toggleAll}
                    />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={selectedRows.includes(row.id) ? "selected" : undefined}
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.includes(row.id)}
                        onCheckedChange={() => toggleRow(row.id)}
                      />
                    </TableCell>
                    <TableCell className="text-foreground">{row.name}</TableCell>
                    <TableCell className="text-muted-foreground">{row.role}</TableCell>
                    <TableCell><StatusBadge status={row.status} /></TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><Edit className="w-3.5 h-3.5" /> Edit</DropdownMenuItem>
                          <DropdownMenuItem><Copy className="w-3.5 h-3.5" /> Copy</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem variant="destructive"><Trash2 className="w-3.5 h-3.5" /> Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </ComponentSection>
    </div>
  );
}
