
export interface IOrder {
    type: string;
    description: string;
    route: {
        from: string;
        to: string;
    };
    status: 'En Progreso' | 'Completada' | 'Cancelada';
    truckId: string;
    routeId: string;
}