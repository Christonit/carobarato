import React, { useEffect, useState, useRef } from "react";
import { Product } from "../types";

const SearchBox = ({
  options,
  onSearch,
  onSelected,
}: {
  options?: Product[];
  onSearch: (value: string) => void;
  onSelected: (value: Product) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (options && options?.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [options]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="dropdown">
      <div className="dropdown-header">
        <div className="material-icons input-icon">search</div>
        <input
          className=""
          placeholder="Buscar producto"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options &&
            options.map((option) => {
              return (
                <li
                  className="dropdown-list-item"
                  onClick={() => onSelected(option)}
                  key={Math.random()}
                >
                  <>
                    <span className="w-[24px] h-[24px]">
                      <img
                        className="dropdown-img w-full mx-auto block"
                        src={option.img_url}
                      />
                    </span>

                    <b> ${option.prices[0].list_price}</b>
                    <span className="text-slate-400 text-[14px]">
                      {option.product_name}
                    </span>
                  </>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
