'use client';
import { CamerasInfo } from '@/app/page';
import { useEffect, useMemo, useState } from 'react';

interface Props {
  videoPath: string;
  cameraInfo?: CamerasInfo;
}

const jamLevelsColor = {
  1: '#108dbe',
  2: '#adad00',
  3: '#f09116',
  4: '#ec5858',
};
const CameraDetails: React.FC<Props> = ({ videoPath, cameraInfo }) => {
  const [currentVehiclesCount, setCurrentVehiclesCount] = useState(
    cameraInfo?.number_vehicles[0]
  );

  const [currentInstruction, setCurrentInstruction] = useState(
    cameraInfo?.advice[0]
  );
  const [currentDensityLevel, setCurrentDensityLevel] = useState(
    cameraInfo?.densityLevel[0][0]
  );
  const [currentDensityLevelDescription, setCurrentDensityLevelDescription] =
    useState(cameraInfo?.densityLevel[0][1]);

  const [currentVehiclesCountIndex, setCurrentVehiclesCountIndex] = useState(0);

  useEffect(() => {
    if (cameraInfo?.number_vehicles) {
      const interval = setInterval(() => {
        setCurrentVehiclesCountIndex((prev) => prev + 1);
        setCurrentVehiclesCount(
          cameraInfo?.number_vehicles[currentVehiclesCountIndex]
        );
        setCurrentInstruction(cameraInfo?.advice[currentVehiclesCountIndex]);
        setCurrentDensityLevel(
          cameraInfo?.densityLevel[currentVehiclesCountIndex][0]
        );
        setCurrentDensityLevelDescription(
          cameraInfo?.densityLevel[currentVehiclesCountIndex][1]
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
          className="rounded-md w-full h-[20rem] p-2 "
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

      <div className="flex gap-5 p-5">
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
                  jamLevelsColor[
                    currentDensityLevel as keyof typeof jamLevelsColor
                  ],
              }}
            >
              {currentDensityLevelDescription}
            </div>
          </div>
          <div className="flex gap-3">
            <div className="font-bold">Instrução:</div>
            <div>
              {currentInstruction
                ? currentInstruction
                : cameraInfo?.advice[cameraInfo?.advice.length - 1]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraDetails;
