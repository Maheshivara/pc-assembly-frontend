"use client";
import { useState } from "react";
import { WizardProgressBar, WizardStep } from "../WizardProgressBar";

export function AssemblyWizard() {
  const [currentStep, setCurrentStep] = useState<WizardStep>(WizardStep.CPU);
  const nextStep = (step: WizardStep) => {
    if (step < WizardStep.STORAGE) {
      setCurrentStep(step + 1);
    }
  };
  const prevStep = (step: WizardStep) => {
    if (step > WizardStep.CPU) {
      setCurrentStep(step - 1);
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto">
      <WizardProgressBar currentStep={currentStep} />
      <div className="flex justify-end mt-8 gap-4">
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
          disabled={currentStep === WizardStep.STORAGE}
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
