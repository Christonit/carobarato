import React, { useState } from "react";

type Compound = {
  label: string;
  value: string;
};
type Options = string[] | Compound[];

const CustomDropdown = ({
  options,
  placeholder,
  onChange,
}: {
  options?: Options;
  placeholder: string;
  onChange: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<
    string | Compound | null
  >(null);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (props: Compound | string) => {
    setSelectedOption(props);
    setIsOpen(false);
    const payload = typeof props === "string" ? props : props.label;
    onChange(payload);
  };

  const selectedOptionComponent = () => {
    if (selectedOption) {
      return typeof selectedOption === "string" ? (
        selectedOption
      ) : (
        <>
          <span className="w-[24px] h-[24px]">
            <img
              className="dropdown-img h-full mx-auto block"
              src={`/images/${selectedOption.value}.ico`}
            />
          </span>
          {selectedOption.label}
        </>
      );
    }
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={toggling}>
        {selectedOption ? selectedOptionComponent() : placeholder}
        <div className="material-icons text-[20px] ml-auto">
          {isOpen ? "expand_more" : "expand_less"}
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

// Usage
// <CustomDropdown options={['Option 1', 'Option 2', 'Option 3']} />
