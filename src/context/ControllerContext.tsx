"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from "react";
import { ControllerInput, ControllerState, GameSession } from "@/types/controller";
import type { Peer, DataConnection } from "peerjs";

interface ControllerContextType {
    session: GameSession | null;
    controllers: ControllerState[];
    createSession: (gameId: string, maxPlayers?: number) => string;
    joinSession: (sessionId: string) => Promise<boolean>;
    sendInput: (input: ControllerInput) => void;
    disconnectController: (controllerId: string) => void;
    endSession: () => void;
    isHost: boolean;
}

const ControllerContext = createContext<ControllerContextType | undefined>(undefined);

export const ControllerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<GameSession | null>(null);
    const [controllers, setControllers] = useState<ControllerState[]>([]);
    const [isHost, setIsHost] = useState(false);

    const peerRef = useRef<Peer | null>(null);
    const connectionsRef = useRef<Map<string, DataConnection>>(new Map());
    const hostConnRef = useRef<DataConnection | null>(null);

    // Initialize PeerJS only on client side
    const initPeer = async (id?: string): Promise<Peer> => {
        const { Peer } = await import("peerjs");
        const peer = new Peer(id);
        peerRef.current = peer;
        return peer;
    };

    // Create a new game session (As Host)
    const createSession = useCallback((gameId: string, maxPlayers: number = 4): string => {
        const sessionId = Math.random().toString(36).substring(2, 8).toUpperCase();

        setIsHost(true);

        initPeer(`GH-${sessionId}`).then(peer => {
            peer.on('open', (id) => {
                console.log('Host Peer ID:', id);
                const newSession: GameSession = {
                    id: sessionId,
                    gameId,
                    hostId: id,
                    controllers: [],
                    createdAt: Date.now(),
                    maxPlayers,
                };
                setSession(newSession);
            });

            peer.on('connection', (conn) => {
                conn.on('open', () => {
                    const controllerId = conn.peer;

                    setSession(prev => {
                        if (!prev || prev.controllers.length >= prev.maxPlayers) {
                            conn.send({ type: 'error', message: 'Session full' });
                            conn.close();
                            return prev;
                        }

                        const newController: ControllerState = {
                            id: controllerId,
                            connected: true,
                            playerNumber: prev.controllers.length + 1,
                        };

                        const updatedSession = {
                            ...prev,
                            controllers: [...prev.controllers, newController]
                        };

                        connectionsRef.current.set(controllerId, conn);
                        setControllers(updatedSession.controllers);

                        // Sync session state to common client
                        conn.send({ type: 'sync', session: updatedSession, playerNumber: newController.playerNumber });

                        return updatedSession;
                    });
                });

                conn.on('data', (data: any) => {
                    if (data.type === 'input') {
                        // Forward to game engine via custom event
                        window.dispatchEvent(new CustomEvent('controllerInput', {
                            detail: {
                                controllerId: conn.peer,
                                input: data.input
                            }
                        }));

                        // Update local state for UI indicators
                        setControllers(prev => prev.map(c =>
                            c.id === conn.peer ? { ...c, lastInput: data.input } : c
                        ));
                    }
                });

                conn.on('close', () => {
                    handleDisconnect(conn.peer);
                });
            });

            peer.on('error', (err) => {
                console.error('Peer Error:', err);
            });
        });

        return sessionId;
    }, []);

    const handleDisconnect = (controllerId: string) => {
        setControllers(prev => prev.filter(c => c.id !== controllerId));
        setSession(prev => {
            if (!prev) return null;
            return {
                ...prev,
                controllers: prev.controllers.filter(c => c.id !== controllerId)
            };
        });
        connectionsRef.current.delete(controllerId);
    };

    // Join an existing session (As Controller)
    const joinSession = useCallback(async (sessionId: string): Promise<boolean> => {
        setIsHost(false);
        const peer = await initPeer();

        return new Promise((resolve) => {
            peer.on('open', (id) => {
                const conn = peer.connect(`GH-${sessionId}`);
                hostConnRef.current = conn;

                conn.on('open', () => {
                    console.log('Connected to host:', sessionId);
                    resolve(true);
                });

                conn.on('data', (data: any) => {
                    if (data.type === 'sync') {
                        setSession(data.session);
                        setControllers(data.session.controllers);
                        sessionStorage.setItem('playerNumber', data.playerNumber.toString());
                    }
                    if (data.type === 'error') {
                        console.error('Session Error:', data.message);
                        resolve(false);
                    }
                });

                conn.on('error', (err) => {
                    console.error('Connection Error:', err);
                    resolve(false);
                });

                conn.on('close', () => {
                    setSession(null);
                    setControllers([]);
                });
            });

            peer.on('error', (err) => {
                console.error('Peer Error:', err);
                resolve(false);
            });

            // Timeout
            setTimeout(() => resolve(false), 10000);
        });
    }, []);

    // Send controller input
    const sendInput = useCallback((input: ControllerInput) => {
        if (hostConnRef.current && hostConnRef.current.open) {
            hostConnRef.current.send({
                type: 'input',
                input
            });
        }
    }, []);

    // Disconnect controller
    const disconnectController = useCallback((controllerId: string) => {
        const conn = connectionsRef.current.get(controllerId);
        if (conn) {
            conn.close();
        }
        handleDisconnect(controllerId);
    }, []);

    // End session
    const endSession = useCallback(() => {
        if (peerRef.current) {
            peerRef.current.destroy();
        }
        setSession(null);
        setControllers([]);
        connectionsRef.current.clear();
        hostConnRef.current = null;
    }, []);

    return (
        <ControllerContext.Provider
            value={{
                session,
                controllers,
                createSession,
                joinSession,
                sendInput,
                disconnectController,
                endSession,
                isHost,
            }}
        >
            {children}
        </ControllerContext.Provider>
    );
};

export const useController = (): ControllerContextType => {
    const context = useContext(ControllerContext);
    if (!context) {
        throw new Error("useController must be used within ControllerProvider");
    }
    return context;
};
