import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, ChevronRight, Factory, MapPin } from 'lucide-react';
import type { ManufacturingLocationSummary } from '@/lib/types';

interface DefectByLocationTableProps {
    locations: ManufacturingLocationSummary[];
    compact?: boolean;
}

export const DefectByLocationTable = ({ locations, compact = false }: DefectByLocationTableProps) => {
    const navigate = useNavigate();

    const getTrendIcon = (trend: string) => {
        if (trend === 'INCREASING') return <TrendingUp className="w-4 h-4 text-mfg-coral-400" />;
        if (trend === 'DECREASING') return <TrendingDown className="w-4 h-4 text-mfg-emerald-400" />;
        return <Minus className="w-4 h-4 text-mfg-text-muted" />;
    };

    const getDefectCountColor = (count: number) => {
        if (count > 150) return 'text-mfg-coral-400';
        if (count > 80) return 'text-mfg-amber-400';
        return 'text-white';
    };

    const getRegionColor = (region: string) => {
        const colors: Record<string, string> = {
            North: 'bg-mfg-cyan-500/20 text-mfg-cyan-400',
            South: 'bg-mfg-amber-500/20 text-mfg-amber-400',
            East: 'bg-mfg-purple-500/20 text-mfg-purple-400',
            West: 'bg-mfg-emerald-500/20 text-mfg-emerald-400',
            Central: 'bg-mfg-coral-500/20 text-mfg-coral-400',
        };
        return colors[region] || 'bg-mfg-light-gray text-mfg-text-secondary';
    };

    if (compact) {
        return (
            <div className="glass-card rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-mfg-border">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <Factory className="w-5 h-5 text-mfg-cyan-400" />
                        Defects by Plant
                    </h2>
                </div>
                <div className="divide-y divide-mfg-border/50">
                    {locations.slice(0, 5).map((location, idx) => (
                        <motion.div
                            key={location.locId}
                            className="table-row-clickable px-6 py-4 flex items-center justify-between"
                            onClick={() => navigate(`/manufacturer/location/${location.locId}`)}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-mfg-light-gray flex items-center justify-center">
                                    <Factory className="w-5 h-5 text-mfg-text-muted" />
                                </div>
                                <div>
                                    <p className="text-white font-medium">{location.name}</p>
                                    <p className="text-xs text-mfg-text-muted">{location.region} Region</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className={`font-semibold ${getDefectCountColor(location.defectCount)}`}>
                                        {location.defectCount}
                                    </p>
                                    <p className="text-xs text-mfg-text-muted">defects</p>
                                </div>
                                {getTrendIcon(location.trend)}
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
            <div className="px-6 py-4 border-b border-mfg-border">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Factory className="w-5 h-5 text-mfg-cyan-400" />
                    Manufacturing Plant Overview
                </h2>
                <p className="text-sm text-mfg-text-muted mt-1">
                    Quality metrics and defect patterns by production facility
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-mfg-border/50">
                            <th className="table-header">Plant</th>
                            <th className="table-header">Region</th>
                            <th className="table-header">Dominant Models</th>
                            <th className="table-header">Defects</th>
                            <th className="table-header">Top Category</th>
                            <th className="table-header">Open CAPA</th>
                            <th className="table-header">Trend</th>
                            <th className="table-header"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {locations.map((location, idx) => (
                            <motion.tr
                                key={location.locId}
                                className="table-row-clickable"
                                onClick={() => navigate(`/manufacturer/location/${location.locId}`)}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.03 }}
                                whileHover={{ x: 4 }}
                            >
                                <td className="table-cell">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mfg-cyan-500/20 to-mfg-purple-500/20 flex items-center justify-center">
                                            <Factory className="w-5 h-5 text-mfg-cyan-400" />
                                        </div>
                                        <span className="font-semibold">{location.name}</span>
                                    </div>
                                </td>
                                <td className="table-cell">
                                    <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${getRegionColor(location.region)}`}>
                                        <MapPin className="w-3 h-3 inline mr-1" />
                                        {location.region}
                                    </span>
                                </td>
                                <td className="table-cell">
                                    <div className="flex gap-1 flex-wrap max-w-[200px]">
                                        {location.dominantModels.slice(0, 2).map((model) => (
                                            <span
                                                key={model}
                                                className="px-2 py-0.5 rounded text-xs bg-mfg-light-gray text-mfg-text-secondary"
                                            >
                                                {model}
                                            </span>
                                        ))}
                                        {location.dominantModels.length > 2 && (
                                            <span className="px-2 py-0.5 rounded text-xs bg-mfg-light-gray text-mfg-text-muted">
                                                +{location.dominantModels.length - 2}
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="table-cell">
                                    <span className={`font-mono font-semibold ${getDefectCountColor(location.defectCount)}`}>
                                        {location.defectCount}
                                    </span>
                                </td>
                                <td className="table-cell">
                                    <span className="text-mfg-text-secondary">{location.topDefectCategory}</span>
                                </td>
                                <td className="table-cell">
                                    <span className={`font-mono ${location.openCAPACount > 10 ? 'text-mfg-amber-400' : 'text-white'}`}>
                                        {location.openCAPACount}
                                    </span>
                                </td>
                                <td className="table-cell">
                                    {getTrendIcon(location.trend)}
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
