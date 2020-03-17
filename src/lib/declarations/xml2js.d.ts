import {xml2js, Options, Element, ElementCompact} from 'xml-js';
declare module 'xml-js'{
    function xml2js(xml: string, options?: Options.XML2JS&{compact?:false}): Element;
    function xml2js(xml: string): Element;
    function xml2js(xml: string, options?: Options.XML2JS&{compact:true}): ElementCompact;
    function xml2js(xml: string, options?: Options.XML2JS): Element | ElementCompact;
}
