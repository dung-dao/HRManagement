import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';
import React from 'react';

export const useSearchKeywork = () => {
  const searchInputRef = React.useRef<Input>(null);
  const [searchKeyword, setSearchKeyword] = React.useState('');

  const inputSearchProps = {
    ref: searchInputRef,
    onSearch: setSearchKeyword,
  } as InputProps;

  const searchRegex = new RegExp(searchKeyword, 'i');

  React.useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === '/') {
        e.preventDefault();
        searchInputRef.current?.input.focus();
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        searchInputRef.current?.input.blur();
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  return {
    searchRegex,
    inputSearchProps,
  };
};
