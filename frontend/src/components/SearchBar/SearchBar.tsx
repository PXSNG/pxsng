import { type ChangeEvent, memo, useCallback } from 'react';
import FormControl from '@mui/material/FormControl';
import InputBase from '@mui/material/InputBase';

import Search from '@mui/icons-material/Search';
import { InputAdornment, styled } from '@mui/material';

const searchBarStyles = {
  root: 'rounded-xl bg-secondary-topbar dark:bg-secondary-topbar text-white px-4 py-2 border-none',
};

const SearchStyles = styled(InputBase)({
  width: '100%',
  '& .MuiInputBase-input': {
    padding: '5px 12px',
    width: '100%',
    borderRadius: '9999px',
    backgroundColor: 'var(--color-secondary-topbar)',
    color: 'white',
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.7)',
    },
  },
});

interface SearchBarProps {
  onInputChange?: (value: string) => void;
  placeholder?: string;
  value?: string;
}

const SearchBar = ({ onInputChange, placeholder, value }: SearchBarProps) => {
  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onInputChange?.(event.target?.value);
    },
    [onInputChange],
  );

  return (
    <div>
      <FormControl fullWidth={true}>
        <SearchStyles
          id="course-search"
          className={searchBarStyles.root}
          placeholder={placeholder || 'How to avoid getting mauled by bears...'}
          value={value}
          onChange={handleInputChange}
          endAdornment={
            <InputAdornment position="end" className="pointer-events-none">
              <Search className="mr-2 text-white" />
            </InputAdornment>
          }
        />
      </FormControl>
    </div>
  );
};

export default memo(SearchBar);
