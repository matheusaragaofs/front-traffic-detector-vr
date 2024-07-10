'use client';

import { useState } from 'react';

interface Props {
  cameraId: string;
  street: string;
  volume: number;
  congestionLevel: string;
  greenTime: number;
  redTime: number;
}

type TrafficLightStatus = 'red' | 'yellow' | 'green';

const CameraDetails: React.FC<Props> = ({
  cameraId,
  congestionLevel,
  greenTime,
  redTime,
  street,
  volume,
}) => {
  const [currentTrafficLightStatus, setCurrentTrafficLightStatus] =
    useState<TrafficLightStatus>('red');

  return (
    <div className="w-96 border border-black bg-white  p-5 rounded-lg flex flex-col gap-3">
      <div className="border border-black  h-48 rounded-md flex items-center justify-center">
        Video aqui
      </div>

      <div className="flex items-center justify-center flex-col gap-1">
        <div className="text-sm">Câmera: {cameraId}</div>
        <div>{street}</div>
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
            <div>{volume}</div>
          </div>
          <div className="flex gap-3">
            <div className="font-bold">Nivel de congestionamento:</div>
            <div>{congestionLevel}</div>
          </div>
          <div className="flex gap-3">
            <div className="font-bold">Tempo Verde:</div>
            <div>{greenTime} segundos </div>
          </div>
          <div className="flex gap-3">
            <div className="font-bold">Tempo vermelho:</div>
            <div>{redTime} segundos </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraDetails;
