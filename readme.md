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


**update Sublime Text:**

copy sublime\typescript folder into the Sublime Text packages folder

Sublime Text packages folder default location:

-	Windows Sublime 2: %APPDATA%\Sublime Text 2\Packages
-	Windows Sublime 3: %APPDATA%\Sublime Text 3\Packages
-	OS X: ~/Library/Application Support/Sublime Text 2
-	OS X: ~/Library/Application Support/Sublime Text 3
-	Linux: ~/.Sublime Text 2
-	Linux: ~/.Sublime Text 3
