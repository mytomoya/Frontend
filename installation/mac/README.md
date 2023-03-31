# Installation

To run the app, you need:

1. **Homebrew**
1. **nodebrew**
1. **Node.js, npm**


## 1. Homebrew

To install **Node.js** and **npm**, you need to install **Homebrew**:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

After that, run:

```bash
brew -v
```

The above command should show the version of your Homebrew. 

> If it is not the case, check the installation of Homebrew has succeeded.


## 2. nodebrew

Next, run:

```bash
brew install nodebrew
```

which installs **nodebrew**.

Make sure that the following command shows the version of nodebrew:

```bash
nodebrew --version
```

> If it does not, nodebrew may not have been installed properly.


## 3. Node.js, npm

First, run:

```bash
nodebrew install stable
```

Second, run:

```bash
nodebrew show
```

The above command shows `nodebrew use vA.B.C`, where `A`, `B` and `C` are some numbers. If you find it, copy and run it:

```bash
nodebrew use vA.B.C
```

> Do not forget to replace `A`, `B` and `C` with your numbers.


Finally, you need to add `$HOME/.nodebrew/current/bin` to the `PATH` environment variable.

<details>
<summary>bash</summary>

If your shell is **bash**, run:

```bash
echo 'export PATH=$HOME/.nodebrew/current/bin:$PATH' >> ~/.bash_profile
```

</details>


<details>
<summary>zsh</summary>

If your shell is **zsh**, run:

```zsh
echo 'export PATH=$HOME/.nodebrew/current/bin:$PATH' >> ~/.zprofile
```

</details>


Once you have completed the installation, **restart the terminal**.

If everything has been installed properly, 

```bash
node -v
```

should show the version of the installed Node.js (which is `vA.B.C` you saw above).

`npm` must have been installed with Node.js. You can check that with:

```bash
npm -v
```
