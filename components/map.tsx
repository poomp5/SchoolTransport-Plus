"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Image from "next/image";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

const Map = () => {
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [busLocation] = useState<[number, number] | null>([13.7330125, 100.3702514]);
    const [leaflet, setLeaflet] = useState<typeof import("leaflet") | null>(null);

    useEffect(() => {
        import("leaflet").then((L) => {
            setLeaflet(L); 
        });

     
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setUserLocation([position.coords.latitude, position.coords.longitude]);
            });
        }
    }, []);

    if (!leaflet) return null;

    const userIcon = leaflet.icon({ iconUrl: "/mylocation.png", iconSize: [50, 50] });
    const busIcon = leaflet.icon({ iconUrl: "/bus.png", iconSize: [50, 50] });

    return (
        <div className="relative w-full h-full">
            <MapContainer center={[13.7330125, 100.3702514]} zoom={15} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true} className="rounded-2xl">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="ACT PITCHING DAY 2025 | &copy openstreetmap.org"
                />
                {userLocation && (
                    <Marker position={userLocation} icon={userIcon}>
                        <Popup>
                            <div className="flex items-center">
                                <Image src={"/mylocation.png"} alt="ตำแหน่งผู้ใช้" className="w-6 h-6 mr-2" width={30} height={30} />
                                <span className="kanit">ตำแหน่งของฉัน</span>
                            </div>
                        </Popup>
                    </Marker>
                )}
                {busLocation && (
                    <Marker position={busLocation} icon={busIcon}>
                        <Popup>
                            <div className="flex items-center">
                                <Image src={"/bus.png"} width={30} height={30} alt="ตำแหน่งรถ" />
                                <span className="kanit">ตำแหน่งรถ</span>
                            </div>
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
};

export default Map;
