import React from 'react';

export const useSearchKeywork = () => {
  const searchInputRef = React.useRef<any>();
  const [searchKeyword, setSearchKeyword] = React.useState('');

  const inputSearchProps = {
    ref: searchInputRef,
    onSearch: setSearchKeyword,
  };

  const searchRegex = new RegExp(searchKeyword, 'i');

  return {
    searchRegex,
    inputSearchProps,
  };
};
