import { BasicInfo } from "../types";
import Link from "next/link";
import { SUPERMERCADOS, COLORS, BREAKPOINTS } from "../utils/constants";
import cx from "classnames";
import { truncateText } from "../utils/general";
import useDeviceSize from "../hooks";
import { useRef } from "react";
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
      case "pricesmart":
        return SUPERMERCADOS[3];
      default:
        return SUPERMERCADOS[0];
    }
  };
  const productCard = useRef<HTMLDivElement>(null);

  const classToggler = () => {
    if (productCard.current && windowWidth <= BREAKPOINTS.md) {
      productCard.current.classList.toggle("active");
    }
  };

  const titleParser = (value: string) => {
    return windowWidth >= BREAKPOINTS.md
      ? value.length > 60
        ? truncateText(value, 56)
        : value
      : windowWidth < BREAKPOINTS.md && windowWidth >= BREAKPOINTS.sm
      ? truncateText(value, 32)
      : truncateText(value, value.length > 17 ? 19 : 24);
  };
  return (
    <div className='product-card' onClick={classToggler} ref={productCard}>
      {prices[0].discounted_price &&
        (prices[0].discounted_price as number) > 0 && (
          <span className='absolute top-[8px] right-[8px] bg-[#cc2200] text-white px-[8px] py-[4px] font-bold'>
            {(
              (((prices[0].list_price as number) -
                (prices[0].discounted_price as number)) /
                Number(prices[0].list_price)) *
              100
            ).toFixed(0)}{" "}
            % DESC
          </span>
        )}

      <div className='product-card-img'>
        <img
          className='w-full'
          alt={product_name + " Image"}
          src={img_url}
          width={270}
          height={260}
        />
      </div>
      <div className=' w-full flex flex-col items-start justify-start gap-[12px] bg-white relative z-[1]'>
        <div
          className={`relative text-5xl font-black ${
            prices[0].discounted_price &&
            (prices[0].discounted_price as number) > 1 &&
            "text-[#cc2200]"
          }`}
        >
          $
          {prices[0].discounted_price &&
          (prices[0].discounted_price as number) > 1
            ? prices[0].discounted_price
            : prices[0].list_price}
          {prices[0].discounted_price &&
            (prices[0].discounted_price as number) > 1 && (
              <s className='inline-block ml-[8px] font-medium text-slate-600'>
                {prices[0].list_price}
              </s>
            )}
        </div>
        <div className='relative font-medium white-space-nowrap capitalize'>
          {titleParser(product_name).toLowerCase()}
        </div>
        <div
          className={cx("relative font-medium")}
          style={{ color: COLORS[supermercado] }}
        >
          {superSorter(supermercado)}
        </div>
      </div>

      <Link
        className='button-primary w-full text-center'
        href={product_url}
        target='_blank'
      >
        Visitar {windowWidth >= BREAKPOINTS.md && "supermercado"}
      </Link>
    </div>
  );
}
