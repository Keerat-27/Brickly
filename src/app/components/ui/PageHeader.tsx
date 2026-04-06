interface PageHeaderProps {
  title: string;
  description: string;
  badge?: string;
}

export function PageHeader({ title, description, badge }: PageHeaderProps) {
  return (
    <div className="mb-10 pb-8 border-b border-border">
      {badge && (
        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs bg-primary/10 text-primary mb-3">
          {badge}
        </span>
      )}
      <h1 className="text-foreground">{title}</h1>
      <p className="text-muted-foreground mt-2 max-w-xl">{description}</p>
    </div>
  );
}
