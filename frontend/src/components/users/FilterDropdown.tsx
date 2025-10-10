"use client";
import { useState, useRef, useEffect, ElementType } from "react";
import { ChevronDown } from "lucide-react";


type OptionType  = {
  label: string;
  icon: ElementType; 
};

type FilterDropdownProps = {
  label: string;
  icon: ElementType;
  options: OptionType[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
};


//Component Dropdown can be reused
export default function FilterDropdown({ label, icon: Icon, options, selectedValue, onSelect} : FilterDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)){
          setIsOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [dropdownRef]);

    //Function handle this item selected
    const handleSelect = (optionLabel: string) => {
        onSelect(optionLabel);
        setIsOpen(false);
    }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        suppressHydrationWarning
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 border rounded-full px-4 py-2 text-sm bg-white hover:bg-gray-50 min-w-[120px] cursor-pointer"
      >
        <Icon size={16} className="text-gray-600" />
        <span className="font-medium text-gray-700">{ selectedValue|| label}</span>
        <ChevronDown size={16} className="text-gray-500" />
      </button>

      {/* Menu dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg z-10">
          <ul className="py-1">
            {options.map((option) => {
              // --- BƯỚC 3: Kiểm tra item có đang được chọn không ---
              const isSelected = selectedValue === option.label;
              return (
                <li key={option.label}>
                  <button
                    suppressHydrationWarning
                    onClick={() => handleSelect(option.label)}
                    className={`flex items-center gap-3 w-full text-left px-4 py-2 text-sm cursor-pointer ${
                      isSelected
                        ? "bg-blue-600 text-white" // Style selected
                        : "text-gray-700 hover:bg-gray-100" // Style default
                    }`}
                  >
                    {option.icon && <option.icon size={16} className={isSelected ? 'text-white' : 'text-gray-500'} />}
                    {option.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
