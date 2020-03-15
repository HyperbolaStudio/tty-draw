export function optional<T1,T2>(a:T1,b:T2):T1 extends undefined?T2:T1{
    return (a===undefined?b:a) as any;
}