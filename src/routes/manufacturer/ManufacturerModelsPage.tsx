import { motion } from 'framer-motion';
import { Loader2, Car, Search } from 'lucide-react';
import { useState } from 'react';
import { useManufacturingModels } from '@/hooks/manufacturer/useManufacturingModels';
import { DefectByModelTable } from '@/components/manufacturer/DefectByModelTable';

export const ManufacturerModelsPage = () => {
    const { data, isLoading, error } = useManufacturingModels();
    const [searchQuery, setSearchQuery] = useState('');

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-mfg-emerald-400 animate-spin mx-auto mb-4" />
                    <p className="text-mfg-text-muted">Loading models...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center glass-card p-8 rounded-2xl">
                    <p className="text-mfg-coral-400 text-lg font-semibold mb-2">Error Loading Data</p>
                    <p className="text-mfg-text-muted text-sm">Please try again later</p>
                </div>
            </div>
        );
    }

    if (!data) return null;

    const filteredModels = data.filter(model =>
        model.modelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.topDefectCategory.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-mfg-emerald-500/20 to-mfg-cyan-500/20 flex items-center justify-center">
                        <Car className="w-6 h-6 text-mfg-emerald-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Vehicle Models</h1>
                        <p className="text-mfg-text-muted">
                            Quality metrics and CAPA status by vehicle model
                        </p>
                    </div>
                </div>

                {/* Search */}
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-mfg-text-muted" />
                    <input
                        type="text"
                        placeholder="Search models..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input-primary pl-11"
                    />
                </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="glass-card p-4 rounded-xl">
                    <p className="text-2xl font-bold text-white">{data.length}</p>
                    <p className="text-xs text-mfg-text-muted">Total Models</p>
                </div>
                <div className="glass-card p-4 rounded-xl">
                    <p className="text-2xl font-bold text-mfg-coral-400">
                        {data.filter(m => m.trend === 'INCREASING').length}
                    </p>
                    <p className="text-xs text-mfg-text-muted">Rising Defects</p>
                </div>
                <div className="glass-card p-4 rounded-xl">
                    <p className="text-2xl font-bold text-mfg-amber-400">
                        {data.reduce((sum, m) => sum + m.openCAPA, 0)}
                    </p>
                    <p className="text-xs text-mfg-text-muted">Open CAPA</p>
                </div>
                <div className="glass-card p-4 rounded-xl">
                    <p className="text-2xl font-bold text-white">
                        {data.reduce((sum, m) => sum + m.totalDefects, 0)}
                    </p>
                    <p className="text-xs text-mfg-text-muted">Total Defects</p>
                </div>
            </div>

            {/* Models Table */}
            <DefectByModelTable models={filteredModels} />
        </motion.div>
    );
};
