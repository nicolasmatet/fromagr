import { GraphNode } from "./GraphNode";
export type Fromage = GraphNode<{ name: string, lait: string }>
export type Vin = GraphNode<{ name: string, couleur: string }>
export type VinOuFromage = Fromage | Vin;