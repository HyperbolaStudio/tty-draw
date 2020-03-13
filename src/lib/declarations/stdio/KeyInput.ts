export enum Keys{

    // ^ character sequence

    ctrl,
    alt,
    tab,
    enter,
    backspace,

    // ANSI ESC sequence
    esc,
    ins,
    del,
    up,
    down,
    left,
    right,
    pageUp,
    pageDown,
    home,
    end,

    //fn keys

    f1,
    f2,
    f3,
    f4,
    f5,
    f6,
    f7,
    f8,
    f9,
    f10,
    f11,
    f12,
}

export type KeyInput = {
    type:'printable';
    char:string;
}|{
    type:'func';
    keys:Keys[];
}