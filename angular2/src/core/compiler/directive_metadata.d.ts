import { DirectiveAnnotation } from 'angular2/src/core/annotations/annotations';
/**
 * Combination of a type with the Directive annotation
 */
export declare class DirectiveMetadata {
    type: Type;
    annotation: DirectiveAnnotation;
    constructor(type: Type, annotation: DirectiveAnnotation);
}
