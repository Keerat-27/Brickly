import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { User } from "lucide-react";

const COLORS = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-green-500",
  "bg-amber-500",
  "bg-pink-500",
  "bg-red-500",
  "bg-indigo-500",
];

function getColor(name: string) {
  const idx = name.charCodeAt(0) % COLORS.length;
  return COLORS[idx];
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function Avatar({
  src,
  name,
  size = "md",
  status,
  fallback,
}: {
  src?: string;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  status?: "online" | "offline" | "busy" | "away";
  fallback?: "icon" | "initials";
}) {
  const sizes = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-lg",
  };

  const dotSizes = {
    xs: "w-1.5 h-1.5",
    sm: "w-2 h-2",
    md: "w-2.5 h-2.5",
    lg: "w-3 h-3",
    xl: "w-4 h-4",
  };

  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    busy: "bg-red-500",
    away: "bg-amber-400",
  };

  const color = name ? getColor(name) : "bg-muted";

  return (
    <div className="relative inline-block">
      <div
        className={`${sizes[size]} rounded-full overflow-hidden flex items-center justify-center text-white ${!src ? color : ""}`}
      >
        {src ? (
          <img src={src} alt={name} className="w-full h-full object-cover" />
        ) : fallback === "initials" && name ? (
          <span>{getInitials(name)}</span>
        ) : (
          <User className={`${size === "xs" ? "w-3 h-3" : size === "sm" ? "w-4 h-4" : "w-5 h-5"} text-muted-foreground`} />
        )}
      </div>
      {status && (
        <span
          className={`absolute bottom-0 right-0 ${dotSizes[size]} rounded-full ${statusColors[status]} ring-2 ring-background`}
        />
      )}
    </div>
  );
}

function AvatarGroup({
  users,
  max = 4,
}: {
  users: { name: string; src?: string }[];
  max?: number;
}) {
  const shown = users.slice(0, max);
  const extra = users.length - max;

  return (
    <div className="flex -space-x-3">
      {shown.map((u) => (
        <div key={u.name} className="ring-2 ring-background rounded-full">
          <Avatar name={u.name} src={u.src} fallback="initials" />
        </div>
      ))}
      {extra > 0 && (
        <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground text-sm flex items-center justify-center ring-2 ring-background">
          +{extra}
        </div>
      )}
    </div>
  );
}

const sampleUsers = [
  { name: "Alice Johnson" },
  { name: "Bob Smith" },
  { name: "Carol White" },
  { name: "Dave Brown" },
  { name: "Eve Davis" },
  { name: "Frank Miller" },
];

export function AvatarsPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Avatars"
        description="Visual representations of users with initials, images, status indicators, and groups."
        badge="Component"
      />

      <ComponentSection
        title="Sizes"
        description="Five sizes to match different UI contexts."
        code={`<div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">AJ</div>
<div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">BS</div>
<div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white text-sm">CW</div>
<div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-white text-base">DB</div>
<div className="w-16 h-16 rounded-full bg-pink-500 flex items-center justify-center text-white text-lg">ED</div>`}
      >
        <Avatar name="Alice Johnson" size="xs" fallback="initials" />
        <Avatar name="Bob Smith" size="sm" fallback="initials" />
        <Avatar name="Carol White" size="md" fallback="initials" />
        <Avatar name="Dave Brown" size="lg" fallback="initials" />
        <Avatar name="Eve Davis" size="xl" fallback="initials" />
      </ComponentSection>

      <ComponentSection
        title="Fallback Types"
        description="Show initials or a default icon when no image is provided."
        code={`{/* Icon fallback */}
<div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
  <User className="w-5 h-5 text-muted-foreground" />
</div>
{/* Initials fallback */}
<div className="w-10 h-10 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center">
  AJ
</div>`}
      >
        <Avatar size="lg" />
        <Avatar name="Alice Johnson" size="lg" fallback="initials" />
        <Avatar name="Bob Smith" size="lg" fallback="initials" />
        <Avatar name="Carol White" size="lg" fallback="initials" />
        <Avatar name="Dave Brown" size="lg" fallback="initials" />
      </ComponentSection>

      <ComponentSection
        title="With Status Indicator"
        description="Display online presence with a colored dot."
        code={`<div className="relative inline-block">
  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm">AJ</div>
  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 ring-2 ring-background" />
</div>`}
      >
        <Avatar name="Alice Johnson" fallback="initials" size="lg" status="online" />
        <Avatar name="Bob Smith" fallback="initials" size="lg" status="offline" />
        <Avatar name="Carol White" fallback="initials" size="lg" status="busy" />
        <Avatar name="Dave Brown" fallback="initials" size="lg" status="away" />
      </ComponentSection>

      <ComponentSection
        title="Avatar Group"
        description="Stack overlapping avatars to represent teams or collaborators."
        code={`<div className="flex -space-x-3">
  {users.slice(0, 4).map(u => (
    <div key={u.name} className="ring-2 ring-background rounded-full">
      <Avatar name={u.name} fallback="initials" />
    </div>
  ))}
  {users.length > 4 && (
    <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground text-sm flex items-center justify-center ring-2 ring-background">
      +{users.length - 4}
    </div>
  )}
</div>`}
      >
        <AvatarGroup users={sampleUsers} max={4} />
        <AvatarGroup users={sampleUsers} max={3} />
        <AvatarGroup users={sampleUsers.slice(0, 3)} max={3} />
      </ComponentSection>

      <ComponentSection
        title="Avatar with Info"
        description="Combine avatars with name and role for profile cards."
        code={`<div className="flex items-center gap-3">
  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm">AJ</div>
  <div>
    <p className="text-sm text-foreground">Alice Johnson</p>
    <p className="text-xs text-muted-foreground">Product Designer</p>
  </div>
</div>`}
      >
        {sampleUsers.slice(0, 3).map((u, i) => (
          <div key={u.name} className="flex items-center gap-3">
            <Avatar name={u.name} fallback="initials" size="md" status={i === 0 ? "online" : i === 1 ? "busy" : "away"} />
            <div>
              <p className="text-sm text-foreground">{u.name}</p>
              <p className="text-xs text-muted-foreground">
                {i === 0 ? "Product Designer" : i === 1 ? "Engineer" : "Marketing"}
              </p>
            </div>
          </div>
        ))}
      </ComponentSection>
    </div>
  );
}
