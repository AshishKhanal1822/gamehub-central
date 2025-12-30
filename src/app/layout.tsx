import { Providers } from "./providers";
import "./globals.css";
import "@fontsource/inter";

export const metadata = {
    title: "GameCentral",
    description: "Your ultimate destination for games",
    manifest: "/manifest.json",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="font-sans antialiased">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
