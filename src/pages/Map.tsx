import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, MapPin, Navigation } from "lucide-react";
import { roverPath, sensorReadings } from '@/data/staticData';
import { cn } from '@/lib/utils';

export default function Map() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const currentPosition = roverPath[currentIndex];
  const currentSensor = sensorReadings[sensorReadings.length - 1];

  useEffect(() => {
    if (!isRunning) return;
    
    const timer = setInterval(() => {
      setCurrentIndex(i => (i + 1) % roverPath.length);
    }, 2500);
    
    return () => clearInterval(timer);
  }, [isRunning]);

  const toggleRover = () => setIsRunning(!isRunning);
  const resetRover = () => setCurrentIndex(0);
  const bringToSafeZone = () => setCurrentIndex(0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-agro-green" />
              Interactive Farm Map
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                Position {currentIndex + 1}/{roverPath.length}
              </Badge>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={toggleRover}
                className="gap-2"
              >
                {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isRunning ? 'Pause Rover' : 'Resume Rover'}
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={resetRover}
                className="gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
              <Button 
                size="sm" 
                onClick={bringToSafeZone}
                className="gap-2 bg-agro-warning text-white hover:bg-agro-warning/90"
              >
                <Navigation className="h-4 w-4" />
                Safe Zone
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative w-full h-[500px] overflow-hidden rounded-b-lg">
            <img 
              src="/farm-map.jpg" 
              alt="Farm satellite view" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
            
            {/* Rover position indicator */}
            <div 
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-in-out"
              style={{
                left: `${currentPosition.x}%`,
                top: `${currentPosition.y}%`,
              }}
            >
              {/* Rover icon with pulsing effect */}
              <div className="relative">
                <div className={cn(
                  "w-8 h-8 bg-agro-warning rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg",
                  isRunning && "animate-pulse"
                )}>
                  🤖
                </div>
                {/* Signal rings */}
                <div className="absolute inset-0 -m-3">
                  <div className="w-14 h-14 border-2 border-agro-warning/40 rounded-full animate-ping"></div>
                </div>
                <div className="absolute inset-0 -m-6">
                  <div className="w-20 h-20 border border-agro-warning/20 rounded-full animate-ping animation-delay-75"></div>
                </div>
              </div>
              
              {/* Timestamp */}
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                {new Date(currentPosition.ts).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>

            {/* Zone indicators */}
            <div className="absolute top-4 left-4 space-y-2">
              <Badge className="bg-agro-green text-white">Zone A - Active</Badge>
              <div className="text-xs text-white bg-black/60 px-2 py-1 rounded">
                Soil monitoring active
              </div>
            </div>
            
            <div className="absolute bottom-4 right-4 space-y-2">
              <Badge className="bg-agro-leaf text-white">Zone B - Scheduled</Badge>
              <div className="text-xs text-white bg-black/60 px-2 py-1 rounded">
                Irrigation at 14:00
              </div>
            </div>

            {/* Safe Zone indicator */}
            <div className="absolute top-4 right-4">
              <div className="w-12 h-12 border-2 border-dashed border-agro-success rounded-full flex items-center justify-center bg-agro-success/10">
                <span className="text-xs text-agro-success font-bold">🏠</span>
              </div>
              <div className="text-xs text-center text-agro-success mt-1">Safe Zone</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Sensor Data Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-agro-water/20 bg-agro-water/5">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-agro-water">{currentSensor.soilMoisture}%</div>
            <div className="text-sm text-muted-foreground">Soil Moisture</div>
          </CardContent>
        </Card>
        
        <Card className="border-agro-sun/20 bg-agro-sun/5">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-agro-sun">{currentSensor.soilTemp}°C</div>
            <div className="text-sm text-muted-foreground">Soil Temperature</div>
          </CardContent>
        </Card>
        
        <Card className="border-agro-success/20 bg-agro-success/5">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-agro-success">{currentSensor.waterLevel}%</div>
            <div className="text-sm text-muted-foreground">Tank Level</div>
          </CardContent>
        </Card>
        
        <Card className="border-agro-warning/20 bg-agro-warning/5">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-agro-warning">{currentSensor.salinity} ppt</div>
            <div className="text-sm text-muted-foreground">Salinity</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}