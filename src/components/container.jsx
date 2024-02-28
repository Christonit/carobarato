export default function Container({ children }) {
  return (
    <section className="py-[64px]">
      <div className="lg:container mx-auto px-[16px] lg:px-0">{children}</div>
    </section>
  );
}
