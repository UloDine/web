"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useToast } from "./ToastContext";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org";
const EARTH_RADIUS_KM = 6371;

const GeoLocationContext = createContext<GeoLocationContextType | undefined>(
  undefined,
);

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

function calculateHaversineDistanceInKm(
  from: GeoCoordinates,
  to: GeoCoordinates,
) {
  const latDiff = toRadians(to.latitude - from.latitude);
  const lonDiff = toRadians(to.longitude - from.longitude);

  const fromLat = toRadians(from.latitude);
  const toLat = toRadians(to.latitude);

  const haversine =
    Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
    Math.cos(fromLat) *
      Math.cos(toLat) *
      Math.sin(lonDiff / 2) *
      Math.sin(lonDiff / 2);

  const arc = 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
  return EARTH_RADIUS_KM * arc;
}

export function GeoLocationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { showToast } = useToast();
  const [coordinates, setCoordinates] = useState<GeoCoordinates | null>(null);
  const [readableAddress, setReadableAddress] = useState("");
  const [permissionState, setPermissionState] =
    useState<GeoPermissionState>("idle");
  const [loading, setLoading] = useState(false);
  const deniedToastShownRef = useRef(false);

  const showDeniedToast = () => {
    if (deniedToastShownRef.current) {
      return;
    }

    showToast(
      "Please allow location access for the best app experience.",
      "warning",
    );
    deniedToastShownRef.current = true;
  };

  const reverseGeocode = async (latitude: number, longitude: number) => {
    try {
      const params = new URLSearchParams({
        lat: latitude.toString(),
        lon: longitude.toString(),
        format: "jsonv2",
      });

      const response = await fetch(
        `${NOMINATIM_BASE_URL}/reverse?${params.toString()}`,
        {
          headers: {
            Accept: "application/json",
          },
        },
      );

      if (!response.ok) {
        return null;
      }

      const result = (await response.json()) as { display_name?: string };
      const address = result.display_name?.trim() ?? "";

      if (address) {
        setReadableAddress(address);
        return address;
      }

      return null;
    } catch {
      return null;
    }
  };

  const requestCurrentLocation = async () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setPermissionState("unsupported");
      return null;
    }

    setLoading(true);

    return new Promise<GeoCoordinates | null>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const nextCoordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          setCoordinates(nextCoordinates);
          setPermissionState("granted");
          deniedToastShownRef.current = false;

          await reverseGeocode(
            nextCoordinates.latitude,
            nextCoordinates.longitude,
          );

          setLoading(false);
          resolve(nextCoordinates);
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            setPermissionState("denied");
            showDeniedToast();
          } else {
            setPermissionState("error");
          }

          setLoading(false);
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000,
        },
      );
    });
  };

  const geocodeAddress = async (address: string) => {
    const trimmedAddress = address.trim();

    if (!trimmedAddress) {
      return null;
    }

    try {
      const params = new URLSearchParams({
        q: trimmedAddress,
        format: "jsonv2",
        limit: "1",
      });

      const response = await fetch(
        `${NOMINATIM_BASE_URL}/search?${params.toString()}`,
        {
          headers: {
            Accept: "application/json",
          },
        },
      );

      if (!response.ok) {
        return null;
      }

      const results = (await response.json()) as Array<{
        lat: string;
        lon: string;
      }>;

      if (!results.length) {
        return null;
      }

      return {
        latitude: Number.parseFloat(results[0].lat),
        longitude: Number.parseFloat(results[0].lon),
      };
    } catch {
      return null;
    }
  };

  const calculateDistanceToAddress = async (address: string) => {
    const currentCoordinates = coordinates ?? (await requestCurrentLocation());

    if (!currentCoordinates) {
      return null;
    }

    const destinationCoordinates = await geocodeAddress(address);

    if (!destinationCoordinates) {
      return null;
    }

    return calculateHaversineDistanceInKm(
      currentCoordinates,
      destinationCoordinates,
    );
  };

  useEffect(() => {
    requestCurrentLocation();
  }, []);

  return (
    <GeoLocationContext.Provider
      value={{
        coordinates,
        readableAddress,
        permissionState,
        loading,
        requestCurrentLocation,
        reverseGeocode,
        geocodeAddress,
        calculateDistanceToAddress,
      }}
    >
      {children}
    </GeoLocationContext.Provider>
  );
}

export function useGeoLocation() {
  const context = useContext(GeoLocationContext);

  if (!context) {
    throw new Error("useGeoLocation must be used within a GeoLocationProvider");
  }

  return context;
}
