"use client";
import { useState } from "react";
import { WizardProgressBar, WizardStep } from "../WizardProgressBar";
import { CPUChooser } from "../CPUChooser";
import { Configuration } from "@/types/domain/configuration";
import { CoolerChooser } from "../CoolerChooser";

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
    <div className="max-w-[1000px] mx-auto">
      <WizardProgressBar currentStep={currentStep} />
      <div className="p-4 rounded-lg shadow-md">{chooser}</div>
      <div className="flex justify-end mt-8 gap-4 mb-4">
        <button
          onClick={() => prevStep(currentStep)}
          disabled={currentStep === WizardStep.CPU}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "var(--button-back-hover)";
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
        <button
          onClick={() => nextStep(currentStep)}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "var(--button-next-hover)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "var(--button-next)";
          }}
          disabled={currentStep === WizardStep.END || !setCanGoNext}
          className="px-4 py-2  rounded"
          style={{
            backgroundColor: "var(--button-next)",
            color: "white",
          }}
        >
          Avançar
        </button>
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
    default:
      return <div>Step not implemented</div>;
  }
}
