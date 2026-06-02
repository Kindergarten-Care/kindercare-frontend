import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const ArrowTrendUpIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size || "11"} height={size || "11"} viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M4.66667 10.6667V2.55L0.933333 6.28333L0 5.33333L5.33333 0L10.6667 5.33333L9.73333 6.28333L6 2.55V10.6667H4.66667Z" fill={props.fill || "#16A34A"}/>
  </svg>
);
