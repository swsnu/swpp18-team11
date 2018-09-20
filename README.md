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
You need following requirements before getting started with the project.
 * Yarn 1.9.4 or above: Faster alternative package manager which replaces NPM.
 * Pipenv: A brand-new package manager for Python.
 * Python 3.6
 * Node 10.0 or above

It is assumed that you already have those requirements installed on your labtop.

First, you need to initialize dev environemnts for frontend. At the root working directory, type the following.
```bash
cd backend
pipenv sync
```
Then, you need to migrate your database. Type this:
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
- All commit shouldn't have any build-time error. It doesn't mean your commits must be bug-free. Rather, it means they should not crash at app build time or the beginning of server start.
- Describe your commit concisely in plain english or korean. e.g. `Add a receipt panel in the page#3`. But please don't
  - Fix a bug, 버그 수정 : What did you fix?
  - Done!, 됐다! : Done what?
  - Wow! : Wow?
  - asdf : ...


Branch names follow the conventions described below:

- `master`: The main release branch. This branch will be used for the progress presentation & last presentation. Keep this clean and production-ready as possible.
- `develop`: This is main branch for development. This is merged into `master` branch at the end of sprint.
- `feature/<feature name>`: your work starts here. It can be merged into `develop` branch when finished. e.g. `feature/sprint1-page1`
- `issue/<number>`: bugfix for an issue. The name starts with `issue/`followed by issue number. e.g. `issue/12`

Feature or issue branches can be merged only into `develop`, *only by Pull Request*. Code review is required before merge. Reviewer may accept your PR or point out potential bugs, design flaw, inconsistencies, or any other errors you've made. After review, you can fix problems and then request a review again, or discard the commit.


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
    
