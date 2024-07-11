'use client';

import { useState } from 'react';

type TrafficLightStatus = 'red' | 'yellow' | 'green';
type CongestionLevel = 'Alto' | 'Médio' | 'Baixo';
interface Props {
  cameraId: string;
  street: string;
  volume: number;
  congestionLevel: CongestionLevel;
  greenTime: number;
  redTime: number;
  currentTrafficLightStatus: TrafficLightStatus;
}

const CameraDetails: React.FC<Props> = ({
  currentTrafficLightStatus,
  cameraId,
  congestionLevel,
  greenTime,
  redTime,
  street,
  volume,
}) => {
  return (
    <div className="w-[35rem] border border-black bg-white  p-5 rounded-lg flex flex-col gap-3">
      <div className="border rounded-md flex items-center justify-center">
        <video className="rounded-md" loop autoPlay muted>
          <source src="/videos/traffic-video.mp4" type="video/mp4" />
        </video>
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
              {congestionLevel}
            </div>
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
