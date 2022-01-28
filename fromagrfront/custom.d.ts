
declare module "*.svg" {
    import React = require('react');
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}

declare module "*.png" {
    const value: any;
    export default value;
}

declare module 'ConfigData' {
    export interface ConfigData {
        API_URL: string;
    }
    const value: any
    export default value;
}
