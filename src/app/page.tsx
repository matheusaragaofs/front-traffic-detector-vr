import CameraDetails from '@/components/CameraDetails';

export default function Home() {
  return (
    <main className="bg-slate-800 flex min-h-screen flex-col items-center gap-10 p-24">
      <div className="flex flex-col gap-5">
        <div className="text-white font-bold text-3xl text-left">Dashboard</div>
        <div className="flex gap-10">
          <CameraDetails
            currentTrafficLightStatus='green'
            cameraId="1111111"
            street="Rua 1"
            volume={100}
            congestionLevel="Alto"
            greenTime={30}
            redTime={10}
          />
          <CameraDetails
            currentTrafficLightStatus='red'
            cameraId="2222222"
            street="Rua 2"
            volume={200}
            congestionLevel="Médio"
            greenTime={20}
            redTime={5}
          />
        </div>
      </div>
    </main>
  );
}
