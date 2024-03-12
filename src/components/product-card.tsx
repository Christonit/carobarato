import { BasicInfo } from "../types";
import Link from "next/link";
import { SUPERMERCADOS, COLORS, BREAKPOINTS } from "../utils/constants";
import cx from "classnames";
import { truncateText } from "../utils/general";
import useDeviceSize from "../hooks";
export default function ProductCard({
  supermercado,
  product_name,
  product_url,
  prices,
  img_url,
}: BasicInfo) {
  const { windowWidth } = useDeviceSize();
  const superSorter = (value: string) => {
    switch (value) {
      case "la-sirena":
        return SUPERMERCADOS[0];
      case "nacional":
        return SUPERMERCADOS[1];
      case "jumbo":
        return SUPERMERCADOS[2];
      default:
        return SUPERMERCADOS[0];
    }
  };

  console.log({ windowWidth });
  return (
    <div className="product-card">
      <img className="w-full" alt="" src={img_url} />
      <div className="xl:w-[242px] flex flex-col items-start justify-start gap-[12px]">
        <div className="relative text-5xl font-black">
          ${prices[0].list_price}
        </div>
        <div className="relative font-medium white-space-nowrap">
          {windowWidth <= BREAKPOINTS.sm
            ? truncateText(product_name, 28)
            : product_name}
        </div>
        <div
          className={cx("relative font-medium")}
          style={{ color: COLORS[supermercado] }}
        >
          {superSorter(supermercado)}
        </div>
      </div>

      <Link
        className="button-primary w-full"
        href={product_url}
        target="_blank"
      >
        Visitar supermercado
      </Link>
    </div>
  );
}
