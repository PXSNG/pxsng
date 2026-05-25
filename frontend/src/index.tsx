import { type ComponentType, type ReactNode, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import Compose from './app/Compose';

import PlatformProvider from '@providers/PlatformProvider';
import GestureProvider from '@providers/GestureProvider';
import SearchProvider from '@providers/SearchProvider';
import ContextMenuProvider from '@providers/ContextMenuProvider';
import BackHandlerProvider from '@providers/BackhandlerProvider';
import CurrentUserProvider from '@providers/content/CurrentUserProvider';
import CourseProvider from '@providers/content/CourseContentProvider';
import ErrorBoundary from '@components/common/ErrorBoundary/ErrorBoundary';
import SettingsProvider from '@providers/SettingsProvider';

import './index.css';
import 'react-loading-skeleton/dist/skeleton.css';

const root = document.getElementById('root') as HTMLElement;

const providers: ComponentType<{ children: ReactNode }>[] = [
  GestureProvider,
  PlatformProvider,
  BackHandlerProvider,
  ContextMenuProvider,
  SearchProvider,
  SettingsProvider,

  CurrentUserProvider,
  CourseProvider,
];

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      <Compose components={providers}>
        <App />
      </Compose>
    </ErrorBoundary>
  </StrictMode>,
);
