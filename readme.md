**install:**
```
npm install tsd
tsd reinstall
```

**build:**
```
npm install -g typescript@1.5.0-beta
tsc
```

**run:**
- install http-server package via
 ```
 npm install -g http-server 
 ```
- run server (if port 8080 it taken, pick any port that is free)
 ```
 http-server -p 8080
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
