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

export default function Reports() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateReport = async (type: string) => {
    setIsGenerating(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Report Generated",
      description: `${type} report has been generated and is ready for download.`,
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