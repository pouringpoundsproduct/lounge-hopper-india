
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
          className="pl-12 pr-10 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
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
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto animate-fade-in">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={index}
                className="flex items-center px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                onClick={() => handleOptionSelect(option)}
              >
                {option.icon && (
                  <img src={option.icon} alt="" className="w-6 h-6 mr-3 rounded" />
                )}
                <span className="text-gray-800">{option.label}</span>
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-500 text-center">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
