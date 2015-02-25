import {Component as ComponentAnnotation, Template as TemplateAnnotation} from 'angular2/angular2';

function addAnnotation(c: any, annotation: any): any {
    (c.annotations || (c.annotations = [])).push(annotation);
    return c;
}

export function Component(arg: { selector: string, componentServices: any[] }, @paramtypes parameters?: any[]) {
    return (c) => {
        c.parameters = parameters.map(p => [p]);
        addAnnotation(c, new ComponentAnnotation(arg))
        return
    }
}

export function Template(arg: { url: string, directives: any[] }) {
    return c => addAnnotation(c, new TemplateAnnotation(arg));
}