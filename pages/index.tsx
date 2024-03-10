import cx from "classnames";
import { useState } from "react";
import ProductsGrid from "../src/components/products-grid";
import Sidebar from "../src/components/sidebar";
import Row from "../src/components/Row";
import Container from "../src/components/container";
import Link from "next/link";
export default function Desktop<NextPage>() {
  const [showSidebar, toggleSidebar] = useState(false);

  return (
    <div>
      <div
        className={cx("app-body w-full  relative bg-white overflow-hidden ", {
          "has-sidebar": showSidebar,
        })}
      >
        <header className="w-full ">
          <Container className="flex flex-row items-center justify-between">
            <Link
              href={"#"}
              className="flex flex-row items-start justify-end  relative"
            >
              <img
                className="w-[144px] md:w-[172px]"
                alt=""
                src="/images/loguito.svg"
              />
            </Link>
            <div className="flex flex-row items-start justify-start gap-[64px] py-[8px] md:py-[12px]">
              <Link href={"#"} className="relative font-bold py-[8px]">
                Comparar
              </Link>
              <Link
                href={"#"}
                className="relative whitespace-nowrap font-bold py-[8px] hidden lg:inline-block "
              >
                Acerca de la herramienta
              </Link>
            </div>
          </Container>
        </header>
        <Row className="bg-beige">
          <Container>
            <div className="flex lg:flex-row flex-col items-start justify-between gap-[20px] lg:gap-0">
              <div>
                <h1 className=" text-xl lg:text-3xl font-black font-inter mb-[20px] lg:mb-[32px]">
                  Compara tus productos preferidos
                </h1>

                <p className="text-lglg:text-[24px] text-slate-400 font-regular ">
                  Encuentra el precio mas barato del articulo que buscas en tus
                  supermercados de preferencia.
                </p>
              </div>

              <div className="lg:ml-auto">
                <button
                  className="button-primary has-corners alt"
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
