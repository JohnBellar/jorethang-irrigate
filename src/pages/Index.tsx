// AgroSmart - Smart Agriculture Dashboard for IoT Monitoring

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Leaf, Droplets, Brain, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-agro-bg-overlay">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <img src="/logo.png" alt="AgroSmart" className="h-16 w-16" />
            <h1 className="text-4xl font-bold text-agro-green">AgroSmart</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Smart Agriculture IoT Dashboard for Efficient Cultivation in Hilly Regions
          </p>
          <p className="text-lg text-muted-foreground mt-2">
            Jorethang, South Sikkim • Sensor-Based Smart Irrigation System
          </p>
          
          <div className="flex justify-center gap-4 mt-8">
            <Button asChild size="lg" className="bg-agro-green hover:bg-agro-green-dark gap-2">
              <Link to="/dashboard">
                <MapPin className="h-5 w-5" />
                View Dashboard
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/map">View Farm Map</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="border-agro-leaf/20 bg-agro-leaf/5 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="h-6 w-6 text-agro-water" />
                Smart Irrigation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Automated irrigation with soil moisture sensors, water quality monitoring, and crop-specific intelligence for optimal water usage.
              </p>
              <div className="flex gap-2 mt-4">
                <Badge variant="outline">IoT Sensors</Badge>
                <Badge variant="outline">Auto Control</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-agro-green/20 bg-agro-green/5 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-6 w-6 text-agro-green" />
                Rover Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                GPS-enabled rover with ESP32 and multiple sensors for real-time field monitoring and data collection across farm zones.
              </p>
              <div className="flex gap-2 mt-4">
                <Badge variant="outline">GPS Tracking</Badge>
                <Badge variant="outline">Real-time Data</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-agro-warning/20 bg-agro-warning/5 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-agro-warning" />
                ML Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Machine learning models for crop intelligence, predictive irrigation scheduling, and reinforcement learning optimization.
              </p>
              <div className="flex gap-2 mt-4">
                <Badge variant="outline">Linear Regression</Badge>
                <Badge variant="outline">RL Learning</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>System Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-agro-success rounded-full"></div>
                  Soil moisture, temperature & salinity monitoring
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-agro-success rounded-full"></div>
                  Rainwater harvesting with level sensors
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-agro-success rounded-full"></div>
                  Water pump pressure & quality control
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-agro-success rounded-full"></div>
                  Weather API integration for alerts
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-agro-success rounded-full"></div>
                  SMS/App notifications for farmers
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-agro-success rounded-full"></div>
                  Weekly/monthly farm health reports
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hardware Components</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span>• ESP32 Microcontroller</span>
                <span>• GPS Module</span>
                <span>• Soil Sensors (DS18B20)</span>
                <span>• Water Level Sensors</span>
                <span>• Pressure Sensors</span>
                <span>• pH/Quality Sensors</span>
                <span>• Solar Radiation Sensor</span>
                <span>• Bluetooth Module</span>
                <span>• Solenoid Valves</span>
                <span>• MOSFET Controllers</span>
                <span>• Pumps & Motors</span>
                <span>• Battery Backup</span>
              </div>
              <Badge className="mt-4 bg-agro-leaf text-white">28 IoT Components</Badge>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Card className="inline-block p-6 bg-agro-green/5 border-agro-green/20">
            <CardContent className="p-0">
              <div className="flex items-center gap-4">
                <Leaf className="h-8 w-8 text-agro-green" />
                <div className="text-left">
                  <div className="font-semibold text-agro-green">Ready to optimize your farm?</div>
                  <div className="text-sm text-muted-foreground">Access the full dashboard to monitor and control your smart irrigation system</div>
                </div>
                <Button asChild className="bg-agro-green hover:bg-agro-green-dark">
                  <Link to="/dashboard">Get Started</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
