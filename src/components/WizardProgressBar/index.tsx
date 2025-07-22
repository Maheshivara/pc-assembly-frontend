import Image from "next/image";

export interface WizardProgressBarProps {
  currentStep: WizardStep;
}

export enum WizardStep {
  CPU = 1,
  CPU_FAN = 2,
  GPU = 3,
  MOTHERBOARD = 4,
  PSU = 5,
  RAM = 6,
  STORAGE = 7,
  END = 8,
}

export function WizardProgressBar({ currentStep }: WizardProgressBarProps) {
  const steps = [
    { key: WizardStep.CPU, label: "CPU", color: "var(--cpu)" },
    { key: WizardStep.CPU_FAN, label: "CPU FAN", color: "var(--cooling)" },
    { key: WizardStep.GPU, label: "GPU", color: "var(--gpu)" },
    {
      key: WizardStep.MOTHERBOARD,
      label: "Placa Mãe",
      color: "var(--motherboard)",
    },
    { key: WizardStep.PSU, label: "Fonte", color: "var(--psu)" },
    { key: WizardStep.RAM, label: "RAM", color: "var(--ram)" },
    {
      key: WizardStep.STORAGE,
      label: "Armazenamento",
      color: "var(--storage)",
    },
    { key: WizardStep.END, label: "Fim", color: "var(--end)" },
  ];

  return (
    <div className="w-full my-18">
      <div className="flex justify-center relative mb-8">
        {steps.map((step) => (
          <div key={step.key} className="relative flex-1 text-center">
            {currentStep === step.key && (
              <div className="absolute left-1/2 -top-10 -translate-x-1/2">
                <Image
                  src="/down_arrow.svg"
                  alt="Current Step Indicator"
                  width={32}
                  height={32}
                  className="block mx-1"
                />
              </div>
            )}
            <div
              className={`rounded-lg py-4 font-bold text-white text-base mx-1 transition-shadow ${
                currentStep === step.key ? "shadow-[0_0_0_4px_#10b98155]" : ""
              }`}
              style={{ background: step.color }}
            >
              {step.label}
            </div>
          </div>
        ))}
      </div>
      <div className="h-[6px] w-full bg-gray-200 rounded-md relative">
        <div
          className="absolute left-0 top-0 h-full rounded-md transition-all"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            background: "#10b981",
          }}
        />
      </div>
    </div>
  );
}
