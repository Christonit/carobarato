import React, { useState } from "react";

const CustomDropdown = ({ options }: { options?: string[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value: string) => () => {
    setSelectedOption(value);
    setIsOpen(false);
    console.log(selectedOption);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={toggling}>
        <input type="text" className="dropdown-input" />
        {selectedOption || "Select an option"}
        <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>▼</span>
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options &&
            options.map((option) => (
              <li
                className="dropdown-list-item"
                onClick={onOptionClicked(option)}
                key={Math.random()}
              >
                {option}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;

// Usage
// <CustomDropdown options={['Option 1', 'Option 2', 'Option 3']} />
