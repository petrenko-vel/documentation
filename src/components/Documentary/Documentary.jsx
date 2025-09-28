import { Outlet } from 'react-router-dom';
import React, { Suspense } from 'react';

import Sidebar from '@/components/Sidebar'
import './Documentary.scss'

export default function Documentary() {
    return(
        <>
        <div className="documentation-body container">
            <Sidebar />
            <div></div>
        </div>
        </>
    )
}