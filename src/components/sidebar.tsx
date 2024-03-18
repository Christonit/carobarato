import React, { useEffect, useState } from "react";
import ClosingFrames from "./closing-frames";
import ApiService from "../utils/apiService";
import debounce from "lodash/debounce";
import { useDispatch } from "react-redux";
import {
  setComparison,
  addToComparison,
  removeFromComparison,
  toggleSidebar,
} from "../store/products/slice";
import SearchBox from "../components/search-box";
import CustomDropdown from "./dropdown-select";
import { useSelector } from "react-redux";
import type { RootState } from "../store/index";
import { Product } from "../types";
import { NUEVA_COMPARACION } from "../utils/constants";
import { SidebarProductCard } from "./SidebarProductCard";
import { uniqueId } from "lodash";
const Sidebar = () => {
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);
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
      setIsSearchLoading(false);
    }
  }, 300);

  const selectArticle = (article: Product) => {
    if (
      Object.keys(comparissons).length === 0 ||
      comparissonList!.selected === NUEVA_COMPARACION
    ) {
      dispatch(
        setComparison({ key: article.product_name, products: [article] })
      );

      setComparissonList({
        selected: article.product_name,
        options: comparissonList?.options
          ? [...comparissonList.options, article.product_name]
          : [article.product_name],
      });
    } else {
      dispatch(
        addToComparison({ key: comparissonList!.selected, product: article })
      );
    }

    setSearchTerm(``);
    setArticleOptions([]);

    return;
  };

  useEffect(() => {
    if (searchTerm !== "" && supermarket !== "") {
      searchProducts();
    }
    if (searchTerm === "") {
      setArticleOptions([]);
    }
  }, [searchTerm, supermarket]);

  useEffect(() => {}, [comparissons]);
  return (
    <div className='sidebar border-l-[1px] border-solid border-slate-300 h-full'>
      <button
        onClick={() => dispatch(toggleSidebar())}
        className='mb-[32px] w-full flex flex-row items-start justify-between py-0 px-5 box-border gap-[20px] border-b-[1px] border-solid border-slate-300 py-[20px]'
      >
        <b className='relative'>Comparador</b>
        <div className='w-5 relative text-xl material-icons inline-block mq450:text-base'>
          arrow_forward
        </div>
      </button>

      <div className='w-full flex flex-col items-start justify-start py-0 px-5 box-border gap-[16px_0px]'>
        <b className='relative'>Buscar productos</b>

        {comparissonList?.options.length && (
          <CustomDropdown
            onChange={prop => {
              if (typeof prop !== "string") return;

              setComparissonList({
                ...comparissonList,
                selected: prop,
              });
            }}
            placeholder={comparissonList.selected || "Seleccionar lista"}
            options={[...comparissonList?.options, NUEVA_COMPARACION]}
          />
        )}

        <CustomDropdown
          onChange={prop => {
            setSupermarket(Object.values(prop)[1]);
          }}
          placeholder='Seleccionar supermercado'
          options={[
            { label: "La Sirena", value: "sirena" },
            { label: "El Nacional", value: "nacional" },
            { label: "Jumbo", value: "jumbo" },
            { label: "PriceSmart", value: "pricesmart" },
          ]}
        />

        <SearchBox
          className='mb-[20px]'
          onSearch={value => {
            if (value.length > 0 && !isSearchLoading) {
              setIsSearchLoading(true);
            }

            setSearchTerm(value);
          }}
          options={articleOptions}
          onSelected={selectArticle}
          loading={isSearchLoading}
        />
      </div>

      <hr className='border-t-[1px] border-solid border-slate-200 my-[16px]' />

      {comparissons &&
        Object.entries(comparissons).map(
          ([key, value]: [string, Product[]]) => {
            return (
              <div className='sidebar-comparison-block' key={uniqueId()}>
                <div className='flex gap-[12px] mb-[16px]'>
                  <b className='relative'>{key}</b>{" "}
                  <span className='comparison-count'>{value.length}</span>
                </div>
                <div className='sidebar-comparison-items'>
                  {value.map(product => (
                    <SidebarProductCard
                      key={product.product_name}
                      removeFromList={value => {
                        dispatch(
                          removeFromComparison({
                            list: key,
                            product_name: value,
                          })
                        );
                      }}
                      {...product}
                    />
                  ))}
                </div>
              </div>
            );
          }
        )}
    </div>
  );
};

export default Sidebar;
