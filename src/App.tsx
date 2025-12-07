import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { ManufacturerRoutes } from './routes/manufacturer/ManufacturerRoutes';

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/manufacturer/*" element={<ManufacturerRoutes />} />
                    <Route path="/" element={<Navigate to="/manufacturer/dashboard" replace />} />
                    <Route path="*" element={<Navigate to="/manufacturer/dashboard" replace />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
