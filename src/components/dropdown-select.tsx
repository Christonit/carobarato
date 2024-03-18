import React, { useState, useRef, useEffect, ReactElement } from "react";
import cx from "classnames";
type Compound = {
  label: string;
  value: string;
};
type Options = string[] | Compound[];

const CustomDropdown = ({
  options,
  placeholder,
  onChange,
  defaultValue,
  className,
}: {
  options?: Options;
  defaultValue?: string | Compound;
  placeholder?: string;
  className?: string;
  onChange: (value: string | Compound) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<
    string | Compound | null
  >(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (props: Compound | string) => {
    setSelectedOption(props);
    const payload = typeof props === "string" ? props : props.label;
    onChange(props);
    setIsOpen(false);
  };

  const selectedOptionComponent = () => {
    if (selectedOption) {
      return typeof selectedOption === "string" ? (
        <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
          {" "}
          {selectedOption}
        </span>
      ) : (
        <>
          <span className="w-[24px] h-[24px]">
            <img
              className="dropdown-img h-full mx-auto block"
              src={`/images/${selectedOption.value}.ico`}
              alt="Supermercado Icon"
              width={24}
              height={24}
            />
          </span>
          {selectedOption.label}
        </>
      );
    }
  };

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
    <div className={cx("dropdown", className)} ref={dropdownRef}>
      <div className="dropdown-header" onClick={toggling}>
        {selectedOption ? (
          selectedOptionComponent()
        ) : (
          <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
            {" "}
            {placeholder}{" "}
          </span>
        )}
        <div className="material-icons text-[20px] ml-auto">
          {!isOpen ? "expand_more" : "expand_less"}
        </div>
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options &&
            options.map((option) => {
              return (
                <li
                  className="dropdown-list-item"
                  onClick={() => onOptionClicked(option)}
                  key={Math.random()}
                >
                  {typeof option === "string" ? (
                    option
                  ) : (
                    <>
                      <span className="w-[24px] h-[24px]">
                        <img
                          className="dropdown-img h-full mx-auto block"
                          src={`/images/${option.value}.ico`}
                        />
                      </span>

                      {option.label}
                    </>
                  )}
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
