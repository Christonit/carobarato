import type { NextPage } from "next";
import ProductCard from "./product-card";
import { useSelector } from "react-redux";
import { RootState } from "../store/index";
import { useEffect } from "react";
import { Product } from "../types";
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

const ProductsGrid: NextPage = () => {
  const { comparissons } = useSelector((state: RootState) => state.products);

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

    console.log({ processedData });
    return processedData;
  };
  return (
    <div className="mx-auto">
      {comparissons &&
        Object.entries(comparissons).map(
          ([key, value]: [string, Product[]]) => {
            console.log({ value });
            return (
              <>
                <div
                  className="flex flex-row flex-wrap  items-center justify-between mb-[32px]"
                  key={key}
                >
                  <div className="inline-flex items-end gap-[16px]">
                    <h2 className=" font-bold text-2xl leading-none">{key}</h2>
                    <span className="text-slate-400 ">
                      Precios de fecha 15 de Marzo, 2024
                    </span>
                  </div>
                  <button className="button-primary">Agregar otro</button>
                </div>
                <div className="grid grid-cols-4 gap-[32px] w-full">
                  {value.map((item: Product) => (
                    <ProductCard {...item} />
                  ))}

                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dataProccessor(value)}>
                      <Bar dataKey="Precio" fill="#8884d8" />
                      <YAxis />
                      <XAxis dataKey={"name"} />
                      <Tooltip />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </>
            );
          }
        )}
    </div>
  );
};

export default ProductsGrid;
