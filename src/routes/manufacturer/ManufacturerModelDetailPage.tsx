import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, ChevronLeft, Car, MapPin, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useManufacturingModelDefects } from '@/hooks/manufacturer/useManufacturingModelDefects';
import { DefectTypesTable } from '@/components/manufacturer/DefectTypesTable';
import { RCACAPADetailPanel } from '@/components/manufacturer/RCACAPADetailPanel';

export const ManufacturerModelDetailPage = () => {
    const { modelId } = useParams<{ modelId: string }>();
    const { data, isLoading, error } = useManufacturingModelDefects(modelId || '');
    const [selectedDefectId, setSelectedDefectId] = useState<string | null>(null);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-mfg-emerald-400 animate-spin mx-auto mb-4" />
                    <p className="text-mfg-text-muted">Loading model data...</p>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center glass-card p-8 rounded-2xl">
                    <p className="text-mfg-coral-400 text-lg font-semibold mb-2">Error Loading Data</p>
                    <p className="text-mfg-text-muted text-sm">Please try again later</p>
                </div>
            </div>
        );
    }

    const selectedDefect = data.defectTypes.find(d => d.defectId === selectedDefectId) || null;
    const totalCAPAs = data.defectTypes.reduce((sum, d) => sum + d.capaItems.length, 0);
    const implementedCAPAs = data.defectTypes.reduce(
        (sum, d) => sum + d.capaItems.filter(c => c.status === 'IMPLEMENTED').length,
        0
    );

    return (
        <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {/* Back Button */}
            <Link to="/manufacturer/models">
                <motion.div
                    className="inline-flex items-center gap-2 text-mfg-emerald-400 hover:text-mfg-emerald-300 transition-colors"
                    whileHover={{ x: -4 }}
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="font-medium">Back to Models</span>
                </motion.div>
            </Link>

            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-mfg-emerald-500/20 to-mfg-cyan-500/20 flex items-center justify-center">
                        <Car className="w-7 h-7 text-mfg-emerald-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">{data.modelName}</h1>
                        <p className="text-mfg-text-muted">
                            RCA & CAPA Analysis • {data.defectTypes.length} defect types
                        </p>
                    </div>
                </div>
            </div>

            {/* Summary KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="glass-card p-4 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-mfg-coral-500/20 flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-mfg-coral-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white">{data.totalDefects}</p>
                            <p className="text-xs text-mfg-text-muted">Total Defects</p>
                        </div>
                    </div>
                </div>
                <div className="glass-card p-4 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-mfg-amber-500/20 flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-mfg-amber-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white">{data.topDefectCategory}</p>
                            <p className="text-xs text-mfg-text-muted">Top Category</p>
                        </div>
                    </div>
                </div>
                <div className="glass-card p-4 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-mfg-cyan-500/20 flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-mfg-cyan-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white">{data.regionsImpacted.length}</p>
                            <p className="text-xs text-mfg-text-muted">Regions Impacted</p>
                        </div>
                    </div>
                </div>
                <div className="glass-card p-4 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-mfg-emerald-500/20 flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-mfg-emerald-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white">{implementedCAPAs}/{totalCAPAs}</p>
                            <p className="text-xs text-mfg-text-muted">CAPA Implemented</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content - Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[600px]">
                {/* Defect Types Table */}
                <DefectTypesTable
                    defects={data.defectTypes}
                    selectedDefectId={selectedDefectId}
                    onSelectDefect={setSelectedDefectId}
                />

                {/* RCA/CAPA Detail Panel */}
                <RCACAPADetailPanel defect={selectedDefect} />
            </div>
        </motion.div>
    );
};
