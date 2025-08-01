import "@/app/globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="ja">
        <head>
            <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID} />
        </head>
        <body>
            {children}
        </body>
    </html>
  );
}
