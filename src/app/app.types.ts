export interface Elevator {
    id: string;
    initFloor: number;
    destFloor: number;
    endTime: number;
    number?: number;
    ordered?: boolean;
    finalFloor?: number;
    que: number[];
}

export interface ElevQue {
    elevatorId: string;
    distFlor: number; // ID
}
