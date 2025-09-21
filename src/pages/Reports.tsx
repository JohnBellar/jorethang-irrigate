import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Calendar, FileText, TrendingUp } from "lucide-react";
import { sensorReadings, kpis } from '@/data/staticData';
import { useToast } from "@/hooks/use-toast";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import jsPDF from 'jspdf';

export default function Reports() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateReport = async (type: string) => {
    setIsGenerating(true);
    
    // Simulate report generation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create comprehensive PDF report
    const doc = new jsPDF('p', 'mm', 'a4');
    let yPosition = 20;
    
    // Title Page
    doc.setFontSize(20);
    doc.setTextColor(46, 125, 50); // agro-green color
    doc.text('🌱 AgroSmart Farm Report', 20, yPosition);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    yPosition += 15;
    doc.text(`Report Type: ${type}`, 20, yPosition);
    yPosition += 8;
    doc.text(`Generated: ${new Date().toLocaleString()}`, 20, yPosition);
    yPosition += 8;
    doc.text('Farm Location: Jorethang, South Sikkim', 20, yPosition);
    yPosition += 20;

    // Farm Overview Section
    doc.setFontSize(16);
    doc.setTextColor(46, 125, 50);
    doc.text('📊 Farm Overview & KPIs', 20, yPosition);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    yPosition += 15;

    kpis.forEach((kpi, index) => {
      doc.text(`• ${kpi.title}: ${kpi.value} (${kpi.subtitle})`, 25, yPosition);
      yPosition += 6;
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
    });

    yPosition += 10;

    // Current Sensor Status
    doc.setFontSize(16);
    doc.setTextColor(46, 125, 50);
    doc.text('🌡️ Current Sensor Readings', 20, yPosition);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    yPosition += 15;

    const latest = sensorReadings[sensorReadings.length - 1];
    const sensorData = [
      { label: 'Soil Moisture', value: `${latest.soilMoisture}%`, status: latest.soilMoisture > 35 ? 'Good' : 'Low' },
      { label: 'Soil Temperature', value: `${latest.soilTemp}°C`, status: 'Normal' },
      { label: 'Air Temperature', value: `${latest.airTemp}°C`, status: 'Normal' },
      { label: 'Air Humidity', value: `${latest.airHumidity}%`, status: 'Optimal' },
      { label: 'Salinity', value: `${latest.salinity} ppt`, status: 'Normal' },
      { label: 'Water Tank Level', value: `${latest.waterLevel}%`, status: latest.waterLevel > 50 ? 'Good' : 'Low' },
      { label: 'Water Pressure', value: `${latest.pressure} bar`, status: 'Normal' },
      { label: 'Water Quality (pH)', value: `${latest.waterQuality}`, status: 'Good' }
    ];

    sensorData.forEach(sensor => {
      doc.text(`• ${sensor.label}: ${sensor.value} - Status: ${sensor.status}`, 25, yPosition);
      yPosition += 6;
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
    });

    yPosition += 10;

    // Historical Trends
    doc.setFontSize(16);
    doc.setTextColor(46, 125, 50);
    doc.text('📈 Historical Sensor Trends', 20, yPosition);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    yPosition += 15;

    doc.text('Recent 6 Hours Sensor Data:', 25, yPosition);
    yPosition += 8;
    doc.text('Time      Soil M%  Soil T°C  Air T°C  Humidity%  Tank%  Press', 25, yPosition);
    yPosition += 6;

    sensorReadings.forEach(reading => {
      const line = `${reading.ts}     ${reading.soilMoisture}%      ${reading.soilTemp}°C     ${reading.airTemp}°C     ${reading.airHumidity}%       ${reading.waterLevel}%    ${reading.pressure}`;
      doc.text(line, 25, yPosition);
      yPosition += 5;
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
    });

    yPosition += 15;

    // ML Model Performance
    doc.setFontSize(16);
    doc.setTextColor(46, 125, 50);
    doc.text('🤖 ML Model & Crop Intelligence', 20, yPosition);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    yPosition += 15;

    const mlMetrics = [
      { metric: 'Prediction Accuracy', value: '92%', trend: '+3% this week' },
      { metric: 'Model MSE', value: '0.045', trend: 'Stable' },
      { metric: 'Training Episodes', value: '1,247', trend: 'Reinforcement Learning Active' },
      { metric: 'Water Recommendation Accuracy', value: '89%', trend: '+5% improvement' },
      { metric: 'False Alert Rate', value: '2.3%', trend: '-23% reduction' }
    ];

    mlMetrics.forEach(metric => {
      doc.text(`• ${metric.metric}: ${metric.value} (${metric.trend})`, 25, yPosition);
      yPosition += 6;
    });

    yPosition += 10;

    // Crop Intelligence Insights
    doc.text('Current Crop Recommendations:', 25, yPosition);
    yPosition += 8;
    doc.text('• Potato: 2.1L water needed (soil moisture below optimal)', 25, yPosition);
    yPosition += 6;
    doc.text('• Maize: 1.8L water needed (conditions good)', 25, yPosition);
    yPosition += 6;
    doc.text('• Tomato: 2.5L water needed (high water requirement crop)', 25, yPosition);
    yPosition += 15;

    // Water Management
    doc.setFontSize(16);
    doc.setTextColor(46, 125, 50);
    doc.text('💧 Water Management & Efficiency', 20, yPosition);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    yPosition += 15;

    const waterMetrics = [
      'Water Efficiency: 48% savings vs traditional irrigation',
      'Average Water Usage: 1.8L per plant',
      'Tank Utilization: 76% average level maintained',
      'Drip Irrigation Uptime: 99.2%',
      'Rainwater Collection: 234L this week',
      'Estimated Water Savings: 1,240L this month'
    ];

    waterMetrics.forEach(metric => {
      doc.text(`• ${metric}`, 25, yPosition);
      yPosition += 6;
    });

    yPosition += 15;

    // Alert Summary
    doc.setFontSize(16);
    doc.setTextColor(46, 125, 50);
    doc.text('🚨 Recent Alerts & Actions', 20, yPosition);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    yPosition += 15;

    const alerts = [
      { time: '08:50', alert: 'Soil moisture below threshold at Zone A', action: 'Auto-irrigation activated' },
      { time: '08:45', alert: 'Tank water level dropped below 75%', action: 'Rainwater pump activated' },
      { time: '08:40', alert: 'Rover battery low (25%)', action: 'Charging station return initiated' },
      { time: '07:30', alert: 'High salinity detected in Zone B', action: 'Dilution system activated' }
    ];

    alerts.forEach(alert => {
      doc.text(`• ${alert.time}: ${alert.alert}`, 25, yPosition);
      yPosition += 5;
      doc.text(`  Action: ${alert.action}`, 30, yPosition);
      yPosition += 8;
    });

    yPosition += 15;

    // Weather Integration
    if (yPosition > 200) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(16);
    doc.setTextColor(46, 125, 50);
    doc.text('🌤️ Weather Impact & Forecasting', 20, yPosition);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    yPosition += 15;

    doc.text('• Current Weather: Partly cloudy, 24°C', 25, yPosition);
    yPosition += 6;
    doc.text('• 3-Day Forecast: Light rain expected (15mm)', 25, yPosition);
    yPosition += 6;
    doc.text('• Rover Safety: All-clear, no harsh weather alerts', 25, yPosition);
    yPosition += 6;
    doc.text('• Solar Radiation: 680 W/m² (optimal for growth)', 25, yPosition);
    yPosition += 15;

    // Recommendations
    doc.setFontSize(16);
    doc.setTextColor(46, 125, 50);
    doc.text('💡 Recommendations & Next Actions', 20, yPosition);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    yPosition += 15;

    const recommendations = [
      'Increase irrigation frequency in Zone A due to low soil moisture',
      'Monitor salinity levels closely in Zone B',
      'Schedule rover battery maintenance',
      'Prepare for incoming rainfall - adjust irrigation schedule',
      'Consider expanding rainwater harvesting capacity',
      'Update ML model with latest crop yield data'
    ];

    recommendations.forEach(rec => {
      doc.text(`• ${rec}`, 25, yPosition);
      yPosition += 8;
    });

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text('Generated by AgroSmart - Smart Agriculture System for Hilly Regions', 20, 285);
    doc.text(`Page 1 of ${doc.getNumberOfPages()} | ${new Date().toLocaleDateString()}`, 160, 285);

    // Save the PDF
    doc.save(`agrosmart-${type.toLowerCase()}-report-${new Date().toISOString().split('T')[0]}.pdf`);
    
    toast({
      title: "Report Generated Successfully! 📄",
      description: `Comprehensive ${type} report has been downloaded with all farm metrics, ML insights, and recommendations.`,
    });
    
    setIsGenerating(false);
  };

  const weeklyData = sensorReadings.map((reading, index) => ({
    day: `Day ${index + 1}`,
    soilMoisture: reading.soilMoisture,
    waterUsage: 15 + index * 2,
    temperature: reading.soilTemp,
  }));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-agro-green" />
            📊 Farm Reports & Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              onClick={() => generateReport("Weekly")}
              disabled={isGenerating}
              className="h-16 flex-col gap-2 bg-agro-green hover:bg-agro-green-dark"
            >
              <Calendar className="h-5 w-5" />
              Weekly Report
            </Button>
            
            <Button 
              onClick={() => generateReport("Monthly")}
              disabled={isGenerating}
              className="h-16 flex-col gap-2 bg-agro-leaf hover:bg-agro-leaf/90"
            >
              <Download className="h-5 w-5" />
              Monthly Report
            </Button>
            
            <Button 
              onClick={() => generateReport("Performance")}
              disabled={isGenerating}
              className="h-16 flex-col gap-2 bg-agro-water hover:bg-agro-water/90"
            >
              <TrendingUp className="h-5 w-5" />
              Performance Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Farm Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {kpis.slice(0, 4).map((kpi, index) => (
              <Card key={index} className="border-agro-green/20 bg-agro-green/5">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-agro-green">{kpi.value}</div>
                  <div className="text-sm text-muted-foreground">{kpi.title}</div>
                  <Badge variant="outline" className="mt-2 text-xs">
                    {kpi.subtitle}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Weekly Soil Moisture Trend</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="soilMoisture" 
                      stroke="hsl(var(--agro-water))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--agro-water))', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Daily Water Usage</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar 
                      dataKey="waterUsage" 
                      fill="hsl(var(--agro-leaf))"
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ML Model Performance */}
      <Card>
        <CardHeader>
          <CardTitle>ML Model Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-agro-success/20 bg-agro-success/5">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-agro-success">92%</div>
                <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
                <div className="text-xs text-muted-foreground mt-1">Last 30 days</div>
              </CardContent>
            </Card>
            
            <Card className="border-agro-water/20 bg-agro-water/5">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-agro-water">0.045</div>
                <div className="text-sm text-muted-foreground">Model MSE</div>
                <div className="text-xs text-muted-foreground mt-1">Mean Squared Error</div>
              </CardContent>
            </Card>
            
            <Card className="border-agro-warning/20 bg-agro-warning/5">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-agro-warning">1,247</div>
                <div className="text-sm text-muted-foreground">Training Episodes</div>
                <div className="text-xs text-muted-foreground mt-1">Reinforcement Learning</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6 p-4 bg-agro-green/5 rounded-lg border border-agro-green/20">
            <h4 className="font-semibold mb-2">Recent Model Improvements</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Improved soil moisture prediction by 5% this week</li>
              <li>• Enhanced crop-specific water requirement accuracy</li>
              <li>• Integrated weather data for better forecasting</li>
              <li>• Reduced false positive alerts by 23%</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Historical Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Historical Reports Archive</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "September 2024 Monthly Report", date: "2024-09-01", size: "2.3 MB" },
              { name: "August 2024 Performance Analysis", date: "2024-08-01", size: "1.8 MB" },
              { name: "Q3 2024 Quarterly Summary", date: "2024-07-01", size: "4.1 MB" },
              { name: "Crop Intelligence Model v2.1", date: "2024-06-15", size: "892 KB" },
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-agro-green" />
                  <div>
                    <div className="font-medium text-sm">{report.name}</div>
                    <div className="text-xs text-muted-foreground">{report.date} • {report.size}</div>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="gap-2">
                  <Download className="h-3 w-3" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}