import api from "@/api/api";
import { pathProvider } from "@/helper/pathProvider";
import { useNotificadorService } from "@/helper/notificadorService";

const getTotalesDiarias = async (fechaD: string, fechaH: string): Promise<backResponse> => {
    try {
        const { data } = await api.post<backResponse>(
            pathProvider.getPathDiarios(),
            { fechaD, fechaH }
        );
        return data as backResponse;
    } catch (error) {
        useNotificadorService().errorSistema("Error al obtener totales. " + error + ".");
        return {} as backResponse;
    }
};

export default getTotalesDiarias;