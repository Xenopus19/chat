import api from "@/api";

interface HealthResponse {
    status: string;
    service: string;
    timestamp: string;
}

export const checkHealth = async () => {
    const response = await api.get<HealthResponse>('/health');
    return response.data;
}
