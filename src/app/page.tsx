import { AssemblyButton } from "@/components/AssemblyButton";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen">
        <div>
          <h1 className="text-4xl font-bold">Bem Vindo ao PC Assembly</h1>
        </div>
        <AssemblyButton />
      </div>
    </div>
  );
}
