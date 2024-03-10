import { BasicInfo } from "../types";
import { truncateText } from "../utils/general";
import { SUPERMERCADOS_OBJ, BREAKPOINTS, COLORS } from "../utils/constants";
import useDeviceSize from "../hooks";
export const SidebarProductCard = ({
  supermercado,
  product_name,
  prices,
  img_url,
  removeFromList,
}: BasicInfo & { removeFromList: (value: string) => void }) => {
  const { windowWidth } = useDeviceSize();
  return (
    <div className="sidebar-comparison-item">
      <div className="sidebar-comparison-img">
        <img className="w-full" alt={img_url} src={img_url} />
      </div>
      <div className="">
        <span className="relative block">
          <b>${prices[0].list_price}</b>{" "}
          <span style={{ color: COLORS[supermercado] }}>
            {SUPERMERCADOS_OBJ[supermercado]}
          </span>
        </span>
        <span className="relative font-regular text-slate-400 product-name">
          {windowWidth > BREAKPOINTS.md
            ? truncateText(product_name, 36)
            : product_name}
        </span>
      </div>

      <button
        onClick={() => removeFromList(product_name)}
        className="ml-auto material-icons delete-btn text-slate-500 !text-[20px] rounded-full border border-slate-300 h-[24px] min-w-[24px]"
      >
        close
      </button>
    </div>
  );
};
