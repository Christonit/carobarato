import type { NextPage } from "next";
import { useSelector } from "react-redux";
import { RootState } from "../store/index";
import { Product } from "../types";

import { useDispatch } from "react-redux";
import { toggleSidebar } from "../store/products/slice";
import { uniqueId } from "lodash";
import ProductsGridElement from "./products-grid-element";

const ProductsGrid: NextPage = () => {
  const { comparissons } = useSelector((state: RootState) => state.products);

  const dispatch = useDispatch();

  const sidenavToggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className="mx-auto">
      {Object.keys(comparissons).length ? (
        Object.entries(comparissons).map(([key]: [string, Product[]]) => {
          return <ProductsGridElement key={uniqueId()} title={key} />;
        })
      ) : (
        <div className="py-[32px] lg:py-[64px] border-[2px] border-solid border-slate-200 w-full px-[24px]">
          <img
            src="/images/shopping_bag.svg"
            className="w-[92px] lg:w-[180px] mb-[20px] lg:mb-[32px] mx-auto"
          />
          <h2 className="text-xl lg:text-3xl font-bold text-center mb-[20px] lg:mb-[32px]">
            Actualmente no tienes Comparaciones
          </h2>
          <p className="text-slate-500 text-center text-base slg:text-xl mb-[20px] lg:mb-[32px]">
            Dale click al boton de "comparaciones" o de "Crear comparacion" para
            empezar
          </p>
          <button
            className="button-primary has-corners alt mx-auto"
            onClick={sidenavToggle}
          >
            Crear comparacion
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsGrid;
