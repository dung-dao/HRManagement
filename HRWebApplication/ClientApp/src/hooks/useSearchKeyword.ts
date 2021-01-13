import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';
import React from 'react';

type Props = {
  when: () => boolean; // when to focus when pressing key "/"
};

const defaultProps = {
  when: () => true,
};

export const useSearchKeywork = ({ when }: Props = defaultProps) => {
  const searchInputRef = React.useRef<Input>(null);
  const [searchKeyword, setSearchKeyword] = React.useState('');

  const inputSearchProps = {
    ref: searchInputRef,
    onSearch: setSearchKeyword,
  } as InputProps;

  const searchRegex = new RegExp(searchKeyword, 'i');

  React.useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (!when()) return;

      const firedFromInput =
        e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;

      if (e.key === '/' && !firedFromInput) {
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
  }, [when]);

  return {
    searchRegex,
    inputSearchProps,
  };
};
