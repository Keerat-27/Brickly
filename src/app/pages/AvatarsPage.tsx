import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
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

const statusColors = {
  online: "bg-green-500",
  offline: "bg-gray-400",
  busy: "bg-red-500",
  away: "bg-amber-400",
};

function UserAvatar({
  src,
  name,
  size = "md",
  status,
}: {
  src?: string;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  status?: "online" | "offline" | "busy" | "away";
}) {
  const sizes = {
    xs: "size-6",
    sm: "size-8",
    md: "size-10",
    lg: "size-12",
    xl: "size-16",
  };
  const dotSizes = {
    xs: "w-1.5 h-1.5",
    sm: "w-2 h-2",
    md: "w-2.5 h-2.5",
    lg: "w-3 h-3",
    xl: "w-4 h-4",
  };
  const color = name ? getColor(name) : "bg-muted";

  return (
    <div className="relative inline-block">
      <Avatar className={sizes[size]}>
        {src && <AvatarImage src={src} alt={name} />}
        <AvatarFallback className={`text-white ${!src ? color : ""}`}>
          {name ? (
            <span className="text-xs">{getInitials(name)}</span>
          ) : (
            <User className="w-4 h-4 text-muted-foreground" />
          )}
        </AvatarFallback>
      </Avatar>
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
          <UserAvatar name={u.name} src={u.src} />
        </div>
      ))}
      {extra > 0 && (
        <Avatar className="ring-2 ring-background">
          <AvatarFallback className="bg-muted text-muted-foreground text-sm">
            +{extra}
          </AvatarFallback>
        </Avatar>
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
        code={`import { Avatar, AvatarFallback } from "@/components/ui/avatar";

<Avatar className="size-6">
  <AvatarFallback className="bg-blue-500 text-white text-xs">AJ</AvatarFallback>
</Avatar>
<Avatar className="size-8">
  <AvatarFallback className="bg-purple-500 text-white text-xs">BS</AvatarFallback>
</Avatar>
<Avatar>
  <AvatarFallback className="bg-green-500 text-white">CW</AvatarFallback>
</Avatar>`}
      >
        <UserAvatar name="Alice Johnson" size="xs" />
        <UserAvatar name="Bob Smith" size="sm" />
        <UserAvatar name="Carol White" size="md" />
        <UserAvatar name="Dave Brown" size="lg" />
        <UserAvatar name="Eve Davis" size="xl" />
      </ComponentSection>

      <ComponentSection
        title="Fallback Types"
        description="Show initials or a default icon when no image is provided."
        code={`{/* Icon fallback */}
<Avatar>
  <AvatarFallback className="bg-muted">
    <User className="w-5 h-5 text-muted-foreground" />
  </AvatarFallback>
</Avatar>

{/* Initials fallback */}
<Avatar>
  <AvatarFallback className="bg-blue-500 text-white">AJ</AvatarFallback>
</Avatar>`}
      >
        <UserAvatar size="lg" />
        <UserAvatar name="Alice Johnson" size="lg" />
        <UserAvatar name="Bob Smith" size="lg" />
        <UserAvatar name="Carol White" size="lg" />
        <UserAvatar name="Dave Brown" size="lg" />
      </ComponentSection>

      <ComponentSection
        title="With Status Indicator"
        description="Display online presence with a colored dot."
        code={`<div className="relative inline-block">
  <Avatar>
    <AvatarFallback className="bg-blue-500 text-white">AJ</AvatarFallback>
  </Avatar>
  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 ring-2 ring-background" />
</div>`}
      >
        <UserAvatar name="Alice Johnson" size="lg" status="online" />
        <UserAvatar name="Bob Smith" size="lg" status="offline" />
        <UserAvatar name="Carol White" size="lg" status="busy" />
        <UserAvatar name="Dave Brown" size="lg" status="away" />
      </ComponentSection>

      <ComponentSection
        title="Avatar Group"
        description="Stack overlapping avatars to represent teams or collaborators."
        code={`<div className="flex -space-x-3">
  {users.slice(0, 4).map(u => (
    <div key={u.name} className="ring-2 ring-background rounded-full">
      <Avatar><AvatarFallback>{initials(u.name)}</AvatarFallback></Avatar>
    </div>
  ))}
  {users.length > 4 && (
    <Avatar className="ring-2 ring-background">
      <AvatarFallback className="bg-muted text-muted-foreground">+{extra}</AvatarFallback>
    </Avatar>
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
  <Avatar>
    <AvatarFallback className="bg-blue-500 text-white">AJ</AvatarFallback>
  </Avatar>
  <div>
    <p className="text-sm text-foreground">Alice Johnson</p>
    <p className="text-xs text-muted-foreground">Product Designer</p>
  </div>
</div>`}
      >
        {sampleUsers.slice(0, 3).map((u, i) => (
          <div key={u.name} className="flex items-center gap-3">
            <UserAvatar name={u.name} status={i === 0 ? "online" : i === 1 ? "busy" : "away"} />
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
