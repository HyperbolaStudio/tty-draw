export namespace Constants{
    export namespace Node{
        export enum Event{
            CONNECTED = 'connected',
            DISCONNECTED = 'disconnected',
        }
        export const BREAK_ITERATION = Symbol('break-iteration');
    }
    export namespace Element{
        export enum Event{
            REFLOW = 'reflow',
            ATTR_CHANGED = 'attr-changed',
        }
    }
}