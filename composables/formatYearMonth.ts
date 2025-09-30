function formatYearMonth(input: string): string {
    const [yearStr, monthStr] = input.split("-");

    const year = Number(yearStr);
    const month = Number(monthStr);

    if (!year || isNaN(month) || month < 1 || month > 12) {
        throw new Error(`Formato inválido, se esperaba YYYY-MM y recibí: ${input}`);
    }

    const meses: string[] = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    return `${meses[month - 1]} ${year}`;
}

export { formatYearMonth };