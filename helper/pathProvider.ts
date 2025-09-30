/// <reference types="vite/client" />

const isProduction = import.meta.env.PROD

class PathProvider {

    public getBasePath(): string {
        if (isProduction) {
            return 'http://sgh.hpc.local/sgh/sistemas/Laboratorio/EstadisticasSedes/api';
        } else {
            return '/api';
        }
    }

    public getPathDiarios(): string {
        return 'getDiariasTotales.jsp';
    }

    public getPathMensuales(): string {
        return 'getMensuales.jsp';
    }
}
export const pathProvider = new PathProvider();
