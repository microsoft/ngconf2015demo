import { XHR } from './xhr/xhr';
import { TemplateAnnotation } from 'angular2/src/core/annotations/template';
/**
 * Strategy to load component templates.
 */
export declare class TemplateLoader {
    _xhr: XHR;
    _cache: any;
    constructor(xhr: XHR);
    load(template: TemplateAnnotation): any;
}
