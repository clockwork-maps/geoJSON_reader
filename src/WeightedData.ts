import { createContext } from "react";

export type CVals = number[][][] | number[][] | number[];

export interface LeafletVectorProps {
    radius?: number,
    stroke?: boolean,
    color?: string,
    weight?: number,
    opacity?: number,
    dashArray?: string,
    dashOffset?: string,
    fill?: boolean,
    fillColor?: string,
    fillOpacity?: number,
    pane?: string,
    attribution?: string
}

export interface WDMetadata {
    id?: string
}

export type WeightedObjects =  { coords: CVals, props: LeafletVectorProps, meta?: WDMetadata };

export type WData = WeightedObjects[];

export const WeightedData = createContext<WData>([]);