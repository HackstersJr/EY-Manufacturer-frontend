import { motion, AnimatePresence } from 'framer-motion';
import {
    Brain,
    Wrench,
    Factory,
    CheckCircle2,
    Clock,
    AlertCircle,
    Zap,
    TrendingDown,
    Lightbulb,
    User,
    Calendar,
    Sparkles
} from 'lucide-react';
import type { DefectType, CAPAItem, CAPAStatus } from '@/lib/types';

interface RCACAPADetailPanelProps {
    defect: DefectType | null;
}

const getStatusConfig = (status: CAPAStatus) => {
    const configs: Record<CAPAStatus, { class: string; icon: typeof CheckCircle2; label: string }> = {
        PROPOSED: {
            class: 'capa-proposed',
            icon: Lightbulb,
            label: 'Proposed'
        },
        ACCEPTED: {
            class: 'capa-accepted',
            icon: CheckCircle2,
            label: 'Accepted'
        },
        IN_PROGRESS: {
            class: 'capa-in-progress',
            icon: Clock,
            label: 'In Progress'
        },
        IMPLEMENTED: {
            class: 'capa-implemented',
            icon: Zap,
            label: 'Implemented'
        },
    };
    return configs[status];
};

const CAPACard = ({ capa, index }: { capa: CAPAItem; index: number }) => {
    const statusConfig = getStatusConfig(capa.status);
    const StatusIcon = statusConfig.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-4 rounded-xl bg-mfg-dark-gray border border-mfg-border/50 hover:border-mfg-border transition-all"
        >
            <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${capa.type === 'WORKSHOP'
                        ? 'bg-mfg-amber-500/15'
                        : 'bg-mfg-purple-500/15'
                    }`}>
                    {capa.type === 'WORKSHOP' ? (
                        <Wrench className="w-5 h-5 text-mfg-amber-400" />
                    ) : (
                        <Factory className="w-5 h-5 text-mfg-purple-400" />
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-mono text-mfg-text-muted">{capa.id}</span>
                                <span className={`px-2 py-0.5 rounded text-xs ${capa.type === 'WORKSHOP'
                                        ? 'bg-mfg-amber-500/15 text-mfg-amber-400'
                                        : 'bg-mfg-purple-500/15 text-mfg-purple-400'
                                    }`}>
                                    {capa.type}
                                </span>
                            </div>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${statusConfig.class}`}>
                            <StatusIcon className="w-3 h-3" />
                            {statusConfig.label}
                        </span>
                    </div>

                    <p className="text-sm text-white mb-3 leading-relaxed">{capa.action}</p>

                    <div className="flex flex-wrap gap-3 text-xs">
                        {capa.estimatedImpact && (
                            <div className="flex items-center gap-1 text-mfg-emerald-400">
                                <TrendingDown className="w-3 h-3" />
                                <span>{capa.estimatedImpact}</span>
                            </div>
                        )}
                        {capa.assignedTo && (
                            <div className="flex items-center gap-1 text-mfg-text-muted">
                                <User className="w-3 h-3" />
                                <span>{capa.assignedTo}</span>
                            </div>
                        )}
                        {capa.dueDate && (
                            <div className="flex items-center gap-1 text-mfg-text-muted">
                                <Calendar className="w-3 h-3" />
                                <span>{capa.dueDate}</span>
                            </div>
                        )}
                        {capa.aiConfidence && (
                            <div className="flex items-center gap-1 text-mfg-cyan-400">
                                <Sparkles className="w-3 h-3" />
                                <span>AI Confidence: {(capa.aiConfidence * 100).toFixed(0)}%</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export const RCACAPADetailPanel = ({ defect }: RCACAPADetailPanelProps) => {
    if (!defect) {
        return (
            <div className="glass-card rounded-2xl p-8 h-full flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-mfg-light-gray flex items-center justify-center mx-auto mb-4">
                        <Brain className="w-8 h-8 text-mfg-text-muted" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Select a Defect</h3>
                    <p className="text-sm text-mfg-text-muted max-w-[250px]">
                        Click on a defect type from the table to view root cause analysis and CAPA recommendations
                    </p>
                </div>
            </div>
        );
    }

    const workshopCAPAs = defect.capaItems.filter(c => c.type === 'WORKSHOP');
    const manufacturingCAPAs = defect.capaItems.filter(c => c.type === 'MANUFACTURING');

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={defect.defectId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-card rounded-2xl overflow-hidden h-full flex flex-col"
            >
                {/* Header */}
                <div className="px-6 py-4 border-b border-mfg-border bg-gradient-to-r from-mfg-purple-900/20 to-mfg-cyan-900/20">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mfg-purple-500/30 to-mfg-cyan-500/30 flex items-center justify-center">
                            <Brain className="w-5 h-5 text-mfg-purple-400" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">{defect.defect}</h2>
                            <p className="text-xs text-mfg-text-muted">{defect.incidents} incidents • {defect.regions.join(', ')}</p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                    {/* Root Cause Analysis */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <AlertCircle className="w-4 h-4 text-mfg-coral-400" />
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wide">Root Cause Analysis</h3>
                            <span className="px-2 py-0.5 rounded text-xs bg-mfg-emerald-500/20 text-mfg-emerald-400">
                                {(defect.rcaConfidence * 100).toFixed(0)}% confidence
                            </span>
                        </div>
                        <div className="p-4 rounded-xl bg-mfg-dark-gray border border-mfg-border/50">
                            <p className="text-sm text-mfg-text-secondary leading-relaxed">{defect.rca}</p>
                            {defect.rootCauseDetails && (
                                <p className="text-sm text-mfg-text-muted mt-3 pt-3 border-t border-mfg-border/50">
                                    {defect.rootCauseDetails}
                                </p>
                            )}
                            {defect.impactedComponents && defect.impactedComponents.length > 0 && (
                                <div className="mt-3 pt-3 border-t border-mfg-border/50">
                                    <p className="text-xs text-mfg-text-muted mb-2">Impacted Components:</p>
                                    <div className="flex flex-wrap gap-1">
                                        {defect.impactedComponents.map((comp) => (
                                            <span key={comp} className="px-2 py-0.5 rounded text-xs bg-mfg-light-gray text-mfg-text-secondary">
                                                {comp}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Workshop CAPA */}
                    {workshopCAPAs.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Wrench className="w-4 h-4 text-mfg-amber-400" />
                                <h3 className="text-sm font-semibold text-white uppercase tracking-wide">Workshop CAPA</h3>
                                <span className="text-xs text-mfg-text-muted">({workshopCAPAs.length})</span>
                            </div>
                            <div className="space-y-3">
                                {workshopCAPAs.map((capa, idx) => (
                                    <CAPACard key={capa.id} capa={capa} index={idx} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Manufacturing CAPA (AI Suggested) */}
                    {manufacturingCAPAs.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Factory className="w-4 h-4 text-mfg-purple-400" />
                                <h3 className="text-sm font-semibold text-white uppercase tracking-wide">Manufacturing CAPA</h3>
                                <span className="px-2 py-0.5 rounded text-xs bg-mfg-purple-500/20 text-mfg-purple-400 flex items-center gap-1">
                                    <Sparkles className="w-3 h-3" />
                                    AI Suggested
                                </span>
                            </div>
                            <div className="space-y-3">
                                {manufacturingCAPAs.map((capa, idx) => (
                                    <CAPACard key={capa.id} capa={capa} index={idx} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
