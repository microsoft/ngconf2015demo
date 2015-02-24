import { TemplateAnnotation } from 'angular2/src/core/annotations/template';
export declare class TemplateResolver {
    _cache: Map<any, any>;
    constructor();
    resolve(component: Type): TemplateAnnotation;
    _resolve(component: Type): any;
}
