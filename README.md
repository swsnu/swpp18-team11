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
```
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
