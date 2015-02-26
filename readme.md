**build:**
```
node tsc\tsc.js -m amd todo.ts
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
- Visual Studio 2013 `vs\VSDevMode.ps1 -vsVersion 12 -tsScript tsc\`
- Visual Studio 2015 CTP `vs\VSDevMode.ps1 -vsVersion 14 -tsScript tsc\`
