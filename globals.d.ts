/// <reference path="jasmine/jasmine.d.ts" />
/// <reference path="zone/zone.d.ts" />
/// <reference path="hammerjs/hammerjs.d.ts" />
declare var assert: any;
declare var module: any;
declare var $traceurRuntime: any;
declare var global: Window;
declare var $: any;
declare var angular: any;
declare var _resolve: any;
declare var require: any;
declare var browser: any;
declare var benchpressRunner: any;
declare type int = number;
declare type Type = {
    new (...args: any[]): any;
};
interface List<T> extends Array<T> {
}
declare type TemplateElement = HTMLTemplateElement;
declare type StyleElement = HTMLStyleElement;
declare type SetterFn = Function;
declare type GetterFn = Function;
declare type MethodFn = Function;
declare type _globalRegExp = RegExp;
interface HTMLElement {
    createShadowRoot(): HTMLElement;
}
interface HTMLTemplateElement extends HTMLElement {
    content: DocumentFragment;
}
interface Window {
    Array: typeof Array;
    List: typeof Array;
    Map: typeof Map;
    Set: typeof Set;
    RegExp: typeof RegExp;
    JSON: typeof JSON;
    Math: typeof Math;
    assert: typeof assert;
    NaN: typeof NaN;
    setTimeout: typeof setTimeout;
    Promise: typeof Promise;
    zone: Zone;
    Hammer: HammerStatic;
    DocumentFragment: DocumentFragment;
    Node: Node;
    NodeList: NodeList;
    Text: Text;
    HTMLElement: HTMLElement;
    HTMLTemplateElement: TemplateElement;
    HTMLStyleElement: StyleElement;
    gc(): void;
}
interface Window extends jasmine.GlobalPolluter {
    print(msg: string): void;
    dump(msg: string): void;
    describe(description: string, specDefinitions: () => void): jasmine.Suite;
    ddescribe(description: string, specDefinitions: () => void): jasmine.Suite;
    beforeEach(beforeEachFunction: () => void): void;
    beforeAll(beforeAllFunction: () => void): void;
    afterEach(afterEachFunction: () => void): void;
    afterAll(afterAllFunction: () => void): void;
    xdescribe(desc: string, specDefinitions: () => void): jasmine.XSuite;
    it(description: string, func: (done?: () => void) => void): jasmine.Spec;
    iit(description: string, func: () => void): jasmine.Spec;
    xit(desc: string, func: () => void): jasmine.XSpec;
}
declare module jasmine {
    interface Matchers {
        toHaveText(text: string): void;
        toBeAnInstanceOf(obj: any): void;
        toBePromise(): void;
        toBe(value: any): void;
    }
}
interface Map<K, V> {
    jasmineToString?(): void;
}
interface Console {
    profileEnd(str: string): any;
}
