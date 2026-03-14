import React from 'react';
import { Route, Routes, Outlet, useLocation } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import Breadcrumbs from '@/components/ui/Breadcrumbs'; // Убедитесь, что путь импорта корректен
import './Docs.scss';
import Panel from '../ControlPanel';

const DocsLayout = () => {
  const location = useLocation();

  // Получаем путь и разбиваем его, начиная с /documentation
  const pathnames = location.pathname.split('/').filter((x) => x);
  const isDocumentationPath = pathnames[0] === 'documentation';

  // Формируем "хлебные крошки"
  const breadcrumbItems = isDocumentationPath
    ? [
        { name: 'Документация', url: '/documentation' },
        ...pathnames.slice(1).map((name, index) => {
          const url = `/documentation/${pathnames.slice(1, index + 2).join('/')}`;
          return {
            name: name.charAt(0).toUpperCase() + name.slice(1),
            url,
          };
        }),
      ]
    : [];

  return (
    <section className="documentation">
      <div className="documentation__inner container">
        <Sidebar />
        <div className="documentation__content">
           {isDocumentationPath && <Breadcrumbs items={breadcrumbItems} />}
          <Outlet /> {/* Здесь рендерятся вложенные маршруты */}
        </div>
      </div>
    </section>
  );
};

export default function Docs() {
  return (
    <Routes>
      <Route element={<DocsLayout />}>
        <Route index element={<Panel />} />
        <Route path="ystanovka" element={<Panel />} />
      </Route>
    </Routes>
  );
}