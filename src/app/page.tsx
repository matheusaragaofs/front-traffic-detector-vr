'use client';
import CameraDetails from '@/components/CameraDetails';
import { TrafficLightTable } from '@/components/TrafficLightTable';
import { VolumePerfomanceChart } from '@/components/VolumePerfomanceChart';
import { useEffect, useMemo, useState } from 'react';
import path from 'path';
import { addAttributesToJson } from '@/utils';

export interface CamerasInfo {
  camera: string;
  name: string;
  number_vehicles: number[];
  averageVolume: number[];
  densityLevel: [number, string][];
  advice: string[];
  path: string;
  processed_video_path: string;
  url: string;
}
export interface ExampleJson {
  [key: number]: CamerasInfo[];
}

export default function Home() {
  const [currentCamerasId, setCurrentCamerasId] = useState(1);
  const [camerasInfo, setCamerasInfo] = useState<CamerasInfo[] | null>(null);

  useEffect(() => {
    const loadInfo = async () => {
      try {
        const response = await fetch(`/data/info/${currentCamerasId}.json`);
        const data = await response.json();
        const formattedData =
          data && addAttributesToJson(data as ExampleJson, currentCamerasId);

        setCamerasInfo(formattedData[currentCamerasId]);
      } catch (error) {
        setCamerasInfo(null);
      }
    };

    loadInfo();
  }, [currentCamerasId]);
  const FirstCamera = useMemo(() => {
    const pathFirstCamera = path.join(
      'data',
      'cameras',
      String(currentCamerasId),
      `${currentCamerasId}_1.mp4`
    );
    return (
      <CameraDetails
        videoPath={pathFirstCamera}
        cameraInfo={camerasInfo ? camerasInfo[0] : undefined}
      />
    );
  }, [camerasInfo, currentCamerasId]);

  const SecondCamera = useMemo(() => {
    const pathSecondCamera = path.join(
      'data',
      'cameras',
      String(currentCamerasId),
      `${currentCamerasId}_2.mp4`
    );
    return (
      <CameraDetails
        videoPath={pathSecondCamera}
        cameraInfo={camerasInfo ? camerasInfo[1] : undefined}
      />
    );
  }, [camerasInfo, currentCamerasId]);

  return (
    <main className="bg-slate-800 flex min-h-screen flex-col items-center gap-10 p-6">
      <div className="flex flex-col gap-5">
        <div className="text-white font-bold text-3xl text-left">Dashboard</div>

        {camerasInfo ? (
          <div className="flex gap-10">
            {FirstCamera}
            {SecondCamera}
          </div>
        ) : (
          <div className="h-[32] bg-slate-500 text-white">
            Id: {currentCamerasId} Não encontrado
          </div>
        )}

        <div className="flex gap-10">
          <TrafficLightTable
            setCurrentCamerasId={setCurrentCamerasId}
            currentCamerasId={currentCamerasId}
          />
          <VolumePerfomanceChart
            numberOfVehiclesCamera1={camerasInfo ? camerasInfo[0].number_vehicles : undefined}
            numberOfVehiclesCamera2={camerasInfo ? camerasInfo[1].number_vehicles : undefined}
          />
        </div>
      </div>
    </main>
  );
}
