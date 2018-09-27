```
    _/      _/            _/                      _/    _/  _/                      _/
   _/_/  _/_/    _/_/_/  _/  _/      _/_/        _/  _/          _/_/      _/_/_/  _/  _/
  _/  _/  _/  _/    _/  _/_/      _/_/_/_/      _/_/      _/  _/    _/  _/_/      _/_/
 _/      _/  _/    _/  _/  _/    _/            _/  _/    _/  _/    _/      _/_/  _/  _/
_/      _/    _/_/_/  _/    _/    _/_/_/      _/    _/  _/    _/_/    _/_/_/    _/    _/



     _/_/_/                                  _/            _/_/                        _/
  _/        _/  _/_/    _/_/      _/_/_/  _/_/_/_/      _/    _/    _/_/_/    _/_/_/      _/_/_/
 _/  _/_/  _/_/      _/_/_/_/  _/    _/    _/          _/_/_/_/  _/    _/  _/    _/  _/  _/    _/
_/    _/  _/        _/        _/    _/    _/          _/    _/  _/    _/  _/    _/  _/  _/    _/
 _/_/_/  _/          _/_/_/    _/_/_/      _/_/      _/    _/    _/_/_/    _/_/_/  _/  _/    _/
                                                                    _/
                                                               _/_/                                      
````
# KiWi Project
## Setting up your environment
### Prerequisites
You need following prerequisites before getting started with the project.
 * Yarn 1.9.4 or above: Faster alternative package manager for nodejs. Way better than NPM.
 * Pipenv: A package manager for Python. 
 * Python 3.6 (with sqlite-extension)
 * Node 10.0 or above
 * libspatialite
 * GDAL

In order to enable location-oriented query, you will need a both pyhton version with sqlite-extension compiled and libspatialite.

To get pyhton 3.6.2 with sqlite-extension enabled. you have to manually set compiler options to enable the feature. First off, make sure `pyenv` is installed (https://github.com/pyenv/pyenv). Then,
```bash
LDFLAGS="-L/usr/local/opt/sqlite/lib -L/usr/local/opt/zlib/lib" CPPFLAGS="-I/usr/local/opt/sqlite/include -I/usr/local/opt/zlib/include" PYTHON_CONFIGURE_OPTS="--enable-loadable-sqlite-extensions" pyenv install 3.6.2
```
Also you need to have libspatialite(https://www.gaia-gis.it/fossil/libspatialite/index) and gdal(https://github.com/OSGeo/gdal) installed. The way to build the libraries depends on OS, so check out website of libraries and manual.


### Building Workspace

First, you need to initialize develop environemnts for frontend. At the root working directory, type the following commands.
```bash
cd backend
pipenv sync --dev
```
Then, you need to migrate your database. Type these commands:
```bash
cd kiwi
pipenv run ./manage.py migrate
```

Likewise, at the root working directory, type the following commands for frontend to be set up.
```bash
cd frontend
yarn
```
You are now ready to roll!

## Running development servers
To run backend django server on port 8000, type the following command in the directory `backend/kiwi/`
```bash
pipenv run ./manage.py runserver
```

To run frontend angular server on port 4200, type the following command in the directory `frontend/`
```bash
yarn start
```

Then browse to `http://localhost:4200`.

## Git Workflow and Conventions
To cooperate efficiently, you need to keep several rules when you push your commits.

Rules:
- All commit shouldn't have any build-time error. It doesn't mean your commits must be bug-free. Rather, they should not crash at app build time or at server start.
- All unit test of a commit should pass, except for a hotfix.
- Describe your commit concisely to a commit message in plain english or korean. e.g. `Add a receipt panel in the page#3`. There is no strict rule, but it should faithfully explain what this commit is. So please don't do this:
  - Fix a bug, 버그 수정 : What did you fix?
  - Done!, 됐다! : Done what?
  - Wow! : Wow?
  - asdf : ...


Branch names follow the conventions described below:

- `master`: The main release branch. This branch will be used for the progress presentation & final presentation. Keep this clean and production-ready as possible.
- `develop`: This is main branch for development. This is merged into `master` branch at the end of sprint.
- `feature/<feature name>`: your work starts here. It can be merged into `develop` branch when finished. e.g. `feature/sprint1-page1`
- `issue/<number>`: bugfix for an issue. The name starts with `issue/`followed by issue number. e.g. `issue/12`

Feature or issue branches can be merged into `develop`, *only by Pull Request*. Code review is required before merge. Reviewer may accept your PR or point out potential bugs, design flaw, inconsistencies, or any other errors you've made. After review, you can fix problems and then request a review again, or discard the commit.

If you wanted to add a dashboard feature, You would take the following steps:
 1. Create a branch named `feature/dashboard` from `develop`. 
 1. Make a change and commit on the branch.
 1. Create a pull request in github and assign a reviewer to it.
 1. A reviewer leaves comments on changes you made.
 1. Revise your commit and ask for a review again
 1. After the reviewer accepts your pull request, your branch is automatically merged into `develop` branch.
 1. `git pull origin develop` to pull the merged `develop` branch on your laptop (optional)

It is proven to be a good practice to merge branches in one direction. For example, `develop` can be merged into `master`, not vice versa. Like, `feature/<feature name>` branch can be merged into develop, but not vice versa.
After you merge `develop` to `master`, `develop` branch should move on to the merged commit. In this case, simply delete `develop` branch and recreate `develop`. To wrap it up, following commands merge `develop` to `master` and make `develop` incorporate merged commit.

```bash
git checkout master
git merge develop
git branch -d develop
git branch develop
```

This practice will make your workflow simple and predictable. See  https://nvie.com/posts/a-successful-git-branching-model/ 

```
master (release) branch  ________________________________________________...
develop branch           _____________________________/    \_________/
feature branches         \______/  \______/  |   |
Issue branches                               \___/
```




## Coding Conventions
The style guidelines and best practices for our engineering team.

### Typescript Styles

---

- **2 spaces** for an indent
- **No unused variables**
- **Space after keywords**
    - **YES**: `if (condition) { ... }`
    - **NO**: `if(condition) { ... }`
- **Append `{` next to `if` , `while`, rather than on the next line.**
    - **YES**
    
            if (condition) { 
            } else if (condition2) {
            } else {
            }

    - **No**
    
            if (condition)
            { 
            }
            else if (condition2)
            {
            }
            else
            {
            }
- **Always use `===` instead of `==`**
    - **Exception**: `obj == null` is allowed to check `null || undefined` .

### Python Styles

---

- 4 spaces
- For other styles that are not specified in this file, it is recommended that you follow PEP 8

    [PEP 8 -- Style Guide for Python Code](https://www.python.org/dev/peps/pep-0008/)
    
