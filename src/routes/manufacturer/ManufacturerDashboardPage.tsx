import { motion } from 'framer-motion';
import { Loader2, Hexagon, TrendingUp, BarChart3 } from 'lucide-react';
import { useManufacturingOverview } from '@/hooks/manufacturer/useManufacturingOverview';
import { useManufacturingModels } from '@/hooks/manufacturer/useManufacturingModels';
import { useManufacturingLocations } from '@/hooks/manufacturer/useManufacturingLocations';
import { ManufacturerKPISection, ManufacturerStatsRow } from '@/components/manufacturer/ManufacturerKPISection';
import { DefectByModelTable } from '@/components/manufacturer/DefectByModelTable';
import { DefectByLocationTable } from '@/components/manufacturer/DefectByLocationTable';

export const ManufacturerDashboardPage = () => {
    const { data: overviewData, isLoading: overviewLoading, error: overviewError } = useManufacturingOverview();
    const { data: modelsData, isLoading: modelsLoading } = useManufacturingModels();
    const { data: locationsData, isLoading: locationsLoading } = useManufacturingLocations();

    const isLoading = overviewLoading || modelsLoading || locationsLoading;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-mfg-emerald-400 animate-spin mx-auto mb-4" />
                    <p className="text-mfg-text-muted">Loading quality data...</p>
                </div>
            </div>
        );
    }

    if (overviewError) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center glass-card p-8 rounded-2xl max-w-md">
                    <div className="w-16 h-16 rounded-2xl bg-mfg-coral-500/20 flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="w-8 h-8 text-mfg-coral-400" />
                    </div>
                    <p className="text-mfg-coral-400 text-lg font-semibold mb-2">Error Loading Data</p>
                    <p className="text-mfg-text-muted text-sm">
                        Unable to fetch manufacturing quality metrics. Please try again later.
                    </p>
                </div>
            </div>
        );
    }

    if (!overviewData) return null;

    return (
        <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-mfg-emerald-500/20 to-mfg-cyan-500/20 flex items-center justify-center">
                            <Hexagon className="w-6 h-6 text-mfg-emerald-400" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">Quality Dashboard</h1>
                            <p className="text-mfg-text-muted">
                                Monitor defect patterns, RCA insights, and CAPA actions
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <BarChart3 className="w-4 h-4 text-mfg-text-muted" />
                    <span className="text-mfg-text-muted">Period:</span>
                    <span className="text-white font-medium">{overviewData.period}</span>
                </div>
            </div>

            {/* KPI Section */}
            <ManufacturerKPISection data={overviewData} />

            {/* Stats Row */}
            <ManufacturerStatsRow
                totalDefects={overviewData.totalDefects}
                resolvedThisMonth={overviewData.resolvedThisMonth}
                avgResolutionTime={overviewData.avgResolutionTime}
            />

            {/* Tables Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Defects by Model */}
                {modelsData && <DefectByModelTable models={modelsData} compact />}

                {/* Defects by Location */}
                {locationsData && <DefectByLocationTable locations={locationsData} compact />}
            </div>

            {/* Top Defect Categories */}
            <div className="glass-card rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-mfg-border">
                    <h2 className="text-lg font-bold text-white">Top Defect Categories</h2>
                    <p className="text-sm text-mfg-text-muted mt-1">
                        Highest incident categories across all models
                    </p>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                        {overviewData.topDefectCategories.map((category, idx) => (
                            <motion.div
                                key={category.category}
                                className="p-4 rounded-xl bg-mfg-dark-gray border border-mfg-border/50 hover:border-mfg-emerald-500/30 transition-all"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-2xl font-bold text-white">{idx + 1}</span>
                                    <span className="px-2 py-0.5 rounded text-xs bg-mfg-emerald-500/15 text-mfg-emerald-400">
                                        {category.affectedModels} models
                                    </span>
                                </div>
                                <p className="text-sm font-medium text-white mb-1">{category.category}</p>
                                <p className="text-xs text-mfg-text-muted">
                                    <span className="text-mfg-amber-400 font-mono">{category.incidents}</span> incidents
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
