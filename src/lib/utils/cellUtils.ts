import { Cell, ColorType, isColor16String, isColor256, isColorRGB, ModifierType } from "../declarations/stdio/Cell";

function compareColor(a?:ColorType,b?:ColorType){
    if(!a && !b)return true;
    if((a&&!b)||(b&&!a))return false;
    a = a as ColorType;//F**k Typescript
    b = b as ColorType;
    if(isColor16String(a)){
        if(!isColor16String(b)||a!==b)return false;
    }
    if(isColor256(a)){
        if(!isColor256(b)||a.ansi256!==b.ansi256)return false;
    }
    if(isColorRGB(a)){
        if(!isColorRGB(b)||a.r!==b.r||a.g!==b.g||a.b!==b.b)return false;
    }
    return true;
}

function compareModifiers(a?:ModifierType,b?:ModifierType){
    if(!a && !b)return true;
    if((a&&!b)||(b&&!a))return false;
    a = a as ModifierType;
    b = b as ModifierType;
    for(let k in a){
        if((!!a[k as keyof ModifierType]) !== (!!b[k as keyof ModifierType])){
            return false;
        }
    }
    return true;
}

export function compareCell(a?:Cell,b?:Cell){
    if(!a && !b)return true;
    if((a&&!b)||(b&&!a))return false;
    a = a as Cell;
    b = b as Cell;
    return (
        a.char === b.char && 
        compareModifiers(a.modifiers,b.modifiers) && 
        compareColor(a.color,b.color) &&
        compareColor(a.bgColor,b.bgColor)
    )
}

export function cloneCell(a?:Cell):Cell|undefined{
    if(!a)return undefined;
    return {
        color:a.color?JSON.parse(JSON.stringify(a.color)):undefined,
        bgColor:a.bgColor?JSON.parse(JSON.stringify(a.bgColor)):undefined,
        modifiers:a.modifiers?JSON.parse(JSON.stringify(a.modifiers)):undefined,
        char:a.char,
    }
}