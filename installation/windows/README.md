# Installation

To run the app, you need:

1. **nvm**
1. **Node.js, npm**


## 1. nvm

To install **Node.js** and **npm**, you need to install **nvm**.

Go to [nvm-windows releases](https://github.com/coreybutler/nvm-windows/releases/latest) and download `nvm-setup.zip`.

After unzip it, run `nvm-setup.exe` inside and follow the installation guide.

Then, open Windows PowerShell.

If the installation is successful, the following command shows the nvm version.

```bash
nvm -v
```


## 2. Node.js, npm

Next. run:

```bash
nvm install v18.15.0
```

At this point, the following command should show `18.15.0`:

```bash
nvm ls
```

Then, run:

```bash
nvm use v18.15.0
```

If everything has properly been configured, the following command shows the node version:

```bash
node -v
```

Normally, `npm` is installed with Node.js. 

```bash
npm -v
```

If the above command shows the npm version, the installation has been completed.
