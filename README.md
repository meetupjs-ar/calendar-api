# calendar-api

[![Build Status](https://travis-ci.org/meetupjs-ar/calendar-api.svg?branch=master)](https://travis-ci.org/meetupjs-ar/calendar-api)

Microservicio que devuelve los eventos de tecnología en Buenos Aires

[calendar-api](http://calendar-api.now.sh/)

## Como funciona

-   Utiliza [google-spreadsheet-api](https://github.com/meetupjs-ar/google-spreadsheet-api), [meetup-api](https://github.com/meetupjs-ar/meetup-api) y [eventbrite-api](https://github.com/meetupjs-ar/eventbrite-api) para obtener eventos de diversas fuentes
-   Descarta eventos de días anteriores
-   Agrupa por mes y los ordena por fecha

## Desarrollo

```bash
npm install
npm run dev
```

## Licencia

MIT
