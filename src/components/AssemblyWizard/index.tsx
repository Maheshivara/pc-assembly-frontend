"use client";
import { useState } from "react";
import { WizardProgressBar, WizardStep } from "../WizardProgressBar";
import { CPUChooser } from "../CPUChooser";
import { Configuration } from "@/types/domain/configuration";
import { CoolerChooser } from "../CoolerChooser";
import { GPUChooser } from "../GPUChooser";
import { MoBoChooser } from "../MoBoChooser";
import { PSUChooser } from "../PSUChooser";
import { RAMChooser } from "../RAMChooser";
import { StorageChooser } from "../StorageChooser";

export function AssemblyWizard() {
  const [currentStep, setCurrentStep] = useState<WizardStep>(WizardStep.CPU);
  const [canGoNext, setCanGoNext] = useState<boolean>(false);
  const [config, setConfig] = useState<Configuration | null>(null);
  const nextStep = (step: WizardStep) => {
    if (step < WizardStep.END && canGoNext) {
      setCurrentStep(step + 1);
      setChooser(
        handleChooserChange(step + 1, setCanGoNext, config, setConfig)
      );
      setCanGoNext(false);
    }
  };
  const prevStep = (step: WizardStep) => {
    if (step > WizardStep.CPU) {
      setCurrentStep(step - 1);
      setChooser(
        handleChooserChange(step - 1, setCanGoNext, config, setConfig)
      );
    }
  };
  const [chooser, setChooser] = useState(
    <CPUChooser
      setCanGoNext={setCanGoNext}
      setConfig={setConfig}
      config={config}
    />
  );
  return (
    <div className="max-w-[1100px] mx-auto">
      <WizardProgressBar currentStep={currentStep} />
      <div className="rounded-lg shadow-md">{chooser}</div>
      <div className="flex justify-end mt-3 gap-4 mb-4">
        {currentStep !== WizardStep.CPU && (
          <button
            onClick={() => prevStep(currentStep)}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor =
                "var(--button-back-hover)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "var(--button-back)";
            }}
            className="px-4 py-2 rounded"
            style={{
              backgroundColor: "var(--button-back)",
              color: "white",
            }}
          >
            Voltar
          </button>
        )}
        {currentStep !== WizardStep.END && (
          <button
            onClick={() => nextStep(currentStep)}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor =
                "var(--button-next-hover)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "var(--button-next)";
            }}
            disabled={!canGoNext}
            className="px-4 py-2  rounded"
            style={{
              backgroundColor: "var(--button-next)",
              color: "white",
            }}
          >
            Avançar
          </button>
        )}
      </div>
    </div>
  );
}

function handleChooserChange(
  step: WizardStep,
  setCanGoNext: (canGo: boolean) => void,
  config: Configuration | null,
  setConfig: (config: Configuration) => void
) {
  switch (step) {
    case WizardStep.CPU:
      return (
        <CPUChooser
          setCanGoNext={setCanGoNext}
          config={config}
          setConfig={setConfig}
        />
      );
    case WizardStep.CPU_FAN:
      return (
        <CoolerChooser
          setCanGoNext={setCanGoNext}
          config={config}
          setConfig={setConfig}
        />
      );
    case WizardStep.GPU:
      return (
        <GPUChooser
          setCanGoNext={setCanGoNext}
          config={config}
          setConfig={setConfig}
        />
      );
    case WizardStep.MOTHERBOARD:
      return (
        <MoBoChooser
          setCanGoNext={setCanGoNext}
          config={config}
          setConfig={setConfig}
        />
      );
    case WizardStep.PSU:
      return (
        <PSUChooser
          setCanGoNext={setCanGoNext}
          config={config}
          setConfig={setConfig}
        />
      );
    case WizardStep.RAM:
      return (
        <RAMChooser
          setCanGoNext={setCanGoNext}
          config={config}
          setConfig={setConfig}
        />
      );
    case WizardStep.STORAGE:
      return (
        <StorageChooser
          setCanGoNext={setCanGoNext}
          config={config}
          setConfig={setConfig}
        />
      );
    default:
      return <div>Step not implemented</div>;
  }
}
