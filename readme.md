> **NOTE**: This repo is no longer updated. Please refere to the Angular2 Quick Start guide at: https://angular.io/docs/ts/latest/quickstart.html for a Angular2 + TypeScript sample.

**install:**
```
npm install
```

> Note: This demo uses [SystemJS](https://github.com/systemjs/systemjs) and [es6-module-loader](https://github.com/ModuleLoader/es6-module-loader) to transpile typescript files in the browser. It also uses a pre-release drop of TypeScript 1.5.2 from [mhegazy/typescript#v1.5-beta2](https://github.com/mhegazy/typescript#v1.5-beta2)

**run:**
- install http-server package via
 ```
 npm install -g http-server 
 ```
- run server (if port 8080 it taken, pick any port that is free)
 ```
 http-server -p 8080
 ```

**install typings (required for design time typechecking in editors)**
```
npm install tsd -g
tsd reinstall
tsd rebundle

```

**update Visual Studio:**

Install TypeScript 1.5 or later releases:
- [Download Visual Studio 2015](https://www.visualstudio.com/downloads/download-visual-studio-vs)
- [Install TypeSript plugin for Visual Studio 2013](https://visualstudiogallery.msdn.microsoft.com/b1fff87e-d68b-4266-8bba-46fad76bbf22)
 
**update Sublime Text:**

If you are using [Package Control](https://packagecontrol.io/) for Sublime Text, simply 
install the `TypeScript` package.

Alternatively, you can clone the [repo](https://github.com/Microsoft/TypeScript-Sublime-Plugin) directly.
