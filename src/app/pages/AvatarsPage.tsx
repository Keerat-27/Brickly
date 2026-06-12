import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
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

const getColor = (name: string) => COLORS[name.charCodeAt(0) % COLORS.length];

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const statusColors = {
  online: "bg-green-500",
  offline: "bg-gray-400",
  busy: "bg-red-500",
  away: "bg-amber-400",
};

const sampleUsers = [
  { name: "Alice Johnson" },
  { name: "Bob Smith" },
  { name: "Carol White" },
  { name: "Dave Brown" },
  { name: "Eve Davis" },
  { name: "Frank Miller" },
];

const AvatarWithStatus = ({
  name,
  size = "size-10",
  status,
}: {
  name: string;
  size?: string;
  status?: keyof typeof statusColors;
}) => (
  <div className="relative inline-block">
    <Avatar className={size}>
      <AvatarFallback className={`text-white ${getColor(name)}`}>
        <span className="text-xs">{getInitials(name)}</span>
      </AvatarFallback>
    </Avatar>
    {status && (
      <span
        className={`absolute bottom-0 right-0 size-2.5 rounded-full ${statusColors[status]} ring-2 ring-background`}
      />
    )}
  </div>
);

export const AvatarsPage = () => {
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
        source="shadcn"
        shadcnComponent="avatar"
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
        {[
          { name: "Alice Johnson", size: "size-6" },
          { name: "Bob Smith", size: "size-8" },
          { name: "Carol White", size: "size-10" },
          { name: "Dave Brown", size: "size-12" },
          { name: "Eve Davis", size: "size-16" },
        ].map((user) => (
          <Avatar key={user.name} className={user.size}>
            <AvatarFallback className={`text-white ${getColor(user.name)}`}>
              <span className="text-xs">{getInitials(user.name)}</span>
            </AvatarFallback>
          </Avatar>
        ))}
      </ComponentSection>

      <ComponentSection
        title="Fallback Types"
        description="Show initials or a default icon when no image is provided."
        source="shadcn"
        shadcnComponent="avatar"
        code={`<Avatar>
  <AvatarFallback className="bg-muted">
    <User className="w-5 h-5 text-muted-foreground" />
  </AvatarFallback>
</Avatar>

<Avatar>
  <AvatarFallback className="bg-blue-500 text-white">AJ</AvatarFallback>
</Avatar>`}
      >
        <Avatar className="size-12">
          <AvatarFallback className="bg-muted">
            <User className="w-5 h-5 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
        {sampleUsers.slice(0, 4).map((user) => (
          <Avatar key={user.name} className="size-12">
            <AvatarFallback className={`text-white ${getColor(user.name)}`}>
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
        ))}
      </ComponentSection>

      <ComponentSection
        title="With Status Indicator"
        description="Display online presence with a colored dot."
        source="composition"
        code={`<div className="relative inline-block">
  <Avatar>
    <AvatarFallback className="bg-blue-500 text-white">AJ</AvatarFallback>
  </Avatar>
  <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-green-500 ring-2 ring-background" />
</div>`}
      >
        <AvatarWithStatus name="Alice Johnson" size="size-12" status="online" />
        <AvatarWithStatus name="Bob Smith" size="size-12" status="offline" />
        <AvatarWithStatus name="Carol White" size="size-12" status="busy" />
        <AvatarWithStatus name="Dave Brown" size="size-12" status="away" />
      </ComponentSection>

      <ComponentSection
        title="Avatar Group"
        description="Stack overlapping avatars to represent teams or collaborators."
        source="shadcn"
        shadcnComponent="avatar"
        code={`<div className="flex -space-x-3">
  {users.slice(0, 4).map((user) => (
    <Avatar key={user.name} className="ring-2 ring-background">
      <AvatarFallback className="bg-blue-500 text-white">{initials(user.name)}</AvatarFallback>
    </Avatar>
  ))}
  <Avatar className="ring-2 ring-background">
    <AvatarFallback className="bg-muted text-muted-foreground">+2</AvatarFallback>
  </Avatar>
</div>`}
      >
        <div className="flex -space-x-3">
          {sampleUsers.slice(0, 4).map((user) => (
            <Avatar key={user.name} className="ring-2 ring-background">
              <AvatarFallback className={`text-white ${getColor(user.name)}`}>
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
          ))}
          <Avatar className="ring-2 ring-background">
            <AvatarFallback className="bg-muted text-muted-foreground text-sm">
              +{sampleUsers.length - 4}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex -space-x-3">
          {sampleUsers.slice(0, 3).map((user) => (
            <Avatar key={user.name} className="ring-2 ring-background">
              <AvatarFallback className={`text-white ${getColor(user.name)}`}>
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
      </ComponentSection>

      <ComponentSection
        title="Avatar with Info"
        description="Combine avatars with name and role for profile cards."
        source="composition"
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
        {sampleUsers.slice(0, 3).map((user, i) => (
          <div key={user.name} className="flex items-center gap-3">
            <AvatarWithStatus
              name={user.name}
              status={i === 0 ? "online" : i === 1 ? "busy" : "away"}
            />
            <div>
              <p className="text-sm text-foreground">{user.name}</p>
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
