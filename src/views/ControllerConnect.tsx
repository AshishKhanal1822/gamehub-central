"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Gamepad2, Loader2, AlertCircle } from "lucide-react";
import { MobileController } from "@/components/controller/MobileController";
import { useController } from "@/context/ControllerContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const ControllerPage = () => {
    const params = useParams();
    const router = useRouter();
    const sessionId = params?.sessionId as string;
    const { joinSession, session } = useController();

    const [isConnecting, setIsConnecting] = useState(true);
    const [connectionError, setConnectionError] = useState<string | null>(null);
    const [playerNumber, setPlayerNumber] = useState<number>(0);

    useEffect(() => {
        if (!sessionId) {
            setConnectionError("Invalid session ID");
            setIsConnecting(false);
            return;
        }

        const tryJoin = async () => {
            try {
                const success = await joinSession(sessionId);

                if (success) {
                    // Give it a moment to sync session state
                    setTimeout(() => {
                        const storedPlayerNumber = sessionStorage.getItem('playerNumber');
                        if (storedPlayerNumber) {
                            setPlayerNumber(parseInt(storedPlayerNumber));
                        }
                        setIsConnecting(false);
                    }, 500);
                } else {
                    setConnectionError("Session not found or full. Please scan the QR code again.");
                    setIsConnecting(false);
                }
            } catch (err) {
                console.error("Join session error:", err);
                setConnectionError("Failed to establish connection. Ensure both devices are on the network.");
                setIsConnecting(false);
            }
        };

        tryJoin();
    }, [sessionId, joinSession]);

    // Loading state
    if (isConnecting) {
        return (
            <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-primary/10 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    </div>
                    <h2 className="text-2xl font-gaming font-bold mb-2 uppercase tracking-tighter">Initializing...</h2>
                    <p className="text-muted-foreground">Linking your device to GameHub Console</p>
                </motion.div>
            </div>
        );
    }

    // Error state
    if (connectionError) {
        return (
            <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-destructive/10 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md w-full"
                >
                    <Card variant="glass" className="p-8 text-center border-destructive/50">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/20 flex items-center justify-center text-destructive">
                            <AlertCircle className="w-8 h-8" />
                        </div>
                        <h2 className="text-xl font-gaming font-bold mb-2">Network Error</h2>
                        <p className="text-muted-foreground mb-6 text-sm">
                            {connectionError}
                        </p>
                        <Button
                            variant="gaming"
                            onClick={() => router.push('/')}
                            className="w-full"
                        >
                            Return to GameHub
                        </Button>
                    </Card>
                </motion.div>
            </div>
        );
    }

    // Connected - show controller
    return <MobileController playerNumber={playerNumber} />;
};

export default ControllerPage;
