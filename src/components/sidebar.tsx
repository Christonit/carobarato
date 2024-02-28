import React, { useEffect, useState } from "react";
import ClosingFrames from "./closing-frames";
import ApiService from "../utils/apiService";
import debounce from "lodash/debounce";
import { useDispatch } from "react-redux";
import { setComparison, addToComparison } from "../store/products/slice";
import SearchBox from "../components/search-box";
import CustomDropdown from "./dropdown-select";
import { useSelector } from "react-redux";
import type { RootState } from "../store/index";
import { Product } from "../types";
const Sidebar = ({
  toggleSidebar,
}: {
  toggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [supermarket, setSupermarket] = useState<string>("");
  const [comparissonList, setComparissonList] = useState<{
    selected: string;
    options: string[];
  }>();
  const { comparissons } = useSelector((state: RootState) => state.products);
  const [articleOptions, setArticleOptions] = useState<Product[]>([]);
  const dispatch = useDispatch();
  const searchProducts = debounce(async () => {
    const { data } = await ApiService.getProducts(searchTerm, supermarket);
    if (data) {
      setArticleOptions(data);
      console.log("RES RES", data);
    }
  }, 300);

  const selectArticle = (article: Product) => {
    if (Object.keys(comparissons).length === 0) {
      dispatch(
        setComparison({ key: article.product_name, products: [article] })
      );

      setComparissonList({
        selected: article.product_name,
        options: [article.product_name],
      });
    } else {
      dispatch(
        addToComparison({ key: comparissonList!.selected, product: article })
      );
    }

    setArticleOptions([]);

    return;
  };

  useEffect(() => {
    if (searchTerm !== "" && supermarket !== "") {
      searchProducts();
    }
  }, [searchTerm, supermarket]);

  // useEffect(() => {
  //   if (Object.keys(comparissons).length > 0) {
  //     console.log("COMPARISSONS", Object.keys(comparissons).length);
  //   }
  // }, [comparissons]);
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

      <div className="w-full flex flex-col items-start justify-start py-0 px-5 box-border gap-[16px_0px]">
        <b className="relative">Buscar productos</b>

        {comparissonList?.options.length && (
          <CustomDropdown
            onChange={(prop) => {
              if (typeof prop !== "string") return;

              setComparissonList({
                ...comparissonList,
                selected: prop,
              });
            }}
            placeholder={comparissonList.selected || "Seleccionar lista"}
            options={comparissonList?.options}
          />
        )}

        <CustomDropdown
          onChange={(prop) => {
            setSupermarket(Object.values(prop)[1]);
          }}
          placeholder="Seleccionar supermercado"
          options={[
            { label: "La Sirena", value: "sirena" },
            { label: "El Nacional", value: "nacional" },
            { label: "Jumbo", value: "jumbo" },
          ]}
        />

        <SearchBox
          onSearch={setSearchTerm}
          options={articleOptions}
          onSelected={selectArticle}
        />
      </div>
    </div>
  );
};

export default Sidebar;
