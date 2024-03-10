import cx from "classnames";
export default function Container({
  children,
  className,
}: {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}) {
  return (
    <div className={cx("lg:container mx-auto px-[16px]", className)}>
      {children}
    </div>
  );
}
