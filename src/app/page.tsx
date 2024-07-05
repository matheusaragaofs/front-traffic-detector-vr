import CameraDetails from '@/components/CameraDetails';

export default function Home() {
  return (
    <main className="bg-violet-950 flex min-h-screen flex-col items-center gap-10 p-24">
      <div className="flex gap-10">
        <CameraDetails
          cameraId="1111111"
          street="Rua 1"
          volume={100}
          congestionLevel="Alto"
          greenTime={30}
          redTime={10}
        />
        <CameraDetails
          cameraId="2222222"
          street="Rua 2"
          volume={200}
          congestionLevel="Baixo"
          greenTime={20}
          redTime={5}
        />
      </div>
    </main>
  );
}
