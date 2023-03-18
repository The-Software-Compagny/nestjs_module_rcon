import { Rcon } from 'rcon-client';
import { RconModuleOptions } from './rcon.interfaces';
export declare function getRconOptionsToken(connection: string): string;
export declare function getRconConnectionToken(connection: string): string;
export declare function createRconConnection(options: RconModuleOptions): Promise<Rcon>;
