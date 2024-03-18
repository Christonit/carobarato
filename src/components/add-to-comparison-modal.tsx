import { useState, useEffect } from "react";
import debounce from "lodash/debounce";
import ApiService from "../utils/apiService";
import { Product } from "../types";
import SearchBox from "./search-box";
import CustomDropdown from "./dropdown-select";
import { SidebarProductCard } from "./SidebarProductCard";
import uniqueId from "lodash/uniqueId";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/index";
import { setComparison, showAddToComparisson } from "../store/products/slice";

const AddToComparisonModal = () => {
  const comparisonKey = useSelector(
    (state: RootState) => state.products.addToComparisson
  );

  const comparison = useSelector((state: RootState) => {
    if (comparisonKey) return state.products.comparissons[comparisonKey];
    return [];
  });

  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);
  const [articleOptions, setArticleOptions] = useState<Product[]>(comparison);
  const [searchArticleOptions, setSearchArticleOptions] =
    useState<Product[]>(comparison);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [supermarket, setSupermarket] = useState<string>("");
  const dispatch = useDispatch();
  const searchProducts = debounce(async () => {
    const { data } = await ApiService.getProducts(searchTerm, supermarket);
    if (data) {
      setSearchArticleOptions(data);
      setIsSearchLoading(false);
    }
  }, 300);

  useEffect(() => {
    if (searchTerm !== "" && supermarket !== "") {
      searchProducts();
    }
    if (searchTerm === "") {
      setSearchArticleOptions([]);
    }
  }, [searchTerm, supermarket]);
  useEffect(() => {
    console.log({ comparison });
  }, [comparison]);

  return (
    <>
      <div className='fixed p-[20px] top-0 left-0 h-full w-full  z-[99] flex items-center justify-center'>
        <div className='border-[1px] border-solid border-white bg-white w-full p-[20px]relative z-[2] p-[20px] pb-[32px] lg:pb-[64px] lg:p-[32px] lg:max-w-[600px]'>
          <h3 className='text-[24px] lg:text-[32px] font-bold text-center mb-[24px]'>
            Actualizar comparacion
          </h3>

          <div className='flex flex-col border-[1px] border-solid border-slate-200 p-[12px] mb-[24px]'>
            <b className='mb-[4px]'>Evaluando comparacion:</b>
            <p>{comparisonKey}</p>
          </div>

          {articleOptions.length <= 6 && (
            <>
              <CustomDropdown
                className='mb-[20px]'
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

                  console.log({ value });
                  setSearchTerm(value);
                }}
                options={searchArticleOptions}
                onSelected={option => {
                  setArticleOptions([...articleOptions, option]);
                }}
                loading={isSearchLoading}
              />
            </>
          )}
          {articleOptions.length > 0 && (
            <>
              <hr className='border-t-[1px] border-solid border-slate-200 my-[16px]' />

              <div className='sidebar-comparison-items mb-[32px]'>
                {articleOptions.map(product => (
                  <SidebarProductCard
                    key={product.product_name}
                    removeFromList={value => {
                      setArticleOptions(producs =>
                        producs.filter(p => p.product_id !== product.product_id)
                      );
                      console.log({ ITEM: value, product });
                    }}
                    {...product}
                  />
                ))}
              </div>

              <button
                className='button-primary has-corners alt mx-auto mt-[20px] min-w-[200px]'
                onClick={() => {
                  dispatch(
                    setComparison({
                      key: comparisonKey!,
                      products: articleOptions,
                    })
                  );
                  dispatch(showAddToComparisson(null));
                }}
              >
                Agregar
              </button>
            </>
          )}
        </div>
        <div
          className='overlay absolute top-0 left-0 mx-auto h-full w-full'
          onClick={() => {
            dispatch(showAddToComparisson(null));
          }}
        />
      </div>
    </>
  );
};

export default AddToComparisonModal;
