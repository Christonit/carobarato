export default function Container({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return (
    <div className="lg:container mx-auto px-[16px] lg:px-0">{children}</div>
  );
}
