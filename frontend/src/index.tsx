import { type ComponentType, type ReactNode, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import Compose from './app/Compose';

import { PlatformProvider } from '@providers/PlatformProvider';

import './index.css';

const root = document.getElementById('root') as HTMLElement;

const providers: ComponentType<{ children: ReactNode }>[] = [PlatformProvider];

createRoot(root).render(
  <StrictMode>
    <Compose components={providers}>
      <App />
    </Compose>
  </StrictMode>,
);
