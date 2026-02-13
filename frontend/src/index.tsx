import { type ComponentType, type ReactNode, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import Compose from './app/Compose';

import { PlatformProvider } from '@providers/PlatformProvider';
import { GestureProvider } from '@providers/GestureProvider';
import { SearchProvider } from '@providers/SearchProvider';

import './index.css';

const root = document.getElementById('root') as HTMLElement;

const providers: ComponentType<{ children: ReactNode }>[] = [
  GestureProvider,
  PlatformProvider,
  SearchProvider,
];

createRoot(root).render(
  <StrictMode>
    <Compose components={providers}>
      <App />
    </Compose>
  </StrictMode>,
);
