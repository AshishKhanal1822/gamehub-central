import { Providers } from "./providers";
import { SWRegister } from "@/components/SWRegister";
import "./globals.css";
import "@fontsource/inter";

export const metadata = {
    title: "GameCentral",
    description: "Your ultimate destination for games",
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "GameHub",
    },
};

export const viewport = {
    themeColor: "#6366f1",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
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
                <SWRegister />
            </body>
        </html>
    );
}
