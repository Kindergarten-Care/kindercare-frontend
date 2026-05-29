import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const WarningTriangleLargeIcon: React.FC<IconProps> = ({ size, ...props }) => (
  <svg width={size || "55"} height={size || "48"} viewBox="0 0 55 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M0 47.5L27.5 0L55 47.5H0ZM27.5 40C28.2083 40 28.8021 39.7604 29.2812 39.2812C29.7604 38.8021 30 38.2083 30 37.5C30 36.7917 29.7604 36.1979 29.2812 35.7188C28.8021 35.2396 28.2083 35 27.5 35C26.7917 35 26.1979 35.2396 25.7188 35.7188C25.2396 36.1979 25 36.7917 25 37.5C25 38.2083 25.2396 38.8021 25.7188 39.2812C26.1979 39.7604 26.7917 40 27.5 40ZM25 32.5H30V20H25V32.5Z" fill={props.fill || "#EAB308"}/>
  </svg>
);
