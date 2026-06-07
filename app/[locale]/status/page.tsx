import Map from "@/components/map";
import StatusCard from '../../components/status-card';

export default function Page () {
    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-semibold mb-4 text-gray-800">Live Map</h1>
            <div className="h-[500px]">
                <Map />
                <StatusCard />
            </div>
        </div>
    );
};