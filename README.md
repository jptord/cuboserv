# CuboRemotoFront

## Descripción

Front sencillo para comunicarse con el proceso remoto del cubo con NodeJS+17


```
linux EXIF_BIN=/opt/exiftool/exiftool
windows EXIF_BIN=c:\exiftool\exiftool.exe
```

## Instalación

```
git clone https://gitlab.pragmainvest.com.bo/jtordoya/cuboremotofront.git cuboremotofront
cd cuboremotofront
npm install
node app.js
```

si desea cambiar puerto editar el app.js en la línea 16:
```
line16    const port = 80;
```

## Docker

En base a node:18:
Ejemplo

`docker build . -t cuboserv-docker`

`docker run -p 8080:80 --name cuboserv -d cuboserv-docker`
