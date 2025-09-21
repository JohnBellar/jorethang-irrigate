import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings as SettingsIcon, Bell, Wifi, Database } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5 text-agro-green" />
            ⚙️ System Settings
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="critical-alerts">Critical Alerts</Label>
              <Switch id="critical-alerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="daily-reports">Daily Reports</Label>
              <Switch id="daily-reports" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="ml-updates">ML Model Updates</Label>
              <Switch id="ml-updates" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="h-5 w-5" />
              Connectivity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="wifi-ssid">WiFi Network</Label>
              <Input id="wifi-ssid" defaultValue="FarmNetwork_5G" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mqtt-broker">MQTT Broker</Label>
              <Input id="mqtt-broker" defaultValue="mqtt.agrosmart.local" />
            </div>
            <Button className="w-full">Update Settings</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline">Backup Data</Button>
            <Button variant="outline">Export Logs</Button>
            <Button variant="destructive">Reset System</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}