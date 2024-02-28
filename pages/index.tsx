import type { NextPage } from "next";
import cx from "classnames";
import { useState } from "react";
import SearchGroup from "../src/components/search-group";
import ProductsGrid from "../src/components/products-grid";
import Sidebar from "../src/components/sidebar";
import Row from "../src/components/Row";
import Container from "../src/components/container";
export default function Desktop<NextPage>() {
  const [showSidebar, toggleSidebar] = useState(false);

  return (
    <div>
      <div
        className={cx(
          "app-body w-full  relative bg-white overflow-hidden flex flex-col items-start justify-start gap-[30px_0px] tracking-[normal] text-left text-5xl font-inter",
          { "has-sidebar": showSidebar }
        )}
      >
        <header className="w-[1116px] flex flex-row items-start justify-start py-0 pr-[33px] pl-5 box-border max-w-full text-left text-5xl text-gold font-inter">
          <div className="flex-1 flex flex-row items-center justify-between py-4 px-0 box-border max-w-full gap-[20px]">
            <div className="flex flex-row items-start justify-end pt-1 pb-3.5 pr-3 pl-[33px] relative">
              <h3 className="m-0 relative text-inherit leading-[18px] font-bold font-inherit whitespace-nowrap z-[1]">
                carobarato
              </h3>
              <div className="h-full w-full absolute my-0 mx-[!important] top-[0px] right-[0px] bottom-[0px] left-[0px]">
                <img
                  className="absolute h-full w-full top-[0px] right-[0px] bottom-[0px] left-[0px] max-w-full overflow-hidden max-h-full"
                  alt=""
                  src="/rectangle-12.svg"
                />
                <img
                  className="absolute top-[3.9px] left-[8px] w-[23.2px] h-[26.6px] object-contain z-[1]"
                  loading="lazy"
                  alt=""
                  src="/group@2x.png"
                />
              </div>
            </div>
            <div className="flex flex-row items-start justify-start gap-[0px_64px] max-w-full text-base text-black mq700:hidden mq450:gap-[0px_64px]">
              <b className="relative">Comparar</b>
              <b className="relative whitespace-nowrap">
                Acerca de la herramienta
              </b>
            </div>
          </div>
        </header>
        <Row className="bg-beige">
          <Container>
            <div className="flex">
              <div>
                <h1 className="text-3xl font-black font-inter mb-[32px]">
                  Compara tus productos preferidos
                </h1>

                <p className="text-[24px] text-slate-400 font-regular ">
                  Encuentra el precio mas barato del articulo que buscas en tus
                  supermercados de preferencia.
                </p>
              </div>

              <div className="ml-auto">
                <button
                  className="button-primary"
                  onClick={() => toggleSidebar(!showSidebar)}
                >
                  Comparaciones
                </button>
              </div>
            </div>
          </Container>
        </Row>

        <Row>
          <Container>
            <ProductsGrid />
          </Container>
        </Row>
      </div>
      <div className={cx(["sidebar-container", { show: showSidebar }])}>
        <Sidebar toggleSidebar={toggleSidebar} />
      </div>
    </div>
  );
}
