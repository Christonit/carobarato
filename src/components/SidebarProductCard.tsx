import { BasicInfo } from "../types";
import { truncateText } from "../utils/general";
export const SidebarProductCard = ({
  supermercado,
  product_name,
  prices,
  img_url,
}: BasicInfo) => {
  return (
    <div className="sidebar-comparison-item">
      <div className="sidebar-comparison-img">
        <img className="w-full" alt={img_url} src={img_url} />
      </div>
      <div className="flex flex-col ">
        <span className="relative">
          <b>${prices[0].list_price}</b> {supermercado}
        </span>
        <span className="relative font-regular text-slate-400 truncate">
          {truncateText(product_name, 36)}
        </span>
      </div>
    </div>
  );
};
