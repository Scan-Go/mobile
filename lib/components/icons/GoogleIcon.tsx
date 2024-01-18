import * as React from 'react';

/* SVGR has dropped some elements not supported by react-native-svg: title */
import Svg, { G, Path, SvgProps } from 'react-native-svg';

const _GoogleIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="-0.5 0 48 48"
    {...props}
  >
    <G
      fill="none"
      fillRule="evenodd"
    >
      <Path
        fill="#FBBC05"
        d="M9.827 24c0-1.524.253-2.986.705-4.356l-7.909-6.04A23.456 23.456 0 0 0 .213 24c0 3.737.868 7.26 2.407 10.388l7.905-6.05A13.885 13.885 0 0 1 9.827 24"
      />
      <Path
        fill="#EB4335"
        d="M23.714 10.133c3.311 0 6.302 1.174 8.652 3.094L39.202 6.4C35.036 2.773 29.695.533 23.714.533a23.43 23.43 0 0 0-21.09 13.071l7.908 6.04a13.849 13.849 0 0 1 13.182-9.51"
      />
      <Path
        fill="#34A853"
        d="M23.714 37.867a13.849 13.849 0 0 1-13.182-9.51l-7.909 6.038a23.43 23.43 0 0 0 21.09 13.072c5.732 0 11.205-2.036 15.312-5.849l-7.507-5.804c-2.118 1.335-4.786 2.053-7.804 2.053"
      />
      <Path
        fill="#4285F4"
        d="M46.145 24c0-1.387-.213-2.88-.534-4.267H23.714V28.8h12.604c-.63 3.091-2.346 5.468-4.8 7.014l7.507 5.804c4.314-4.004 7.12-9.969 7.12-17.618"
      />
    </G>
  </Svg>
);

export const GoogleIcon = React.memo(_GoogleIcon);