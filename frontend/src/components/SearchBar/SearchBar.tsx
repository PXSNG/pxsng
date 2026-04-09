import { type ChangeEvent, memo, useCallback } from 'react';
import FormControl from '@mui/material/FormControl';
import InputBase from '@mui/material/InputBase';

import Search from '@mui/icons-material/Search';
import { InputAdornment, styled } from '@mui/material';
import { useSettings } from '@providers/SettingsProvider';

const searchBarStyles = {
  root: 'rounded-xl bg-secondary-topbar-light dark:bg-secondary-topbar-dark text-font-light dark:text-font-dark px-4 py-2 border-none',
};

const SearchStyles = styled(InputBase)({
  width: '100%',
  '& .MuiInputBase-input': {
    padding: '5px 12px',
    width: '100%',
    borderRadius: '9999px',
    backgroundColor: 'transparent',
    color: 'inherit',
    '&::placeholder': {
      color: 'calc(rgba(33, 53, 71, 0.6), inherit)',
    },
    '&::placeholder[data-theme="dark"]': {
      color: 'calc(rgba(255, 255, 255, 0.6), inherit)',
    },
  },
});

interface SearchBarProps {
  onChange?: (value: string) => void;
  placeholder?: string;
  value?: string;
}

const Adornment = () => {
  const { theme } = useSettings();
  return (
    <InputAdornment position="end" className="cursor-pointer">
      <Search className="mr-2 text-font-light dark:text-font-dark" data-theme={theme} />
    </InputAdornment>
  );
};

const SearchBar = ({ onChange, placeholder, value }: SearchBarProps) => {
  const { theme } = useSettings();
  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event.target?.value);
    },
    [onChange],
  );

  return (
    <div>
      <FormControl fullWidth={true}>
        <SearchStyles
          data-theme={theme}
          id="course-search"
          className={searchBarStyles.root}
          placeholder={placeholder || 'Search...'}
          value={value}
          onChange={handleInputChange}
          endAdornment={<Adornment />}
        />
      </FormControl>
    </div>
  );
};

export default memo(SearchBar);
