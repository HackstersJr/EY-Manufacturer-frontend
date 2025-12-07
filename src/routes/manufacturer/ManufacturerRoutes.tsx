import { Routes, Route, Navigate } from 'react-router-dom';
import { ManufacturerLayout } from '@/components/manufacturer/ManufacturerLayout';
import { ManufacturerDashboardPage } from './ManufacturerDashboardPage';
import { ManufacturerModelsPage } from './ManufacturerModelsPage';
import { ManufacturerModelDetailPage } from './ManufacturerModelDetailPage';
import { ManufacturerLocationsPage } from './ManufacturerLocationsPage';
import { ManufacturerLocationDetailPage } from './ManufacturerLocationDetailPage';

export const ManufacturerRoutes = () => {
    return (
        <ManufacturerLayout>
            <Routes>
                <Route path="/" element={<Navigate to="/manufacturer/dashboard" replace />} />
                <Route path="/dashboard" element={<ManufacturerDashboardPage />} />
                <Route path="/models" element={<ManufacturerModelsPage />} />
                <Route path="/model/:modelId" element={<ManufacturerModelDetailPage />} />
                <Route path="/locations" element={<ManufacturerLocationsPage />} />
                <Route path="/location/:locId" element={<ManufacturerLocationDetailPage />} />
            </Routes>
        </ManufacturerLayout>
    );
};
