# CuboRemotoFront

## Descripción

Front sencillo para comunicarse con el proceso remoto del cubo con NodeJS+17

usa el puerto 80

`docker build . -t cuboserv-docker`

`docker run -p 8080:80 --name cuboserv -d cuboserv-docker`
