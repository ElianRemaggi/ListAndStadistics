import api from "@/api/api";
import { pathProvider } from "@/helper/pathProvider";
import { useNotificadorService } from "@/helper/notificadorService";

interface backResponse {
    data: ResultadoPeriodo[];
    message: string;
    status: number;
}

const getPacientesMensuales = async (mesD: string, mesH: string): Promise<ResultadoPeriodo[]> => {

    try {
        const { data } = await api.post<backResponse>(
            pathProvider.getPathMensuales(),
            { mesanioD: mesD, mesanioH: mesH }
        )
        return data.data;
    } catch (error) {
        useNotificadorService().errorSistema("Error al obtener totales. " + error + ".");
        return [] as ResultadoPeriodo[];
    }
};

export default getPacientesMensuales

