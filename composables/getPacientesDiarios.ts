import api from "@/api/api";
import { pathProvider } from "@/helper/pathProvider";
import { useNotificadorService } from "@/helper/notificadorService";

const getTotalesDiarias = async (fechaD: string, fechaH: string): Promise<backResponse> => {
    try {
        //Si fuer a buscar al backend
        /*
        const { data } = await api.post<backResponse>(
            pathProvider.getPathDiarios(),
            { fechaD, fechaH }
        );
        */
        //Simulación de datos
        let cantidadDias = countDaysInclusive(fechaD, fechaH)

        const data = { data: [] as ResultadoPeriodo[],
            dataOS: [] as ResultadoCobertura[]
        };

        for (let i = 0; i < cantidadDias; i++) {
            const fecha = new Date(fechaD);
            fecha.setDate(fecha.getDate() + i);
            const fechaStr = fecha.toISOString().split('T')[0];
            let pacientesCentral = Math.floor(Math.random() * 100);
            let pacientesGascon = Math.floor(Math.random() * 100);
            let total = pacientesCentral + pacientesGascon;
            let mesanio = '';
            if (fechaStr && fechaStr.length >= 7) {
                mesanio = fechaStr.slice(5, 7) + '/' + fechaStr.slice(0, 4);
            }
            

            data.data.push({
                pacientesCentral : pacientesCentral,
                pacientesGascon : pacientesGascon,
                total : total,
                mesanio : mesanio,
                fechaing : fechaStr
            });
        }

        return data as backResponse;
    } catch (error) {
        useNotificadorService().errorSistema("Error al obtener totales. " + error + ".");
        return {} as backResponse;
    }
};
                total: Math.floor(Math.random() * 100)
            });
        }

        return data as backResponse;
    } catch (error) {
        useNotificadorService().errorSistema("Error al obtener totales. " + error + ".");
        return {} as backResponse;
    }
};

function countDaysInclusive(fechaD: string, fechaH: string): number {
    const start = new Date(fechaD)
    const end = new Date(fechaH)
    if (isNaN(+start) || isNaN(+end)) return 0

    // Normalizar a medianoche para evitar problemas de zona horaria/DST
    start.setHours(0, 0, 0, 0)
    end.setHours(0, 0, 0, 0)

    const diffMs = end.getTime() - start.getTime()
    const MS_PER_DAY = 24 * 60 * 60 * 1000
    const diffDays = Math.floor(diffMs / MS_PER_DAY)

    return diffDays >= 0 ? diffDays + 1 : 0
}



export default getTotalesDiarias;