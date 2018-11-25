FROM python:3.7.1-stretch

EXPOSE 3031
VOLUME /usr/src/app/kiwi/media
VOLUME /usr/src/app/kiwi/database
WORKDIR /usr/src/app

RUN pip install pipenv
RUN apt-get update && apt-get install -y curl libtiff5-dev libjpeg62-turbo-dev zlib1g-dev \
        libproj-dev libgeos-dev libspatialite-dev libsqlite3-mod-spatialite gdal-bin \
        libfreetype6-dev liblcms2-dev libwebp-dev tcl8.6-dev tk8.6-dev python-tk python3-dev

COPY Pipfile Pipfile
COPY Pipfile.lock Pipfile.lock
RUN pipenv install --system --deploy --ignore-pipfile

COPY . .
RUN cd kiwi && ./manage.py collectstatic --no-input

CMD cd kiwi && uwsgi \
    --processes 4 \
    --threads 3 \
    --wsgi-file kiwi/wsgi.py \
    --http :$PORT

