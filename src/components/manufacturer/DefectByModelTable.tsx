import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, ChevronRight, Car, AlertCircle } from 'lucide-react';
import type { ManufacturingModelSummary } from '@/lib/types';

interface DefectByModelTableProps {
    models: ManufacturingModelSummary[];
    compact?: boolean;
}

export const DefectByModelTable = ({ models, compact = false }: DefectByModelTableProps) => {
    const navigate = useNavigate();

    const getTrendBadge = (trend: string, percentage: number) => {
        const baseClass = 'px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1';
        if (trend === 'INCREASING') {
            return (
                <span className={`${baseClass} bg-mfg-coral-500/15 text-mfg-coral-400`}>
                    <TrendingUp className="w-3 h-3" />
                    +{percentage.toFixed(1)}%
                </span>
            );
        }
        if (trend === 'DECREASING') {
            return (
                <span className={`${baseClass} bg-mfg-emerald-500/15 text-mfg-emerald-400`}>
                    <TrendingDown className="w-3 h-3" />
                    -{percentage.toFixed(1)}%
                </span>
            );
        }
        return (
            <span className={`${baseClass} bg-mfg-light-gray text-mfg-text-muted`}>
                <Minus className="w-3 h-3" />
                Stable
            </span>
        );
    };

    const getDefectCountColor = (count: number) => {
        if (count > 200) return 'text-mfg-coral-400';
        if (count > 100) return 'text-mfg-amber-400';
        return 'text-white';
    };

    if (compact) {
        return (
            <div className="glass-card rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-mfg-border">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <Car className="w-5 h-5 text-mfg-emerald-400" />
                        Defects by Model
                    </h2>
                </div>
                <div className="divide-y divide-mfg-border/50">
                    {models.slice(0, 5).map((model, idx) => (
                        <motion.div
                            key={model.modelId}
                            className="table-row-clickable px-6 py-4 flex items-center justify-between"
                            onClick={() => navigate(`/manufacturer/model/${model.modelId}`)}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-mfg-light-gray flex items-center justify-center">
                                    <Car className="w-5 h-5 text-mfg-text-muted" />
                                </div>
                                <div>
                                    <p className="text-white font-medium">{model.modelName}</p>
                                    <p className="text-xs text-mfg-text-muted">{model.topDefectCategory}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className={`font-semibold ${getDefectCountColor(model.totalDefects)}`}>
                                        {model.totalDefects}
                                    </p>
                                    <p className="text-xs text-mfg-text-muted">defects</p>
                                </div>
                                {getTrendBadge(model.trend, model.trendPercentage)}
                                <ChevronRight className="w-5 h-5 text-mfg-text-muted" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="glass-card rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-mfg-border flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-mfg-emerald-400" />
                        Model Performance Overview
                    </h2>
                    <p className="text-sm text-mfg-text-muted mt-1">
                        Defect counts, trends, and CAPA status by vehicle model
                    </p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-mfg-border/50">
                            <th className="table-header">Model</th>
                            <th className="table-header">Total Defects</th>
                            <th className="table-header">Open CAPA</th>
                            <th className="table-header">Top Defect</th>
                            <th className="table-header">Trend</th>
                            <th className="table-header">Regions</th>
                            <th className="table-header"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {models.map((model, idx) => (
                            <motion.tr
                                key={model.modelId}
                                className="table-row-clickable"
                                onClick={() => navigate(`/manufacturer/model/${model.modelId}`)}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.03 }}
                                whileHover={{ x: 4 }}
                            >
                                <td className="table-cell">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mfg-emerald-500/20 to-mfg-cyan-500/20 flex items-center justify-center">
                                            <Car className="w-5 h-5 text-mfg-emerald-400" />
                                        </div>
                                        <span className="font-semibold">{model.modelName}</span>
                                    </div>
                                </td>
                                <td className="table-cell">
                                    <span className={`font-mono font-semibold ${getDefectCountColor(model.totalDefects)}`}>
                                        {model.totalDefects.toLocaleString()}
                                    </span>
                                </td>
                                <td className="table-cell">
                                    <span className={`font-mono ${model.openCAPA > 15 ? 'text-mfg-amber-400' : 'text-white'}`}>
                                        {model.openCAPA}
                                    </span>
                                </td>
                                <td className="table-cell">
                                    <span className="text-mfg-text-secondary">{model.topDefectCategory}</span>
                                </td>
                                <td className="table-cell">
                                    {getTrendBadge(model.trend, model.trendPercentage)}
                                </td>
                                <td className="table-cell">
                                    <div className="flex gap-1 flex-wrap">
                                        {model.affectedRegions.slice(0, 3).map((region) => (
                                            <span
                                                key={region}
                                                className="px-2 py-0.5 rounded text-xs bg-mfg-light-gray text-mfg-text-secondary"
                                            >
                                                {region}
                                            </span>
                                        ))}
                                        {model.affectedRegions.length > 3 && (
                                            <span className="px-2 py-0.5 rounded text-xs bg-mfg-light-gray text-mfg-text-muted">
                                                +{model.affectedRegions.length - 3}
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="table-cell">
                                    <ChevronRight className="w-5 h-5 text-mfg-text-muted" />
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
