export declare class DirectiveAnnotation {
    selector: any;
    bind: any;
    lightDomServices: any;
    implementsTypes: any;
    lifecycle: any;
    constructor(_0?: any);
    hasLifecycleHook(hook: string): boolean;
}
export declare function Directive(arg?: any): (c: any) => any;
export declare class ComponentAnnotation extends DirectiveAnnotation {
    lightDomServices: any;
    shadowDomServices: any;
    componentServices: any;
    lifecycle: any;
    constructor(_0?: any);
}
export declare function Component(arg?: any): (c: any) => any;
export declare class DecoratorAnnotation extends DirectiveAnnotation {
    compileChildren: boolean;
    constructor(_0?: any);
}
export declare function Decorator(arg?: any): (c: any) => any;
export declare class ViewportAnnotation extends DirectiveAnnotation {
    constructor(_0?: any);
}
export declare function Viewport(arg?: any): (c: any) => any;
export declare const onDestroy: string;
export declare const onChange: string;
