import * as React from "react"
import { ChevronDown } from 'lucide-react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  variant?: 'wall' | 'roof' | 'window' | 'floor' | 'property-type' | 'property-age';
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, className, variant, ...props }, ref) => {
    const getBackgroundColor = () => {
      switch (variant) {
        case 'wall':
          return '#2e234a';
        case 'roof':
          return '#2e234a';
        case 'window':
          return '#2e234a';
        case 'floor':
          return '#2e234a';
        case 'property-type':
          return '#211934';
        case 'property-age':
          return '#211934';
        default:
          return '#211934';
      }
    };

    return (
      <div className="relative">
        <select
          ref={ref}
          {...props}
          className="w-full text-white rounded-lg px-4 py-2.5 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#d85c9c] pr-10 h-[42px]"
          style={{ backgroundColor: getBackgroundColor() }}
        >
          {options.map(({ value, label }) => (
            <option 
              key={value} 
              value={value} 
              className="text-white py-2.5"
              style={{ backgroundColor: getBackgroundColor() }}
            >
              {label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#d85c9c] pointer-events-none" size={18} />
      </div>
    )
  }
)