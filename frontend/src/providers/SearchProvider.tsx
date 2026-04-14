import { use, createContext, ReactNode, useMemo, useState } from 'react';

interface SearchContextType {
  query: string;
  setQuery: (query: string) => void;
}

export const SearchContext = createContext<SearchContextType | undefined>(undefined);

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [query, setQuery] = useState('');

  const value = useMemo(() => ({ query, setQuery }), [query]);

  return <SearchContext value={value}>{children}</SearchContext>;
};

export const useSearch = () => {
  const context = use(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }

  return context;
};

export default SearchProvider;
