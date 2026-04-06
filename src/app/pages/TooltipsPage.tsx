import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { useState, useRef, useEffect } from "react";
import { Info, HelpCircle, Settings, Copy, Trash2 } from "lucide-react";

function Tooltip({
  content,
  children,
  position = "top",
}: {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}) {
  const [visible, setVisible] = useState(false);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const GAP = 8;
      let s: React.CSSProperties = { position: "fixed", zIndex: 9999 };
      if (position === "top") {
        s.top = rect.top - GAP;
        s.left = rect.left + rect.width / 2;
        s.transform = "translate(-50%, -100%)";
      } else if (position === "bottom") {
        s.top = rect.bottom + GAP;
        s.left = rect.left + rect.width / 2;
        s.transform = "translateX(-50%)";
      } else if (position === "left") {
        s.top = rect.top + rect.height / 2;
        s.left = rect.left - GAP;
        s.transform = "translate(-100%, -50%)";
      } else {
        s.top = rect.top + rect.height / 2;
        s.left = rect.right + GAP;
        s.transform = "translateY(-50%)";
      }
      setStyle(s);
    }
    setVisible(true);
  };

  // Arrow classes per direction
  const arrowClass: Record<string, string> = {
    top: "absolute top-full left-1/2 -translate-x-1/2 border-4 border-l-transparent border-r-transparent border-b-transparent border-t-foreground",
    bottom: "absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-l-transparent border-r-transparent border-t-transparent border-b-foreground",
    left: "absolute left-full top-1/2 -translate-y-1/2 border-4 border-t-transparent border-b-transparent border-r-transparent border-l-foreground",
    right: "absolute right-full top-1/2 -translate-y-1/2 border-4 border-t-transparent border-b-transparent border-l-transparent border-r-foreground",
  };

  return (
    <div
      ref={triggerRef}
      className="inline-flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div style={style} className="pointer-events-none">
          <div className="relative px-2.5 py-1.5 rounded-lg bg-foreground text-background text-xs whitespace-nowrap shadow-lg">
            {content}
            <div className={arrowClass[position]} />
          </div>
        </div>
      )}
    </div>
  );
}

function RichTooltip({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  const [visible, setVisible] = useState(false);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setStyle({
        position: "fixed",
        zIndex: 9999,
        top: rect.top - 8,
        left: rect.left + rect.width / 2,
        transform: "translate(-50%, -100%)",
      });
    }
    setVisible(true);
  };

  return (
    <div
      ref={triggerRef}
      className="inline-flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div style={style} className="pointer-events-none">
          <div className="w-56 p-3 rounded-xl bg-foreground text-background shadow-xl">
            <p className="text-sm mb-1">{title}</p>
            <p className="text-xs opacity-70">{description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ClickPopover({
  children,
  content,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleToggle = () => {
    if (!open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setStyle({
        position: "fixed",
        zIndex: 9999,
        top: rect.top - 8,
        left: rect.left + rect.width / 2,
        transform: "translate(-50%, -100%)",
      });
    }
    setOpen((v) => !v);
  };

  return (
    <div ref={ref} className="inline-flex">
      <div ref={triggerRef} onClick={handleToggle}>
        {children}
      </div>
      {open && (
        <div style={style}>
          <div className="bg-background border border-border rounded-xl shadow-xl p-3 w-52">
            {content}
          </div>
        </div>
      )}
    </div>
  );
}

export function TooltipsPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Tooltips"
        description="Hover and click popovers for contextual help, labels, and supplementary information."
        badge="Component"
      />

      <ComponentSection
        title="Basic Tooltip"
        description="Simple text tooltip on hover with directional placement."
        code={`function Tooltip({ content, children, position = "top" }) {
  const [visible, setVisible] = useState(false);
  const [style, setStyle] = useState({});
  const ref = useRef(null);

  const handleMouseEnter = () => {
    const rect = ref.current.getBoundingClientRect();
    setStyle({ position: "fixed", zIndex: 9999,
      top: rect.top - 8, left: rect.left + rect.width / 2,
      transform: "translate(-50%, -100%)" });
    setVisible(true);
  };

  return (
    <div ref={ref} onMouseEnter={handleMouseEnter} onMouseLeave={() => setVisible(false)}>
      {children}
      {visible && (
        <div style={style} className="pointer-events-none w-0 h-0">
          <div className="px-2.5 py-1.5 rounded-lg bg-foreground text-background text-xs whitespace-nowrap shadow-lg">
            {content}
          </div>
        </div>
      )}
    </div>
  );
}`}
      >
        <div className="flex flex-wrap gap-4 items-center pt-6">
          <Tooltip content="Top tooltip" position="top">
            <button className="px-3 py-2 rounded-lg border border-border text-sm text-foreground hover:bg-accent">
              Top
            </button>
          </Tooltip>
          <Tooltip content="Bottom tooltip" position="bottom">
            <button className="px-3 py-2 rounded-lg border border-border text-sm text-foreground hover:bg-accent">
              Bottom
            </button>
          </Tooltip>
          <Tooltip content="Left tooltip" position="left">
            <button className="px-3 py-2 rounded-lg border border-border text-sm text-foreground hover:bg-accent">
              Left
            </button>
          </Tooltip>
          <Tooltip content="Right tooltip" position="right">
            <button className="px-3 py-2 rounded-lg border border-border text-sm text-foreground hover:bg-accent">
              Right
            </button>
          </Tooltip>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Icon Tooltips"
        description="Tooltips on icon buttons to explain actions."
        code={`<Tooltip content="Copy to clipboard">
  <button className="p-2 rounded-lg hover:bg-accent text-muted-foreground">
    <Copy className="w-4 h-4" />
  </button>
</Tooltip>`}
      >
        <div className="flex gap-2 pt-4">
          <Tooltip content="Copy to clipboard">
            <button className="p-2 rounded-lg hover:bg-accent text-muted-foreground">
              <Copy className="w-4 h-4" />
            </button>
          </Tooltip>
          <Tooltip content="Delete item">
            <button className="p-2 rounded-lg hover:bg-accent text-muted-foreground">
              <Trash2 className="w-4 h-4" />
            </button>
          </Tooltip>
          <Tooltip content="Settings">
            <button className="p-2 rounded-lg hover:bg-accent text-muted-foreground">
              <Settings className="w-4 h-4" />
            </button>
          </Tooltip>
          <Tooltip content="More information">
            <button className="p-2 rounded-lg hover:bg-accent text-muted-foreground">
              <Info className="w-4 h-4" />
            </button>
          </Tooltip>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Rich Tooltip"
        description="Tooltips with a title and description for more context."
        code={`function RichTooltip({ children, title, description }) {
  const [visible, setVisible] = useState(false);
  const [style, setStyle] = useState({});
  const ref = useRef(null);

  const handleMouseEnter = () => {
    const rect = ref.current.getBoundingClientRect();
    setStyle({ position: "fixed", zIndex: 9999,
      top: rect.top - 8, left: rect.left + rect.width / 2,
      transform: "translate(-50%, -100%)" });
    setVisible(true);
  };

  return (
    <div ref={ref} onMouseEnter={handleMouseEnter} onMouseLeave={() => setVisible(false)}>
      {children}
      {visible && (
        <div style={style} className="pointer-events-none w-0 h-0">
          <div className="w-56 p-3 rounded-xl bg-foreground text-background shadow-xl">
            <p className="text-sm mb-1">{title}</p>
            <p className="text-xs opacity-70">{description}</p>
          </div>
        </div>
      )}
    </div>
  );
}`}
      >
        <div className="flex flex-wrap gap-4 pt-8">
          <RichTooltip title="Pro Feature" description="Upgrade your plan to unlock this feature and more.">
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm text-foreground hover:bg-accent">
              <HelpCircle className="w-4 h-4 text-muted-foreground" />
              Hover me
            </button>
          </RichTooltip>
          <RichTooltip title="Two-Factor Auth" description="Add an extra layer of security to protect your account.">
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm text-foreground hover:bg-accent">
              <Info className="w-4 h-4 text-muted-foreground" />
              What's this?
            </button>
          </RichTooltip>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Click Popover"
        description="Click-triggered popovers for actions and menus."
        code={`function ClickPopover({ children, content }) {
  const [open, setOpen] = useState(false);
  const [style, setStyle] = useState({});
  const triggerRef = useRef(null);

  const handleToggle = () => {
    if (!open) {
      const rect = triggerRef.current.getBoundingClientRect();
      setStyle({ position: "fixed", zIndex: 9999,
        top: rect.top - 8, left: rect.left + rect.width / 2,
        transform: "translate(-50%, -100%)" });
    }
    setOpen(v => !v);
  };

  return (
    <div>
      <div ref={triggerRef} onClick={handleToggle}>{children}</div>
      {open && (
        <div style={style} className="w-0 h-0">
          <div className="bg-background border border-border rounded-xl shadow-xl p-3 w-52">
            {content}
          </div>
        </div>
      )}
    </div>
  );
}`}
      >
        <div className="pt-24 flex gap-4">
          <ClickPopover
            content={
              <div className="space-y-1">
                {["View Profile", "Edit Settings", "Sign Out"].map((item) => (
                  <button
                    key={item}
                    className="w-full text-left px-3 py-1.5 text-sm text-foreground hover:bg-accent rounded-md"
                  >
                    {item}
                  </button>
                ))}
              </div>
            }
          >
            <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm">
              Click Popover
            </button>
          </ClickPopover>
          <ClickPopover
            content={
              <div>
                <p className="text-xs text-muted-foreground mb-2">Share via</p>
                <div className="flex gap-2">
                  {["Twitter", "Email", "Link"].map((item) => (
                    <button
                      key={item}
                      className="px-2.5 py-1.5 text-xs rounded-md border border-border hover:bg-accent text-foreground"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            }
          >
            <button className="px-4 py-2 rounded-lg border border-border text-foreground text-sm hover:bg-accent">
              Share
            </button>
          </ClickPopover>
        </div>
      </ComponentSection>
    </div>
  );
}