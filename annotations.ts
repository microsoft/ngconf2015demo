function addAnnotation(c: any, annotation: any): any {
    (c.annotations || (c.annotations = [])).push(annotation);
    return c;
}

function TSComponent(arg: any, @paramtypes parameters?: any[]) {
    return (c) => {
        c.parameters = [[AngularFire]];
        addAnnotation(c, new Component(arg))
        return
    }
}

function TSTemplate(arg: any) {
    return c => addAnnotation(c, new Template(arg));
}
