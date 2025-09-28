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
    if (!mapContainer.current || !mapboxToken) {
      console.log('Map initialization failed:', { container: !!mapContainer.current, token: !!mapboxToken });
      return;
    }

    console.log('Initializing map with token...');
    mapboxgl.accessToken = mapboxToken;
    
    try {
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

      map.current.on('load', () => {
        console.log('Map loaded successfully');
        getUserLocation();
      });

      map.current.on('error', (e) => {
        console.error('Map error:', e);
        setLocationError('Map failed to load. Please check your Mapbox token.');
      });

    } catch (error) {
      console.error('Map initialization error:', error);
      setLocationError('Failed to initialize map. Please check your Mapbox token.');
    }
  };

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser.');
      return;
    }

    // Check if location permission is already granted
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((permission) => {
        if (permission.state === 'denied') {
          setLocationError('Location access denied. Please enable location permissions in your browser settings.');
          return;
        }
      });
    }

    setIsTracking(true);
    setLocationError('');
    
    const options = {
      enableHighAccuracy: true,
      timeout: 15000, // Increased timeout to 15 seconds
      maximumAge: 300000 // 5 minutes
    };

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
        let errorMessage = '';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please allow location access and refresh the page.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable. Please check your GPS/location services.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out. Please try again or check your connection.';
            break;
          default:
            errorMessage = `Location error: ${error.message}`;
            break;
        }
        setLocationError(errorMessage);
        setIsTracking(false);
        console.error('Geolocation error:', error);
      },
      options
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
          
          {!userLocation && !locationError && isTracking && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/50 backdrop-blur-sm">
              <div className="text-center space-y-3">
                <Locate className="h-8 w-8 mx-auto text-muted-foreground animate-pulse" />
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Getting your location...</p>
                  <p className="text-xs text-muted-foreground">Make sure to allow location access</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setIsTracking(false);
                    setLocationError('Location request cancelled');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
          
          {!userLocation && locationError && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/50 backdrop-blur-sm">
              <div className="text-center space-y-3 p-4">
                <AlertCircle className="h-8 w-8 mx-auto text-destructive" />
                <div className="space-y-1">
                  <p className="text-sm text-destructive font-medium">Location Access Issue</p>
                  <p className="text-xs text-muted-foreground max-w-sm">{locationError}</p>
                </div>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={getUserLocation}
                  className="gap-2"
                >
                  <Locate className="h-4 w-4" />
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}