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
import { ConfigAbstract } from "../ConfigAbstract";
import { useSession } from "next-auth/react";
import { SaveConfigDialog } from "../SaveConfigDialog";

export interface AssemblyWizardProps {
  initialConfig?: Configuration;
}

export function AssemblyWizard({ initialConfig }: AssemblyWizardProps) {
  const [currentStep, setCurrentStep] = useState<WizardStep>(WizardStep.CPU);
  const [canGoNext, setCanGoNext] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;
  const [config, setConfig] = useState<Configuration | null>(
    initialConfig || null
  );
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
        {currentStep === WizardStep.END && accessToken && (
          <button
            onClick={() => setIsModalOpen(true)}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor =
                "var(--button-next-hover)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "var(--button-next)";
            }}
            className="px-4 py-2 rounded"
            style={{
              backgroundColor: "var(--button-next)",
              color: "white",
            }}
          >
            Salvar
          </button>
        )}
        {currentStep === WizardStep.END && (
          <button
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
            style={{
              backgroundColor: "var(--button-login)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor =
                "var(--button-login-hover)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "var(--button-login)";
            }}
            onClick={() => {
              setConfig(null);
              setCurrentStep(WizardStep.CPU);
              setChooser(
                handleChooserChange(
                  WizardStep.CPU,
                  setCanGoNext,
                  null,
                  setConfig
                )
              );
              window.location.href = "/";
            }}
          >
            Voltar ao início
          </button>
        )}
      </div>
      <SaveConfigDialog
        isOpen={isModalOpen}
        onClose={handleModalClose}
        config={config}
      />
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
    case WizardStep.END:
      return <ConfigAbstract config={config} />;
    default:
      return <div>Step not implemented</div>;
  }
}
