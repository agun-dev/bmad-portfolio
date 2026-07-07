interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
}: SectionHeadingProps) {
  return (
    <div className="mb-12">
      <p className="mb-2 text-xs font-bold tracking-widest text-amber-400 uppercase">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="font-(family-name:--font-plus-jakarta-sans) text-4xl font-bold tracking-tight text-foreground"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-prose text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
