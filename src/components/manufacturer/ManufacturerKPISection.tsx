import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, Clock, Percent, LucideIcon } from 'lucide-react';
import type { ManufacturingOverview } from '@/lib/types';

interface KPICardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
    icon: LucideIcon;
    iconColor?: string;
    glowColor?: 'emerald' | 'amber' | 'coral' | 'cyan' | 'purple';
}

const KPICard = ({ title, value, subtitle, change, trend, icon: Icon, iconColor = 'text-mfg-emerald-400', glowColor = 'emerald' }: KPICardProps) => {
    const getTrendColor = () => {
        if (!trend) return 'text-mfg-text-muted';
        if (trend === 'up') return 'text-mfg-coral-400';
        if (trend === 'down') return 'text-mfg-emerald-400';
        return 'text-mfg-text-muted';
    };

    const getTrendIcon = () => {
        if (trend === 'up') return <TrendingUp className="w-4 h-4" />;
        if (trend === 'down') return <TrendingDown className="w-4 h-4" />;
        return null;
    };

    const getGlowClass = () => {
        const glowMap = {
            emerald: 'hover:shadow-glow-emerald',
            amber: 'hover:shadow-glow-amber',
            coral: 'hover:shadow-glow-coral',
            cyan: 'hover:shadow-glow-cyan',
            purple: 'hover:shadow-glow-purple',
        };
        return glowMap[glowColor];
    };

    return (
        <motion.div
            className={`glass-card p-6 rounded-2xl card-hover ${getGlowClass()}`}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
            <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-mfg-medium-gray to-mfg-light-gray flex items-center justify-center ${iconColor}`}>
                    <Icon className="w-6 h-6" />
                </div>
                {change && (
                    <div className={`flex items-center gap-1 text-sm font-medium ${getTrendColor()}`}>
                        {getTrendIcon()}
                        <span>{change}</span>
                    </div>
                )}
            </div>
            <div className="space-y-1">
                <h3 className="text-3xl font-bold text-white tracking-tight">
                    {typeof value === 'number' ? value.toLocaleString() : value}
                </h3>
                <p className="text-sm text-mfg-text-muted">{title}</p>
                {subtitle && (
                    <p className="text-xs text-mfg-text-secondary mt-1">{subtitle}</p>
                )}
            </div>
        </motion.div>
    );
};

interface ManufacturerKPISectionProps {
    data: ManufacturingOverview;
}

export const ManufacturerKPISection = ({ data }: ManufacturerKPISectionProps) => {
    const totalCAPA = data.capaStatus.proposed + data.capaStatus.accepted + data.capaStatus.inProgress + data.capaStatus.implemented;
    const risingModelsCount = data.modelsWithRisingDefects.filter(m => m.trend === 'INCREASING').length;
    const topCategory = data.topDefectCategories[0]?.category || 'N/A';

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <KPICard
                title="Models with Rising Defects"
                value={risingModelsCount}
                subtitle={`${data.modelsWithRisingDefects.length} models monitored`}
                change={risingModelsCount > 2 ? '+2 MoM' : 'Stable'}
                trend={risingModelsCount > 2 ? 'up' : 'neutral'}
                icon={TrendingUp}
                iconColor="text-mfg-coral-400"
                glowColor="coral"
            />
            <KPICard
                title="Total CAPA Items"
                value={totalCAPA}
                subtitle={`${data.capaStatus.inProgress} in progress`}
                change={`${data.capaStatus.proposed} proposed`}
                trend="neutral"
                icon={AlertTriangle}
                iconColor="text-mfg-amber-400"
                glowColor="amber"
            />
            <KPICard
                title="Implemented CAPA"
                value={data.capaStatus.implemented}
                subtitle={`${Math.round((data.capaStatus.implemented / totalCAPA) * 100)}% completion rate`}
                change="+12 this month"
                trend="down"
                icon={CheckCircle2}
                iconColor="text-mfg-emerald-400"
                glowColor="emerald"
            />
            <KPICard
                title="Top Defect Category"
                value={topCategory}
                subtitle={`${data.topDefectCategories[0]?.incidents || 0} incidents`}
                icon={Percent}
                iconColor="text-mfg-cyan-400"
                glowColor="cyan"
            />
        </div>
    );
};

// Additional Stats Row Component
interface StatsRowProps {
    totalDefects: number;
    resolvedThisMonth: number;
    avgResolutionTime: number;
}

export const ManufacturerStatsRow = ({ totalDefects, resolvedThisMonth, avgResolutionTime }: StatsRowProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-card p-4 rounded-xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-mfg-coral-500/20 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-mfg-coral-400" />
                </div>
                <div>
                    <p className="text-2xl font-bold text-white">{totalDefects.toLocaleString()}</p>
                    <p className="text-xs text-mfg-text-muted">Total Defects (30d)</p>
                </div>
            </div>
            <div className="glass-card p-4 rounded-xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-mfg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-mfg-emerald-400" />
                </div>
                <div>
                    <p className="text-2xl font-bold text-white">{resolvedThisMonth.toLocaleString()}</p>
                    <p className="text-xs text-mfg-text-muted">Resolved This Month</p>
                </div>
            </div>
            <div className="glass-card p-4 rounded-xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-mfg-purple-500/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-mfg-purple-400" />
                </div>
                <div>
                    <p className="text-2xl font-bold text-white">{avgResolutionTime.toFixed(1)} days</p>
                    <p className="text-xs text-mfg-text-muted">Avg Resolution Time</p>
                </div>
            </div>
        </div>
    );
};
