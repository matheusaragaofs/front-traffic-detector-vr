'use client';
const path = require('path');

import { CamerasInfo } from '@/app/page';
import { useEffect, useMemo, useState } from 'react';
import ReactPlayer from 'react-player';

type TrafficLightStatus = 'red' | 'yellow' | 'green';
type CongestionLevel = 'Alto' | 'Médio' | 'Baixo';
interface Props {
  videoPath: string;
  cameraInfo?: CamerasInfo;
}
const CameraDetails: React.FC<Props> = ({ videoPath, cameraInfo }) => {
  const mockedData = {
    congestionLevel: 'Alto',
    greenTime: 10,
    redTime: 10,
    currentTrafficLightStatus: 'red',
  };
  const { congestionLevel, greenTime, redTime, currentTrafficLightStatus } =
    mockedData;

  const [currentVehiclesCount, setCurrentVehiclesCount] = useState(
    cameraInfo?.number_vehicles[0]
  );

  const [currentVehiclesCountIndex, setCurrentVehiclesCountIndex] = useState(0);

  useEffect(() => {
    if (cameraInfo?.number_vehicles) {
      const interval = setInterval(() => {
        setCurrentVehiclesCountIndex((prev) => prev + 1);
        setCurrentVehiclesCount(
          cameraInfo?.number_vehicles[currentVehiclesCountIndex]
        );

        if (
          currentVehiclesCountIndex ===
          cameraInfo?.number_vehicles.length - 1
        ) {
          setCurrentVehiclesCountIndex(0);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [cameraInfo?.number_vehicles, currentVehiclesCountIndex]);

  const CameraVideo = useMemo(
    () =>
      cameraInfo?.number_vehicles && (
        <video
          className="rounded-md w-full"
          loop
          autoPlay
          muted
          key={`${videoPath}`}
        >
          <source src={videoPath} type="video/mp4" />
        </video>
      ),
    [videoPath]
  );
  return (
    <div className="w-[35rem] border bg-white rounded-lg flex flex-col gap-3">
      <div className="rounded-md flex items-center justify-center">
        {CameraVideo}
      </div>

      <div className="flex items-center justify-center flex-col gap-1">
        <div className="text-sm">Câmera: {cameraInfo?.camera}</div>
        <div>{cameraInfo?.name}</div>
      </div>

      <div className="flex gap-5">
        <div className="flex gap-2 flex-col bg-slate-600 p-3 rounded-3xl">
          <div
            style={{
              backgroundColor:
                currentTrafficLightStatus === 'red' ? '#ff5b5b' : '#a4a4a4',
            }}
            className="h-5 w-5 rounded-full"
          ></div>
          <div
            style={{
              backgroundColor:
                currentTrafficLightStatus === 'yellow' ? '#fde52f' : '#a4a4a4',
            }}
            className="h-5 w-5 rounded-full"
          ></div>
          <div
            style={{
              backgroundColor:
                currentTrafficLightStatus === 'green' ? '#41fd2f' : '#a4a4a4',
            }}
            className="h-5 w-5 rounded-full"
          ></div>
        </div>
        <div>
          <div className="flex gap-3">
            <div className="font-bold">Volume:</div>
            <div>{currentVehiclesCount}</div>
          </div>
          <div className="flex gap-3">
            <div className="font-bold">Nivel de congestionamento:</div>
            <div
              className="font-bold"
              style={{
                color:
                  congestionLevel === 'Alto'
                    ? '#ec5858'
                    : congestionLevel === 'Médio'
                    ? '#adad00'
                    : '#108dbe',
              }}
            >
              -
              {/* {congestionLevel} */}
            </div>
          </div>
          <div className="flex gap-3">
            <div className="font-bold">Tempo Verde:</div>
            {/* <div>{greenTime} segundos </div> */}
            <div>-</div>
          </div>
          <div className="flex gap-3">
            <div className="font-bold">Tempo vermelho:</div>
            {/* <div>{redTime} segundos </div> */}
            <div>-</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraDetails;
