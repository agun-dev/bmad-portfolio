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
      <p className="text-xs tracking-widest font-bold text-amber-400 uppercase mb-2">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="font-(family-name:--font-plus-jakarta-sans) text-4xl font-bold tracking-tight text-foreground"
      >
        {title}
      </h2>
      {description && (
        <p className="text-lg text-muted-foreground leading-relaxed mt-4 max-w-prose">
          {description}
        </p>
      )}
    </div>
  );
}
