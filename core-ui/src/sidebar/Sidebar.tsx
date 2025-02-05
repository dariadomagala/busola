import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from 'shared/components/ErrorBoundary/ErrorBoundary';
import { Spinner } from 'shared/components/Spinner/Spinner';
import { SidebarNavigation } from 'sidebar/SidebarNavigation';
import { Footer } from './Footer/Footer';

import './Sidebar.scss';

export const Sidebar = () => {
  const { t } = useTranslation();
  const pathname = window.location.pathname;
  if (pathname === '/clusters' || pathname === '/no-permissions') return null;

  return (
    <aside className="sidebar">
      <section className="sidebar__content">
        <Suspense fallback={<Spinner size="m" />}>
          <ErrorBoundary
            customMessage={t('navigation.errors.sidebar')}
            displayButton={false}
          >
            <SidebarNavigation />
          </ErrorBoundary>
        </Suspense>
      </section>
      <Footer />
    </aside>
  );
};
