import { motion } from 'framer-motion';
import { Loader2, Factory, Search } from 'lucide-react';
import { useState } from 'react';
import { useManufacturingLocations } from '@/hooks/manufacturer/useManufacturingLocations';
import { DefectByLocationTable } from '@/components/manufacturer/DefectByLocationTable';

export const ManufacturerLocationsPage = () => {
    const { data, isLoading, error } = useManufacturingLocations();
    const [searchQuery, setSearchQuery] = useState('');

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-mfg-emerald-400 animate-spin mx-auto mb-4" />
                    <p className="text-mfg-text-muted">Loading plants...</p>
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

    const filteredLocations = data.filter(loc =>
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.region.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const regionCounts = data.reduce((acc, loc) => {
        acc[loc.region] = (acc[loc.region] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

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
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-mfg-cyan-500/20 to-mfg-purple-500/20 flex items-center justify-center">
                        <Factory className="w-6 h-6 text-mfg-cyan-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Manufacturing Plants</h1>
                        <p className="text-mfg-text-muted">
                            Quality metrics and defect patterns by production facility
                        </p>
                    </div>
                </div>

                {/* Search */}
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-mfg-text-muted" />
                    <input
                        type="text"
                        placeholder="Search plants..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input-primary pl-11"
                    />
                </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="glass-card p-4 rounded-xl">
                    <p className="text-2xl font-bold text-white">{data.length}</p>
                    <p className="text-xs text-mfg-text-muted">Total Plants</p>
                </div>
                {Object.entries(regionCounts).slice(0, 4).map(([region, count]) => (
                    <div key={region} className="glass-card p-4 rounded-xl">
                        <p className="text-2xl font-bold text-white">{count}</p>
                        <p className="text-xs text-mfg-text-muted">{region} Region</p>
                    </div>
                ))}
            </div>

            {/* Locations Table */}
            <DefectByLocationTable locations={filteredLocations} />
        </motion.div>
    );
};
