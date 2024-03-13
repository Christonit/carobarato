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

  return (
    <div className="product-card">
      {prices[0].discounted_price && prices[0].discounted_price > 0 && (
        <span className="absolute top-[8px] right-[8px] bg-[#cc2200] text-white px-[8px] py-[4px] font-bold">
          {(
            ((prices[0].list_price - prices[0].discounted_price) /
              prices[0].list_price) *
            100
          ).toFixed(0)}{" "}
          % DESC
        </span>
      )}

      <img className="w-full" alt="" src={img_url} />
      <div className=" w-full flex flex-col items-start justify-start gap-[12px] bg-white relative z-[1]">
        <div
          className={`relative text-5xl font-black ${
            prices[0].discounted_price &&
            prices[0].discounted_price > 1 &&
            "text-[#cc2200]"
          }`}
        >
          $
          {prices[0].discounted_price && prices[0].discounted_price > 1
            ? prices[0].discounted_price
            : prices[0].list_price}
          {prices[0].discounted_price && prices[0].discounted_price > 1 && (
            <s className="inline-block ml-[8px] font-medium text-slate-600">
              {prices[0].list_price}
            </s>
          )}
        </div>
        <div className="relative font-medium white-space-nowrap">
          {windowWidth >= BREAKPOINTS.md
            ? product_name
            : windowWidth < BREAKPOINTS.md && windowWidth >= BREAKPOINTS.sm
            ? truncateText(product_name, 32)
            : truncateText(product_name, 23)}
        </div>
        <div
          className={cx("relative font-medium")}
          style={{ color: COLORS[supermercado] }}
        >
          {superSorter(supermercado)}
        </div>
      </div>

      <Link
        className="button-primary w-full text-center"
        href={product_url}
        target="_blank"
      >
        Visitar {windowWidth >= BREAKPOINTS.md && "supermercado"}
      </Link>
    </div>
  );
}
