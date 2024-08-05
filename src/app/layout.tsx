// app/layout.tsx
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <head>
        <title>Google Trends App</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
