import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Droplets, Gauge, Zap, Settings } from "lucide-react";
import { sensorReadings } from '@/data/staticData';
import { useToast } from "@/hooks/use-toast";

export default function Irrigation() {
  const [pumpStatus, setPumpStatus] = useState(true);
  const [autoMode, setAutoMode] = useState(true);
  const [waterPressure, setWaterPressure] = useState(1.2);
  const latest = sensorReadings[sensorReadings.length - 1];
  const { toast } = useToast();

  const togglePump = () => {
    setPumpStatus(!pumpStatus);
    toast({
      title: pumpStatus ? "Pump Stopped" : "Pump Started",
      description: pumpStatus ? "Irrigation system disabled" : "Irrigation system activated",
    });
  };

  const adjustPressure = (increase: boolean) => {
    const newPressure = increase 
      ? Math.min(2.0, waterPressure + 0.1)
      : Math.max(0.5, waterPressure - 0.1);
    setWaterPressure(Number(newPressure.toFixed(1)));
    toast({
      title: "Pressure Adjusted",
      description: `Water pressure set to ${newPressure.toFixed(1)} bar`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-agro-water" />
            💧 Irrigation Control System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pump Control */}
            <Card className="border-agro-water/20 bg-agro-water/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-agro-water" />
                    <span className="font-medium">Water Pump</span>
                  </div>
                  <Badge variant={pumpStatus ? "default" : "secondary"}>
                    {pumpStatus ? "ON" : "OFF"}
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status</span>
                    <Switch checked={pumpStatus} onCheckedChange={togglePump} />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Flow Rate</span>
                      <span>{pumpStatus ? "2.3 L/min" : "0 L/min"}</span>
                    </div>
                    <Progress value={pumpStatus ? 75 : 0} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Water Pressure */}
            <Card className="border-agro-leaf/20 bg-agro-leaf/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Gauge className="h-5 w-5 text-agro-leaf" />
                    <span className="font-medium">Water Pressure</span>
                  </div>
                  <span className="text-lg font-bold">{waterPressure} bar</span>
                </div>
                
                <div className="space-y-4">
                  <Progress value={(waterPressure / 2.0) * 100} className="h-2" />
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => adjustPressure(false)}
                      disabled={waterPressure <= 0.5}
                    >
                      -
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => adjustPressure(true)}
                      disabled={waterPressure >= 2.0}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Auto Mode */}
            <Card className="border-agro-green/20 bg-agro-green/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-agro-green" />
                    <span className="font-medium">Auto Mode</span>
                  </div>
                  <Badge variant={autoMode ? "default" : "secondary"}>
                    {autoMode ? "AUTO" : "MANUAL"}
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Smart Control</span>
                    <Switch checked={autoMode} onCheckedChange={setAutoMode} />
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    {autoMode 
                      ? "AI-driven irrigation based on soil moisture and crop needs"
                      : "Manual control of irrigation system"
                    }
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Water Quality & Tank Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Water Quality Monitoring</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-agro-water/10 rounded-lg">
                <div className="text-2xl font-bold text-agro-water">{latest.waterQuality}</div>
                <div className="text-sm text-muted-foreground">pH Level</div>
              </div>
              <div className="text-center p-3 bg-agro-success/10 rounded-lg">
                <div className="text-2xl font-bold text-agro-success">Good</div>
                <div className="text-sm text-muted-foreground">Quality</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Turbidity</span>
                <span>2.1 NTU</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Temperature</span>
                <span>24°C</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Salinity</span>
                <span>{latest.salinity} ppt</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tank & Storage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Main Tank</span>
                  <span>{latest.waterLevel}%</span>
                </div>
                <Progress value={latest.waterLevel} className="h-3" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Rainwater Tank</span>
                  <span>45%</span>
                </div>
                <Progress value={45} className="h-3" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Backup Tank</span>
                  <span>89%</span>
                </div>
                <Progress value={89} className="h-3" />
              </div>
            </div>
            
            <div className="pt-4 border-t text-sm text-muted-foreground">
              Total capacity: 5,000L | Available: 3,420L
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Drip Irrigation Status */}
      <Card>
        <CardHeader>
          <CardTitle>Drip Irrigation Zones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {['Zone A', 'Zone B', 'Zone C', 'Zone D'].map((zone, index) => (
              <Card key={zone} className="border-agro-leaf/20">
                <CardContent className="p-4 text-center">
                  <div className="text-lg font-bold text-agro-leaf">{zone}</div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {index === 0 ? 'Active' : index === 1 ? 'Scheduled' : 'Standby'}
                  </div>
                  <Badge 
                    variant={index === 0 ? "default" : index === 1 ? "secondary" : "outline"}
                    className={index === 0 ? "bg-agro-success" : ""}
                  >
                    {index === 0 ? 'Running' : index === 1 ? 'Next: 14:00' : 'Ready'}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}