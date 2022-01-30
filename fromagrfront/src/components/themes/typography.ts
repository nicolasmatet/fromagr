import {TypographyVariantsOptions } from "@mui/material";

declare module '@mui/material/styles' {
    interface TypographyVariants {
      cow: React.CSSProperties;
    }
  
    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
      cow?: React.CSSProperties;
    }
  }
  
  // Update the Typography's variant prop options
  declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
      cow: true;
    }
  }

export const typography: TypographyVariantsOptions = {
    cow: {
        fontFamily: 'Indie Flower',
    },
} 