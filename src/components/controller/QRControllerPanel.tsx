"use client";

import { useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Smartphone,
    Wifi,
    WifiOff,
    Users,
    Copy,
    Check,
    X,
    Gamepad2
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useController } from "@/context/ControllerContext";
import { toast } from "@/hooks/use-toast";

interface QRControllerPanelProps {
    gameId: string;
    maxPlayers?: number;
    onControllersReady?: (count: number) => void;
}

export const QRControllerPanel = ({
    gameId,
    maxPlayers = 4,
    onControllersReady
}: QRControllerPanelProps) => {
    const { session, controllers, createSession, endSession } = useController();
    const [copied, setCopied] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);

    useEffect(() => {
        // Create session when component mounts
        if (!session) {
            createSession(gameId, maxPlayers);
        }

        return () => {
            // Clean up session when component unmounts
            if (session) {
                endSession();
            }
        };
    }, []);

    useEffect(() => {
        if (onControllersReady) {
            onControllersReady(controllers.length);
        }
    }, [controllers.length, onControllersReady]);

    const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost';
    const networkIP = "192.168.1.89"; // Discovered via ipconfig
    const networkOrigin = isLocalhost
        ? `http://${networkIP}:3000`
        : typeof window !== 'undefined' ? window.location.origin : '';

    const controllerUrl = session
        ? `${networkOrigin}/controller/${session.id}`
        : '';

    const copyToClipboard = () => {
        navigator.clipboard.writeText(controllerUrl);
        setCopied(true);
        toast({
            title: "Link copied!",
            description: "Share this link with players to connect their phones.",
        });
        setTimeout(() => setCopied(false), 2000);
    };

    if (!session) {
        return (
            <Card variant="gaming" className="p-6">
                <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span>Setting up controller session...</span>
                </div>
            </Card>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
        >
            {/* Header */}
            <Card variant="glass" className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                            <Smartphone className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-gaming font-semibold">Phone Controllers</h3>
                            <p className="text-sm text-muted-foreground">
                                {controllers.length} / {maxPlayers} connected
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ? <X className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                    </Button>
                </div>
            </Card>

            {isLocalhost && (
                <Card variant="glass" className="p-4 bg-yellow-500/10 border-yellow-500/50">
                    <div className="flex bg-yellow-500/10 p-2 rounded-md mb-2 items-center gap-2 text-yellow-500">
                        <WifiOff className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Network Mode Required</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-tight">
                        To connect your mobile device, please access this site via your local IP:
                        <span className="text-primary font-mono block mt-1">http://{networkIP}:3000</span>
                    </p>
                    <p className="text-[9px] text-yellow-500/80 mt-2 italic">
                        Start server with: <code className="bg-black/20 px-1 rounded">npm run dev -- -H 0.0.0.0</code>
                    </p>
                </Card>
            )}

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4"
                    >
                        {/* QR Code */}
                        <Card variant="gaming" className="p-6">
                            <div className="text-center space-y-4">
                                <div className="inline-block p-4 bg-white rounded-lg">
                                    <QRCodeSVG
                                        value={controllerUrl}
                                        size={200}
                                        level="H"
                                        includeMargin
                                    />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold mb-2">Scan to Connect</p>
                                    <p className="text-xs text-muted-foreground mb-3">
                                        Scan this QR code with your phone camera
                                    </p>

                                    <div className="flex items-center gap-2 p-2 bg-secondary rounded-lg">
                                        <code className="flex-1 text-xs truncate">{controllerUrl}</code>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={copyToClipboard}
                                        >
                                            {copied ? (
                                                <Check className="w-4 h-4 text-green-500" />
                                            ) : (
                                                <Copy className="w-4 h-4" />
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-border">
                                    <p className="text-xs text-muted-foreground">
                                        Session Code: <span className="font-mono font-bold text-primary">{session.id}</span>
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* Connected Controllers */}
                        <Card variant="glass" className="p-4">
                            <h4 className="font-gaming font-semibold mb-3 flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                Connected Players
                            </h4>

                            {controllers.length === 0 ? (
                                <div className="text-center py-8 text-muted-foreground">
                                    <Smartphone className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                    <p className="text-sm">Waiting for players to connect...</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {controllers.map((controller) => (
                                        <motion.div
                                            key={controller.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                                    <Gamepad2 className="w-4 h-4 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-sm">Player {controller.playerNumber}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {controller.connected ? "Connected" : "Disconnected"}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {controller.connected ? (
                                                    <Badge variant="gaming" className="gap-1">
                                                        <Wifi className="w-3 h-3" />
                                                        Active
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="secondary" className="gap-1">
                                                        <WifiOff className="w-3 h-3" />
                                                        Offline
                                                    </Badge>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </Card>

                        {/* Instructions */}
                        <Card variant="glass" className="p-4">
                            <h4 className="font-gaming font-semibold mb-2 text-sm">How to Connect</h4>
                            <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                                <li>Open your phone's camera app</li>
                                <li>Point it at the QR code above</li>
                                <li>Tap the notification to open the controller</li>
                                <li>Start playing!</li>
                            </ol>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
