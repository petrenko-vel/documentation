import React from 'react';
import { Route, Routes, Outlet, useLocation } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import Breadcrumbs from '@/components/ui/Breadcrumbs'; // Убедитесь, что путь импорта корректен
import './Docs.scss';
import TempaleDocsInstrument from './components/TempaleDocsInstrument/TempaleDocsInstrument';
import { docsContent } from './data/docsData';

const DocsLayout = () => {
  const location = useLocation();

  // Получаем путь и разбиваем его, начиная с /documentation
  const pathnames = location.pathname.split('/').filter((x) => x);
  const breadcrumbItems = [
  { name: 'Документация', url: '/documentation' },
  ...pathnames.slice(1).map((slug) => ({
    name: docsContent[slug]?.title || slug,
    url: `/documentation/${slug}`,
  })),
];

  return (
    <div className="documentation__inner container">
      <Sidebar />
      <div className="documentation__content">
        <Breadcrumbs items={breadcrumbItems} />
        <Outlet /> 
      </div>
    </div>
  );
};

export default function Docs() {
  return (
    <Routes>
      <Route element={<DocsLayout />}>
        {/* Когда просто /documentation */}
        <Route index element={<h2>Выберите раздел документации</h2>} />
        {/* Когда /documentation/ystanovka */}
        <Route path=":page" element={<TempaleDocsInstrument />} />
      </Route>
    </Routes>
  );
}