import { SvgIcon } from "@mui/material";
import * as React from "react";
import { ReactElement } from "react";
import { ReactComponent as CheeseImg } from '../../public/noun-cheese.svg';
import { ReactComponent as WineImg } from '../../public/noun-wine.svg';
import { ReactComponent as CowImg } from '../../public/noun-cow.svg';
import { ReactComponent as SheepImg } from '../../public/noun-sheep.svg';
import { ReactComponent as GoatImg } from '../../public/noun-goat.svg';

import { GraphNode } from "../interfaces/GraphNode";

const iconMap: { [key: string]: any } = {
    vache: CowIcon,
    chèvre: GoatIcon,
    brebis: SheepIcon,
    blanc: WhiteWineIcon,
    rouge: RedWineIcon
}

export function getIcon(graphNode: GraphNode<any>): () => JSX.Element {
    if (graphNode.labels.includes('Fromage')) {
        const key: string = graphNode.properties?.lait;
        console.log("graphNode", graphNode, iconMap[key])
        return iconMap[key] ? iconMap[key] : CheeseIcon
    }
    if (graphNode.labels.includes('Vin')) {
        const key: string = graphNode.properties?.couleur;
        return iconMap[key] ? iconMap[key] : WineIcon
    }
    return CheeseIcon
}

export function CheeseIcon() {
    return <SvgIcon component={CheeseImg} viewBox="0 0 590 580" ></SvgIcon>
}


export function WineIcon() {
    return <SvgIcon component={WineImg} viewBox="0 0 590 580" ></SvgIcon>
}

export function CowIcon() {
    return <SvgIcon component={CowImg} viewBox="0 0 610 580" ></SvgIcon>
}

export function GoatIcon() {
    return <SvgIcon component={GoatImg} viewBox="0 0 610 580" ></SvgIcon>
}

export function SheepIcon() {
    return <SvgIcon component={SheepImg} viewBox="0 0 610 580" ></SvgIcon>
}

export function WhiteWineIcon() {
    return <SvgIcon component={WineImg} viewBox="0 0 590 580" ></SvgIcon>
}

export function RedWineIcon() {
    return <SvgIcon component={WineImg} viewBox="0 0 590 580" ></SvgIcon>
}