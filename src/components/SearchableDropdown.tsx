
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Option {
  value: string;
  label: string;
  icon?: string;
}

interface SearchableDropdownProps {
  options: Option[];
  placeholder: string;
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  icon?: React.ReactNode;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options,
  placeholder,
  value,
  onChange,
  className = '',
  icon
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value || '');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearchTerm(value || '');
  }, [value]);

  useEffect(() => {
    const filtered = options.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      option.value.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [searchTerm, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    onChange(newValue);
    setIsOpen(true);
  };

  const handleOptionSelect = (option: Option) => {
    setSearchTerm(option.label);
    onChange(option.value);
    setIsOpen(false);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    } else if (e.key === 'Enter' && filteredOptions.length > 0) {
      handleOptionSelect(filteredOptions[0]);
    }
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          className="pl-12 pr-10 py-5 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 hover:border-gray-300 shadow-sm hover:shadow-md bg-white/90 backdrop-blur-sm"
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon || <Search className="w-5 h-5" />}
        </div>
        <ChevronDown 
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-3 bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl max-h-64 overflow-y-auto animate-fade-in">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={index}
                className="flex items-center px-5 py-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-amber-50 cursor-pointer transition-all duration-200 border-b border-gray-100 last:border-b-0 group first:rounded-t-2xl last:rounded-b-2xl"
                onClick={() => handleOptionSelect(option)}
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  animation: 'fade-in 0.3s ease-out forwards'
                }}
              >
                {option.icon && (
                  <img src={option.icon} alt="" className="w-8 h-8 mr-4 rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-200" />
                )}
                <span className="text-gray-800 font-medium group-hover:text-gray-900 text-lg">{option.label}</span>
              </div>
            ))
          ) : (
            <div className="px-5 py-6 text-gray-500 text-center">
              <div className="flex flex-col items-center">
                <Search className="w-8 h-8 text-gray-300 mb-2" />
                <span className="text-lg">No results found</span>
                <span className="text-sm text-gray-400 mt-1">Try adjusting your search</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
