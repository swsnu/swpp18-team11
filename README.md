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
