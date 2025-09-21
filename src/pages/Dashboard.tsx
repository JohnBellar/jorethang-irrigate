import React from 'react';
import MapView from '@/components/MapView';
import SensorCards from '@/components/SensorCards';
import SensorChart from '@/components/SensorChart';
import KPIs from '@/components/KPIs';
import AlertsPanel from '@/components/AlertsPanel';
import CropIntelligence from '@/components/CropIntelligence';

export default function Dashboard() {
  return (
    <div className="space-y-6 pb-6">
      {/* Farm Map - Full Width */}
      <MapView />
      
      {/* Sensor Cards */}
      <SensorCards />
      
      {/* KPIs */}
      <KPIs />
      
      {/* Charts */}
      <SensorChart />
      
      {/* Bottom Row: Crop Intelligence + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CropIntelligence />
        <AlertsPanel />
      </div>
    </div>
  );
}