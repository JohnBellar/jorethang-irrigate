import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Locate, AlertCircle } from "lucide-react";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function MapView() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isTokenSet, setIsTokenSet] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationError, setLocationError] = useState<string>('');
  const [isTracking, setIsTracking] = useState(false);

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setIsTokenSet(true);
      initializeMap();
    }
  };

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      zoom: 15,
      center: [0, 0]
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    getUserLocation();
  };

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser.');
      return;
    }

    setIsTracking(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setLocationError('');
        
        if (map.current) {
          map.current.setCenter([longitude, latitude]);
          
          // Remove existing marker
          if (marker.current) {
            marker.current.remove();
          }
          
          // Create robot marker
          const robotElement = document.createElement('div');
          robotElement.innerHTML = '🤖';
          robotElement.style.fontSize = '24px';
          robotElement.style.textShadow = '0 0 10px rgba(0,0,0,0.5)';
          
          marker.current = new mapboxgl.Marker(robotElement)
            .setLngLat([longitude, latitude])
            .addTo(map.current);
            
          // Add popup
          const popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="p-2">
                <strong>🤖 Farm Robot Location</strong><br/>
                <small>Lat: ${latitude.toFixed(6)}<br/>
                Lng: ${longitude.toFixed(6)}<br/>
                Updated: ${new Date().toLocaleTimeString()}</small>
              </div>
            `);
          
          marker.current.setPopup(popup);
        }
        setIsTracking(false);
      },
      (error) => {
        setLocationError(`Location error: ${error.message}`);
        setIsTracking(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const startLocationTracking = () => {
    if (!navigator.geolocation) return;
    
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        
        if (map.current && marker.current) {
          marker.current.setLngLat([longitude, latitude]);
          map.current.easeTo({
            center: [longitude, latitude],
            duration: 1000
          });
          
          // Update popup
          const popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="p-2">
                <strong>🤖 Farm Robot Location</strong><br/>
                <small>Lat: ${latitude.toFixed(6)}<br/>
                Lng: ${longitude.toFixed(6)}<br/>
                Updated: ${new Date().toLocaleTimeString()}</small>
              </div>
            `);
          
          marker.current.setPopup(popup);
        }
      },
      (error) => {
        console.error('Location tracking error:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 30000
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  };

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    
    if (isTokenSet && map.current) {
      cleanup = startLocationTracking();
    }
    
    return () => {
      if (cleanup) cleanup();
      if (map.current) map.current.remove();
    };
  }, [isTokenSet]);

  if (!isTokenSet) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🗺️ Real-time Farm Map Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            To display the real-time map, please enter your Mapbox public token. 
            Get one at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Enter Mapbox public token (pk.xxx)"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              type="password"
            />
            <Button onClick={handleTokenSubmit} disabled={!mapboxToken.trim()}>
              Initialize Map
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            🗺️ Real-time Farm Map — Robot Tracker
          </CardTitle>
          <div className="flex items-center gap-2">
            {userLocation && (
              <Badge variant="outline" className="text-xs">
                <MapPin className="h-3 w-3 mr-1" />
                {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
              </Badge>
            )}
            <Button 
              size="sm" 
              variant="outline" 
              onClick={getUserLocation}
              disabled={isTracking}
              className="gap-2"
            >
              <Locate className="h-4 w-4" />
              {isTracking ? 'Locating...' : 'Update Location'}
            </Button>
          </div>
        </div>
        {locationError && (
          <div className="flex items-center gap-2 text-sm text-destructive mt-2">
            <AlertCircle className="h-4 w-4" />
            {locationError}
          </div>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative w-full h-96 overflow-hidden rounded-b-lg">
          <div ref={mapContainer} className="absolute inset-0" />
          
          {!userLocation && !locationError && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/50 backdrop-blur-sm">
              <div className="text-center space-y-2">
                <Locate className="h-8 w-8 mx-auto text-muted-foreground animate-pulse" />
                <p className="text-sm text-muted-foreground">Getting your location...</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}