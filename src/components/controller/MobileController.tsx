"use client";

import { useState, useEffect, useRef, TouchEvent } from "react";
import { motion } from "framer-motion";
import { Vibrate, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useController } from "@/context/ControllerContext";
import { ControllerInput } from "@/types/controller";

interface MobileControllerProps {
    playerNumber: number;
}

export const MobileController = ({ playerNumber }: MobileControllerProps) => {
    const { sendInput } = useController();
    const [activeButtons, setActiveButtons] = useState<Set<string>>(new Set());
    const [joystickPosition, setJoystickPosition] = useState({ x: 0, y: 0 });
    const [vibrationEnabled, setVibrationEnabled] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const joystickRef = useRef<HTMLDivElement>(null);

    // Vibrate on button press
    const vibrate = (duration: number = 10) => {
        if (vibrationEnabled && 'vibrate' in navigator) {
            navigator.vibrate(duration);
        }
    };

    // Handle button press
    const handleButtonDown = (button: string) => {
        setActiveButtons(prev => new Set(prev).add(button));
        vibrate(10);

        const input: ControllerInput = {
            type: 'button',
            button,
            timestamp: Date.now(),
        };
        sendInput(input);
    };

    // Handle button release
    const handleButtonUp = (button: string) => {
        setActiveButtons(prev => {
            const newSet = new Set(prev);
            newSet.delete(button);
            return newSet;
        });
    };

    // Handle joystick movement
    const handleJoystickMove = (e: TouchEvent<HTMLDivElement>) => {
        if (!joystickRef.current) return;

        const touch = e.touches[0];
        const rect = joystickRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = touch.clientX - centerX;
        const deltaY = touch.clientY - centerY;

        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const maxDistance = rect.width / 2;

        let x = deltaX / maxDistance;
        let y = deltaY / maxDistance;

        // Clamp to circle
        if (distance > maxDistance) {
            x = (deltaX / distance) * 1;
            y = (deltaY / distance) * 1;
        }

        setJoystickPosition({ x, y });

        const input: ControllerInput = {
            type: 'joystick',
            x,
            y,
            timestamp: Date.now(),
        };
        sendInput(input);
    };

    const handleJoystickEnd = () => {
        setJoystickPosition({ x: 0, y: 0 });

        const input: ControllerInput = {
            type: 'joystick',
            x: 0,
            y: 0,
            timestamp: Date.now(),
        };
        sendInput(input);
    };

    // Prevent scrolling on touch
    useEffect(() => {
        const preventDefault = (e: Event) => e.preventDefault();
        document.body.addEventListener('touchmove', preventDefault, { passive: false });
        return () => document.body.removeEventListener('touchmove', preventDefault);
    }, []);

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-primary/10 overflow-hidden">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-background to-transparent z-10">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-gaming font-bold text-lg">Player {playerNumber}</h1>
                        <p className="text-xs text-muted-foreground">Controller Connected</p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setVibrationEnabled(!vibrationEnabled)}
                        >
                            <Vibrate className={`w-5 h-5 ${vibrationEnabled ? 'text-primary' : 'text-muted-foreground'}`} />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSoundEnabled(!soundEnabled)}
                        >
                            {soundEnabled ? (
                                <Volume2 className="w-5 h-5 text-primary" />
                            ) : (
                                <VolumeX className="w-5 h-5 text-muted-foreground" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Controller Layout */}
            <div className="h-full flex items-center justify-between px-6 pt-20 pb-6">
                {/* Left Side - D-Pad / Joystick */}
                <div className="flex items-center justify-center">
                    <div
                        ref={joystickRef}
                        className="relative w-40 h-40 rounded-full bg-secondary/50 border-2 border-border"
                        onTouchMove={handleJoystickMove}
                        onTouchEnd={handleJoystickEnd}
                    >
                        <motion.div
                            className="absolute w-16 h-16 rounded-full bg-primary shadow-lg"
                            style={{
                                top: '50%',
                                left: '50%',
                            }}
                            animate={{
                                x: joystickPosition.x * 60 - 32,
                                y: joystickPosition.y * 60 - 32,
                            }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                        </div>
                    </div>
                </div>

                {/* Right Side - Action Buttons */}
                <div className="relative w-40 h-40">
                    {/* A Button (Bottom) */}
                    <motion.button
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full font-gaming font-bold text-xl shadow-lg ${activeButtons.has('A')
                                ? 'bg-gaming-green text-white scale-95'
                                : 'bg-secondary text-foreground'
                            }`}
                        onTouchStart={() => handleButtonDown('A')}
                        onTouchEnd={() => handleButtonUp('A')}
                        whileTap={{ scale: 0.9 }}
                    >
                        A
                    </motion.button>

                    {/* B Button (Right) */}
                    <motion.button
                        className={`absolute right-0 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full font-gaming font-bold text-xl shadow-lg ${activeButtons.has('B')
                                ? 'bg-gaming-red text-white scale-95'
                                : 'bg-secondary text-foreground'
                            }`}
                        onTouchStart={() => handleButtonDown('B')}
                        onTouchEnd={() => handleButtonUp('B')}
                        whileTap={{ scale: 0.9 }}
                    >
                        B
                    </motion.button>

                    {/* X Button (Left) */}
                    <motion.button
                        className={`absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full font-gaming font-bold text-xl shadow-lg ${activeButtons.has('X')
                                ? 'bg-gaming-blue text-white scale-95'
                                : 'bg-secondary text-foreground'
                            }`}
                        onTouchStart={() => handleButtonDown('X')}
                        onTouchEnd={() => handleButtonUp('X')}
                        whileTap={{ scale: 0.9 }}
                    >
                        X
                    </motion.button>

                    {/* Y Button (Top) */}
                    <motion.button
                        className={`absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full font-gaming font-bold text-xl shadow-lg ${activeButtons.has('Y')
                                ? 'bg-gaming-orange text-white scale-95'
                                : 'bg-secondary text-foreground'
                            }`}
                        onTouchStart={() => handleButtonDown('Y')}
                        onTouchEnd={() => handleButtonUp('Y')}
                        whileTap={{ scale: 0.9 }}
                    >
                        Y
                    </motion.button>
                </div>
            </div>

            {/* Bottom Buttons */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background to-transparent">
                <div className="flex justify-center gap-4">
                    <motion.button
                        className={`px-6 py-3 rounded-lg font-gaming font-semibold ${activeButtons.has('select')
                                ? 'bg-primary text-primary-foreground scale-95'
                                : 'bg-secondary text-foreground'
                            }`}
                        onTouchStart={() => handleButtonDown('select')}
                        onTouchEnd={() => handleButtonUp('select')}
                        whileTap={{ scale: 0.95 }}
                    >
                        SELECT
                    </motion.button>
                    <motion.button
                        className={`px-6 py-3 rounded-lg font-gaming font-semibold ${activeButtons.has('start')
                                ? 'bg-primary text-primary-foreground scale-95'
                                : 'bg-secondary text-foreground'
                            }`}
                        onTouchStart={() => handleButtonDown('start')}
                        onTouchEnd={() => handleButtonUp('start')}
                        whileTap={{ scale: 0.95 }}
                    >
                        START
                    </motion.button>
                </div>
            </div>

            {/* Connection Indicator */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-2 px-3 py-1 bg-gaming-green/20 border border-gaming-green rounded-full">
                    <div className="w-2 h-2 rounded-full bg-gaming-green animate-pulse" />
                    <span className="text-xs font-semibold text-gaming-green">Connected</span>
                </div>
            </div>
        </div>
    );
};
