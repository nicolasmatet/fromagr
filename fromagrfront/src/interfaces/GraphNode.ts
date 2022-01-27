export interface GraphNode<T>{
    identity:{low:number, high:number},
    labels:string[],
    properties:T
}