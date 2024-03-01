import React, { useState } from "react";
import CustomDropdown from "./dropdown-select";
import SearchBox from "./search-box";
import ProductCard from "./product-card";
import { Product } from "../types";
import { addToComparison } from "../store/products/slice"; // Import your specific action from redux
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ApiService from "../utils/apiService";
import debounce from "lodash/debounce";
import uniqueId from "lodash/uniqueId";
import { useDispatch, useSelector } from "react-redux";
const PriceComparison = ({ title }) => {
  const dispatch = useDispatch();
  const [supermarket, setSupermarket] = useState("");
  const [articleOptions, setArticleOptions] = useState([]);
  const products = useSelector((state) => state.products.comparissons[title]);
  const [chartData] = useState(
    products.map((item) => {
      const price = Number(item.prices[0].list_price);
      const discounted_price = Number(item.prices[0].discounted_price);

      return {
        name: item.supermercado,
        Precio: discounted_price > 0 ? discounted_price : price,
      };
    })
  );

  const searchProducts = debounce(async (searchTerm) => {
    const { data } = await ApiService.getProducts(
      searchTerm,
      supermarket.value
    );
    if (data) {
      setArticleOptions(data);
    }
  }, 300);

  return (
    <div>
      <div className="flex flex-row flex-wrap  items-center justify-between mb-[32px]">
        <div className="inline-flex items-end gap-[16px]">
          <h2 className=" font-bold text-2xl leading-none">{title}</h2>
          <span className="text-slate-400 ">
            Precios de fecha 15 de Marzo, 2024
          </span>
        </div>
        <div className="flex max-w-[520px]">
          <CustomDropdown
            className="w-full min-w-[172px]"
            onChange={(prop) => {
              const supermarket = prop;
              setSupermarket(supermarket);
            }}
            placeholder="Supermercado"
            options={[
              { label: "La Sirena", value: "sirena" },
              { label: "El Nacional", value: "nacional" },
              { label: "Jumbo", value: "jumbo" },
            ]}
          />
          <SearchBox
            className="ml-[-1px]"
            onSearch={searchProducts}
            options={articleOptions}
            onSelected={(value) => {
              dispatch(addToComparison({ key: title, product: value }));
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-[32px] w-full">
        {products.map((item) => (
          <ProductCard key={uniqueId()} {...item} />
        ))}

        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <Bar dataKey="Precio" fill="#8884d8" />
            <YAxis />
            <XAxis dataKey={"name"} />
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceComparison;
