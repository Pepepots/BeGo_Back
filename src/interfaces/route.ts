interface Coordinates {
    from: [number, number];
    to: [number, number];
}

export interface IRoute {
    from: string;
    to: string;
    coordinates: Coordinates;
    distance: number;
}