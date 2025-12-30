// Controller types for phone-as-controller system

export interface ControllerInput {
    type: 'button' | 'joystick' | 'gyro' | 'touch';
    button?: string; // 'A', 'B', 'X', 'Y', 'up', 'down', 'left', 'right', 'start', 'select'
    x?: number; // -1 to 1 for joystick
    y?: number; // -1 to 1 for joystick
    alpha?: number; // gyroscope
    beta?: number;
    gamma?: number;
    timestamp: number;
}

export interface ControllerState {
    id: string;
    connected: boolean;
    playerNumber: number;
    lastInput?: ControllerInput;
    battery?: number;
}

export interface GameSession {
    id: string;
    gameId: string;
    hostId: string;
    controllers: ControllerState[];
    createdAt: number;
    maxPlayers: number;
}

export type ControllerMode = 'dpad' | 'joystick' | 'gyro' | 'touch';

export interface ControllerConfig {
    mode: ControllerMode;
    vibration: boolean;
    sensitivity: number;
}
