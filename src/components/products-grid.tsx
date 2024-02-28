import type { NextPage } from "next";
import ProductCard from "./product-card";
import { useSelector } from "react-redux";
import { RootState } from "../store/index";
import { useEffect } from "react";
import { Product } from "../types";
const ProductsGrid: NextPage = () => {
  const { comparissons } = useSelector((state: RootState) => state.products);

  return (
    <div className="mx-auto">
      {comparissons &&
        Object.entries(comparissons).map(
          ([key, value]: [string, Product[]]) => {
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
                </div>
              </>
            );
          }
        )}
    </div>
  );
};

export default ProductsGrid;
