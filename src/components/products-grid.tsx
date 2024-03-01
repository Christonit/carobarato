import type { NextPage } from "next";
import ProductCard from "./product-card";
import { useSelector } from "react-redux";
import { RootState } from "../store/index";
import { useEffect, useState } from "react";
import { Compound, Product } from "../types";
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
import SearchBox from "./search-box";
import debounce from "lodash/debounce";
import ApiService from "../utils/apiService";
import CustomDropdown from "./dropdown-select";
import { useDispatch } from "react-redux";
import { addToComparison } from "../store/products/slice";
import { uniqueId } from "lodash";
import ProductsGridElement from "./products-grid-element";

const ProductsGrid: NextPage = () => {
  const { comparissons } = useSelector((state: RootState) => state.products);
  const [supermarket, setSupermarket] = useState<Compound>({
    label: "Jumbo",
    value: "jumbo",
  });
  // const [searchTerm, setSearchTerm] = useState<string>("");
  const [articleOptions, setArticleOptions] = useState<Product[]>([]);
  const dispatch = useDispatch();

  const dataProccessor = (data: Product[]) => {
    const processedData = data.map((item: Product) => {
      return {
        name: item.supermercado,
        Precio: Number(
          item.prices[0].discounted_price
            ? item.prices[0].discounted_price
            : item.prices[0].list_price
        ),
      };
    });
    return processedData;
  };

  const searchProducts = debounce(async (searchTerm: string) => {
    const { data } = await ApiService.getProducts(
      searchTerm,
      supermarket.value
    );
    if (data) {
      setArticleOptions(data);
    }
  }, 300);

  return (
    <div className="mx-auto">
      {comparissons &&
        Object.entries(comparissons).map(([key]: [string, Product[]]) => {
          return <ProductsGridElement key={uniqueId()} title={key} />;
        })}
    </div>
  );
};

export default ProductsGrid;
