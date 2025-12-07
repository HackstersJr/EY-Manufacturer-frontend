import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Loader2,
    ChevronLeft,
    Factory,
    MapPin,
    Car,
    AlertTriangle,
    TrendingUp,
    TrendingDown,
    Minus,
    CheckCircle2,
    Clock,
    Lightbulb
} from 'lucide-react';
import { useManufacturingLocationDefects } from '@/hooks/manufacturer/useManufacturingLocationDefects';
import type { CAPAStatus } from '@/lib/types';

export const ManufacturerLocationDetailPage = () => {
    const { locId } = useParams<{ locId: string }>();
    const { data, isLoading, error } = useManufacturingLocationDefects(locId || '');

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-mfg-emerald-400 animate-spin mx-auto mb-4" />
                    <p className="text-mfg-text-muted">Loading plant data...</p>
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

    const getTrendIcon = (trend: string) => {
        if (trend === 'INCREASING') return <TrendingUp className="w-4 h-4 text-mfg-coral-400" />;
        if (trend === 'DECREASING') return <TrendingDown className="w-4 h-4 text-mfg-emerald-400" />;
        return <Minus className="w-4 h-4 text-mfg-text-muted" />;
    };

    const getStatusConfig = (status: CAPAStatus) => {
        const configs = {
            PROPOSED: { class: 'capa-proposed', icon: Lightbulb, label: 'Proposed' },
            ACCEPTED: { class: 'capa-accepted', icon: CheckCircle2, label: 'Accepted' },
            IN_PROGRESS: { class: 'capa-in-progress', icon: Clock, label: 'In Progress' },
            IMPLEMENTED: { class: 'capa-implemented', icon: CheckCircle2, label: 'Implemented' },
        };
        return configs[status];
    };

    return (
        <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {/* Back Button */}
            <Link to="/manufacturer/locations">
                <motion.div
                    className="inline-flex items-center gap-2 text-mfg-emerald-400 hover:text-mfg-emerald-300 transition-colors"
                    whileHover={{ x: -4 }}
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="font-medium">Back to Plants</span>
                </motion.div>
            </Link>

            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-mfg-cyan-500/20 to-mfg-purple-500/20 flex items-center justify-center">
                        <Factory className="w-7 h-7 text-mfg-cyan-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">{data.name}</h1>
                        <div className="flex items-center gap-2 text-mfg-text-muted">
                            <MapPin className="w-4 h-4" />
                            <span>{data.region} Region</span>
                            <span className="text-mfg-border">•</span>
                            <span>{data.modelsPresent.length} models</span>
                        </div>
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
                        <div className="w-10 h-10 rounded-lg bg-mfg-emerald-500/20 flex items-center justify-center">
                            <Car className="w-5 h-5 text-mfg-emerald-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white">{data.modelsPresent.length}</p>
                            <p className="text-xs text-mfg-text-muted">Models Present</p>
                        </div>
                    </div>
                </div>
                <div className="glass-card p-4 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-mfg-amber-500/20 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-mfg-amber-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white">
                                {data.capaStatus.filter(c => c.status !== 'IMPLEMENTED').length}
                            </p>
                            <p className="text-xs text-mfg-text-muted">Open CAPA</p>
                        </div>
                    </div>
                </div>
                <div className="glass-card p-4 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-mfg-purple-500/20 flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-mfg-purple-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white">
                                {data.capaStatus.filter(c => c.status === 'IMPLEMENTED').length}
                            </p>
                            <p className="text-xs text-mfg-text-muted">Implemented</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Models Present Tags */}
            <div className="glass-card p-4 rounded-xl">
                <p className="text-sm text-mfg-text-muted mb-3">Models Manufactured at This Plant</p>
                <div className="flex flex-wrap gap-2">
                    {data.modelsPresent.map((model) => (
                        <span
                            key={model}
                            className="px-3 py-1.5 rounded-lg text-sm bg-mfg-light-gray text-white font-medium"
                        >
                            {model}
                        </span>
                    ))}
                </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Defects by Model */}
                <div className="glass-card rounded-2xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-mfg-border">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <Car className="w-5 h-5 text-mfg-emerald-400" />
                            Defects by Model
                        </h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-mfg-border/50">
                                    <th className="table-header">Model</th>
                                    <th className="table-header">Incidents</th>
                                    <th className="table-header">Key Defects</th>
                                    <th className="table-header">Trend</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.defectsByModel.map((model, idx) => (
                                    <motion.tr
                                        key={model.modelId}
                                        className="table-row"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.03 }}
                                    >
                                        <td className="table-cell font-medium">{model.modelName}</td>
                                        <td className="table-cell">
                                            <span className={`font-mono ${model.incidents > 50 ? 'text-mfg-coral-400' : 'text-white'}`}>
                                                {model.incidents}
                                            </span>
                                        </td>
                                        <td className="table-cell">
                                            <div className="flex flex-wrap gap-1">
                                                {model.keyDefects.slice(0, 2).map((defect) => (
                                                    <span
                                                        key={defect}
                                                        className="px-2 py-0.5 rounded text-xs bg-mfg-light-gray text-mfg-text-secondary"
                                                    >
                                                        {defect}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="table-cell">
                                            {getTrendIcon(model.trend)}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* CAPA Status */}
                <div className="glass-card rounded-2xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-mfg-border">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-mfg-purple-400" />
                            CAPA Status
                        </h2>
                    </div>
                    <div className="divide-y divide-mfg-border/50 max-h-[400px] overflow-y-auto scrollbar-hide">
                        {data.capaStatus.map((capa, idx) => {
                            const statusConfig = getStatusConfig(capa.status);
                            const StatusIcon = statusConfig.icon;

                            return (
                                <motion.div
                                    key={capa.capaId}
                                    className="px-6 py-4"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.03 }}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs font-mono text-mfg-text-muted">{capa.capaId}</span>
                                                <span className="text-xs text-mfg-text-muted">•</span>
                                                <span className="text-xs text-mfg-text-secondary">{capa.model}</span>
                                            </div>
                                            <p className="text-sm text-white mb-2">{capa.action}</p>
                                            <p className="text-xs text-mfg-amber-400">Defect: {capa.defect}</p>
                                        </div>
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 shrink-0 ${statusConfig.class}`}>
                                            <StatusIcon className="w-3 h-3" />
                                            {statusConfig.label}
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
