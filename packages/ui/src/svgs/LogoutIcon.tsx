import React from 'react';

export const LogoutIcon: React.FC<{ fill?: string; size?: number }> = ({ fill = 'currentColor', size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.96 17.64C1.421 17.64 0.959583 17.4481 0.57575 17.0643C0.191917 16.6804 0 16.219 0 15.68V1.96C0 1.421 0.191917 0.959583 0.57575 0.57575C0.959583 0.191917 1.421 0 1.96 0H8.82V1.96H1.96V15.68H8.82V17.64H1.96ZM12.74 13.72L11.3925 12.299L13.8915 9.8H5.88V7.84H13.8915L11.3925 5.341L12.74 3.92L17.64 8.82L12.74 13.72Z" fill={fill}/>
  </svg>
);
