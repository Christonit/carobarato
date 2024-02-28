import React, { useEffect, useState } from "react";
import ClosingFrames from "./closing-frames";
import ApiService from "../utils/apiService";
import debounce from "lodash/debounce";
import { useDispatch } from "react-redux";
import { setComparison } from "../store/products/slice";
import CustomDropdown from "./dropdown-select";
const Sidebar = ({
  toggleSidebar,
}: {
  toggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [supermarket, setSupermarket] = useState<string>("");

  const dispatch = useDispatch();
  const searchProducts = debounce(async () => {
    const { data } = await ApiService.getProducts(searchTerm, supermarket);
    if (data) {
      const payload = [data[0], data[1]];
      dispatch(setComparison({ key: "Cereales", products: payload }));
      console.log("RES RES", data);
    }
  }, 300);

  useEffect(() => {
    if (searchTerm !== "" && supermarket !== "") {
      searchProducts();
    }
  }, [searchTerm, supermarket]);

  return (
    <div className="sidebar border-l-[1px] border-solid border-slate-300 h-full">
      <button
        onClick={() => toggleSidebar(false)}
        className="mb-[32px] w-full flex flex-row items-start justify-between py-0 px-5 box-border gap-[20px] border-b-[1px] border-solid border-slate-300 py-[20px]"
      >
        <b className="relative">Comparador</b>
        <div className="w-5 relative text-xl material-icons inline-block mq450:text-base">
          arrow_forward
        </div>
      </button>
      <div className="w-full flex flex-col items-end justify-start py-0 pr-5 pl-[21px] box-border gap-[16px] mb-[32px]">
        <div className="self-stretch h-[21px] flex flex-row items-end justify-between gap-[20px]">
          <div className="self-stretch flex flex-row items-end justify-start gap-[0px_8px]">
            <div className="relative font-medium">Carnes de Res</div>
            <div className="w-5 flex flex-row items-start justify-start text-center text-sm text-white">
              <div className="h-5 w-5 relative rounded-[50%] bg-mediumblue" />
              <div className="flex-1 relative font-medium z-[1] ml-[-20px]">
                2
              </div>
            </div>
          </div>
          <div className="h-5 w-5 relative text-xl material-icons inline-block mq450:text-base">
            expand_less
          </div>
        </div>
        <ClosingFrames nacional="Nacional" />
        <ClosingFrames nacional="La Sirena" />
      </div>

      <div className="w-full flex flex-col items-start justify-start py-0 px-5 box-border gap-[16px_0px]">
        <b className="relative">Buscar productos</b>
        <div className="self-stretch flex flex-row items-end justify-between py-2 pr-5 pl-[13px] gap-[20px] z-[1] text-dimgray-100 border-[1px] border-solid border-darkgray">
          <div className="relative">Carne de Res</div>
          <div className="h-9 w-[235px] relative box-border hidden border-[1px] border-solid border-darkgray" />
          <div className="h-5 relative text-xl material-icons text-black inline-block [transform:_rotate(-180deg)] z-[2] mq450:text-base">
            expand_less
          </div>
        </div>

        <CustomDropdown
          onChange={(val) => setSupermarket(val)}
          placeholder="Seleccionar supermercado"
          options={[
            { label: "La Sirena", value: "sirena" },
            { label: "El Nacional", value: "nacional" },
            { label: "Jumbo", value: "jumbo" },
          ]}
        />
        <div className=" flex w-full py-[8px] px-[8px] border-[1px] border-solid border-slate-400">
          <div className="material-icons input-icon">search</div>
          <input
            className=""
            placeholder="Buscar producto"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
