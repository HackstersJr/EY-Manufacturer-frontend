import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, MapPin, AlertTriangle, Activity } from 'lucide-react';
import type { DefectType } from '@/lib/types';

interface DefectTypesTableProps {
    defects: DefectType[];
    selectedDefectId: string | null;
    onSelectDefect: (defectId: string) => void;
}

export const DefectTypesTable = ({ defects, selectedDefectId, onSelectDefect }: DefectTypesTableProps) => {
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

    const getIncidentColor = (count: number) => {
        if (count > 100) return 'text-mfg-coral-400';
        if (count > 50) return 'text-mfg-amber-400';
        return 'text-white';
    };

    return (
        <div className="glass-card rounded-2xl overflow-hidden h-full">
            <div className="px-6 py-4 border-b border-mfg-border">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-mfg-amber-400" />
                    Defect Types
                </h2>
                <p className="text-sm text-mfg-text-muted mt-1">
                    Click a defect to view RCA & CAPA details
                </p>
            </div>

            <div className="overflow-y-auto max-h-[500px] scrollbar-hide">
                <table className="w-full">
                    <thead className="sticky top-0 bg-mfg-medium-gray z-10">
                        <tr className="border-b border-mfg-border/50">
                            <th className="table-header">Defect</th>
                            <th className="table-header">Incidents</th>
                            <th className="table-header">Regions</th>
                            <th className="table-header">Trend</th>
                        </tr>
                    </thead>
                    <tbody>
                        {defects.map((defect, idx) => {
                            const isSelected = defect.defectId === selectedDefectId;

                            return (
                                <motion.tr
                                    key={defect.defectId}
                                    className={`cursor-pointer transition-all duration-200 ${isSelected
                                            ? 'bg-mfg-emerald-500/10 border-l-2 border-l-mfg-emerald-500'
                                            : 'table-row-clickable'
                                        }`}
                                    onClick={() => onSelectDefect(defect.defectId)}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.03 }}
                                >
                                    <td className="table-cell">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isSelected
                                                    ? 'bg-mfg-emerald-500/20'
                                                    : 'bg-mfg-light-gray'
                                                }`}>
                                                <Activity className={`w-4 h-4 ${isSelected ? 'text-mfg-emerald-400' : 'text-mfg-text-muted'
                                                    }`} />
                                            </div>
                                            <div>
                                                <p className={`font-medium ${isSelected ? 'text-mfg-emerald-400' : 'text-white'}`}>
                                                    {defect.defect}
                                                </p>
                                                {defect.mileageRange && (
                                                    <p className="text-xs text-mfg-text-muted">{defect.mileageRange}</p>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="table-cell">
                                        <span className={`font-mono font-semibold ${getIncidentColor(defect.incidents)}`}>
                                            {defect.incidents}
                                        </span>
                                    </td>
                                    <td className="table-cell">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-3 h-3 text-mfg-text-muted" />
                                            <span className="text-mfg-text-secondary text-sm">
                                                {defect.regions.slice(0, 2).join(', ')}
                                                {defect.regions.length > 2 && ` +${defect.regions.length - 2}`}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="table-cell">
                                        {getTrendBadge(defect.trend, defect.trendPercentage)}
                                    </td>
                                </motion.tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
