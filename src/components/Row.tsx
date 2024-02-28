import cx from "classnames";
export default function Row({
  children,
  className,
}: {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}) {
  return (
    <div
      className={cx([
        "flex flex-col items-center justify-start w-full max-w-full py-[32px] lg:py-[64px]",
        className,
      ])}
    >
      {children}
    </div>
  );
}
