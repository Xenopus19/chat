import { checkHealth } from "@/services/healthService";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";

interface BackendHealthCheckProps {
  children: React.ReactNode;
}

const formatElapsed = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const BackendHealthCheck = ({ children }: BackendHealthCheckProps) => {
  const [isBackendReady, setBackendStatus] = useState<boolean>(false);
  const [showStartUI, setShowStartUI] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  useEffect(() => {
    const uiTimeout = setTimeout(() => {
      setShowStartUI(true);
    }, 1000); 

    const checkBackendHealth = async () => {
        if(isBackendReady) return;
      try {
        const response = await checkHealth();
        if (response.status === "ok") {
          setBackendStatus(true);
          setShowStartUI(false);
          clearTimeout(uiTimeout);
          clearInterval(backendHealthCheckInterval);
        }
      } catch (error) {
        setBackendStatus(false);
        setShowStartUI(true);
      }
    };
    checkBackendHealth(); 
    const backendHealthCheckInterval = setInterval(() => {
        checkBackendHealth();
    }, 2000);

    return () => {
      clearInterval(backendHealthCheckInterval);
      clearTimeout(uiTimeout);
    };
  }, []);

  useEffect(() => {
    if (isBackendReady || !showStartUI) return;

    const startedAt = Date.now();
    const timer = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startedAt) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [showStartUI, isBackendReady]);

  if(!isBackendReady && showStartUI) {
    return (
      <div className="flex items-center justify-center h-screen bg-linear-to-br from-background via-background to-emerald-500/10 px-4">
        <div className="flex flex-col items-center gap-6 rounded-2xl bg-card px-10 py-12 text-center shadow-xl ring-1 ring-emerald-500/20">
          <Spinner />
          <div className="space-y-1.5">
            <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">The server is waking up...</p>
            <p className="text-sm text-muted-foreground">
              This can take about 30 seconds. Thank you for your patience. 
            </p>
          </div>
          <div className="rounded-full bg-emerald-500/10 px-4 py-1.5 font-mono text-sm tabular-nums text-emerald-600 dark:text-emerald-400">
            {formatElapsed(elapsedSeconds)}
          </div>
        </div>
      </div>
    );
  }
  return <>{children}</>;
};

export default BackendHealthCheck;
