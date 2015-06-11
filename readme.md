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

open a powershell command prompt in the ngconf2015demo folder and run one of the below commands/scripts
- Visual Studio 2013 `vs\VSDevMode.ps1 -vsVersion 12 -tsScript tsc\`
- Visual Studio 2015 CTP `vs\VSDevMode.ps1 -vsVersion 14 -tsScript tsc\`

restart or start visual studio. Under File->Open->Web Site... open the ngconf2015demo folder

**update Sublime Text:**

If you are using [Package Control](https://packagecontrol.io/) for Sublime Text, simply 
install the `TypeScript` package.

Alternatively, you can clone the [repo](https://github.com/Microsoft/TypeScript-Sublime-Plugin) directly.
