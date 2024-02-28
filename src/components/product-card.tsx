import { BasicInfo } from "../types";
import Link from "next/link";
export default function ProductCard({
  supermercado,
  product_name,
  product_url,
  prices,
  img_url,
}: BasicInfo) {
  return (
    <Link className="product-card" href={product_url} target="_blank">
      <img className="w-full" alt="" src={img_url} />
      <div className="w-[242px] flex flex-col items-start justify-start gap-[11px_0px]">
        <div className="relative text-5xl font-black">
          ${prices[0].list_price}
        </div>
        <div className="relative font-medium">{product_name}</div>
        <div className="relative font-medium text-red">{supermercado}</div>
      </div>
    </Link>
  );
}
