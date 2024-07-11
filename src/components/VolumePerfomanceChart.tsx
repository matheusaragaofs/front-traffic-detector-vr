'use client';
import ReactSpeedometer from 'react-d3-speedometer';

export function VolumePerfomanceChart() {
  return (
    <div className="bg-white flex flex-col text-left items-center justify-center align-middle  w-[30rem] rounded-md">
      <div className="text-left w-full px-5 font-bold mb-3">
        Desempenho geral
      </div>
      <ReactSpeedometer
        minValue={100}
        maxValue={500}
        value={473}
        height={210}
      />
    </div>
  );
}
