'use client';
import { useEffect, useState } from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import _ from 'lodash';
interface Props {
  numberOfVehiclesCamera1?: number[];
  numberOfVehiclesCamera2?: number[];
}
export function VolumePerfomanceChart({
  numberOfVehiclesCamera1,
  numberOfVehiclesCamera2,
}: Props) {
  let zippedArrays = _.zip(numberOfVehiclesCamera1, numberOfVehiclesCamera2);
  let sumArray = _.map(zippedArrays, (arr: number[]) => _.sum(arr));

  const [currentVehiclesCount, setCurrentVehiclesCount] = useState(sumArray[0]);
  const [currentVehiclesCountIndex, setCurrentVehiclesCountIndex] = useState(0);
  useEffect(() => {
    if (numberOfVehiclesCamera1 && numberOfVehiclesCamera2) {
      const interval = setInterval(() => {
        setCurrentVehiclesCountIndex((prev) => prev + 1);
        setCurrentVehiclesCount(sumArray[currentVehiclesCountIndex] as any);

        if (currentVehiclesCountIndex === sumArray.length - 1) {
          setCurrentVehiclesCountIndex(0);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [
    numberOfVehiclesCamera1,
    numberOfVehiclesCamera2,
    currentVehiclesCountIndex,
  ]);
  console.log('currentVehiclesCount:', currentVehiclesCount);
  return (
    <div className="bg-white flex flex-col text-left items-center justify-center align-middle  w-[30rem] rounded-md">
      <div className="text-left w-full px-5 font-bold mb-3">
        Desempenho geral
      </div>
      <ReactSpeedometer
        minValue={0}
        key={`${JSON.stringify(numberOfVehiclesCamera1, numberOfVehiclesCamera2)}`}
        segmentColors={['#37b2e2', '#24c024', '#FFFF00', '#FFA500', '#dd5454']}
        maxValue={50}
        value={currentVehiclesCount as any}
        height={210}
      />
    </div>
  );
}
