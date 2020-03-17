export type Serialized = number|string|boolean|null|Serialized[]|{
    [property:string]:Serialized;
};

export interface FunctionCollection{
    [property:string]:{
        request:Serialized|void;
        response:Serialized|void;
    }
}

export interface MainHandler<Collection extends FunctionCollection>{
    <K extends keyof Collection>(key:K,request:Collection[K]['request']):Promise<Collection[K]['response']>;
}

export interface ChildHandler<Collection extends FunctionCollection>{
    <K extends keyof Collection>(map:{
        [key:string]:((req:Collection[K]['request'])=>Collection[K]['response']|Promise<Collection[K]['response']>);
    }):void;
}