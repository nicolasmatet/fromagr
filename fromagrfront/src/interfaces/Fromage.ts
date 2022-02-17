import { GraphNode } from "./GraphNode";
export interface VinProperties { name: string, couleur: string };
export interface FromageProperties { name: string, lait: string };
export type Fromage = GraphNode<FromageProperties>
export type Vin = GraphNode<VinProperties>
export type VinOuFromage = Fromage | Vin;
export type Suggestion = GraphNode<{ text: string, n: number }>
export function isFromage(graphNode: VinOuFromage) {
    return graphNode.labels.includes('Fromage')
}

export function isVin(graphNode: VinOuFromage) {
    return graphNode.labels.includes('Vin')
}

export const fromagePropertiesKeys: (keyof FromageProperties)[] = ['name', 'lait']
export const vinPropertiesKeys: (keyof VinProperties)[] = ['name', 'couleur']