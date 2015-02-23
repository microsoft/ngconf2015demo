// Type definitions for AngularFire 0.8.2
// Project: http://angularfire.com
// Definitions by: Dénes Harmath <http://github.com/thSoft>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../angular2/angular2.d.ts"/>
/// <reference path="../firebase/firebase.d.ts"/>

export interface AngularFireService {
    (firebase: Firebase, config?: any): AngularFire;
}

export declare class AngularFire {
    $asArray(): AngularFireArray;
    $asObject(): AngularFireObject;
    $ref(): Firebase;
    $push(data: any): Promise<Firebase>;
    $set(key: string, data: any): Promise<Firebase>;
    $set(data: any): Promise<Firebase>;
    $remove(key?: string): Promise<Firebase>;
    $update(key: string, data: Object): Promise<Firebase>;
    $update(data: any): Promise<Firebase>;
    $transaction(updateFn: (currentData: any) => any, applyLocally?: boolean): Promise<FirebaseDataSnapshot>;
    $transaction(key: string, updateFn: (currentData: any) => any, applyLocally?: boolean): Promise<FirebaseDataSnapshot>;
}

export interface AngularFireObject extends AngularFireSimpleObject {
    $id: string;
    $priority: number;
    $value: any;
    $save(): Promise<Firebase>;
    $loaded(resolve?: (x: AngularFireObject) => Promise<{}>, reject?: (err: any) => any): Promise<AngularFireObject>;
    $loaded(resolve?: (x: AngularFireObject) => Promise<{}>, reject?: (err: any) => any): Promise<AngularFireObject>;
    $loaded(resolve?: (x: AngularFireObject) => void, reject?: (err: any) => any): Promise<AngularFireObject>;
    $inst(): AngularFire;
    $bindTo(scope: any, varName: string): Promise<any>;
    $watch(callback: Function, context?: any): Function;
    $destroy(): void;
}

export interface AngularFireObjectService {
    $extendFactory(ChildClass: Object, methods?: Object): Object;
}

export interface AngularFireArray extends Array<AngularFireSimpleObject> {
    $add(newData: any): Promise<Firebase>;
    $save(recordOrIndex: any): Promise<Firebase>;
    $remove(recordOrIndex: any): Promise<Firebase>;
    $getRecord(key: string): AngularFireSimpleObject;
    $keyAt(recordOrIndex: any): string;
    $indexFor(key: string): number;
    $loaded(resolve?: (x: AngularFireArray) => Promise<{}>, reject?: (err: any) => any): Promise<AngularFireArray>;
    $loaded(resolve?: (x: AngularFireArray) => Promise<{}>, reject?: (err: any) => any): Promise<AngularFireArray>;
    $loaded(resolve?: (x: AngularFireArray) => void, reject?: (err: any) => any): Promise<AngularFireArray>;
    $inst(): AngularFire;
    $watch(cb: (event: string, key: string, prevChild: string) => void, context?: any): Function;
    $destroy(): void;
}
export interface AngularFireArrayService {
    $extendFactory(ChildClass: Object, methods?: Object): Object;
}

export interface AngularFireSimpleObject {
    $id: string;
    $priority: number;
    $value: any;
    [key: string]: any;
}


export interface AngularFireAuthService {
    (firebase: Firebase): AngularFireAuth;
}

export interface AngularFireAuth {
    $getCurrentUser(): Promise<any>;
    $login(provider: string, options?: Object): Promise<any>;
    $logout(): void;
    $createUser(email: string, password: string): Promise<any>;
    $changePassword(email: string, oldPassword: string, newPassword: string): Promise<any>;
    $removeUser(email: string, password: string): Promise<any>;
    $sendPasswordResetEmail(email: string): Promise<any>;
}