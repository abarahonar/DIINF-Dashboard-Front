# Organización

Existen 3 vistas hasta el momento: ~Error.vue~, ~Home.vue~ y ~Login.vue~. Al momento, la página hace uso de redireccionamiento para denegar acceso a rutas inexistentes o rutas que necesitan autorización. El comportamiento se reumene de la siguiente manera: 

* Si uno no se encuentra autenticado e intenta acceder a la página a través de '/', será redireccionado a '/login'. 
* Si es que se intenta acceder a '/login' y ya se encuentra autenticado, será redirrecionado a '/home'.
* Si ingresa a una ruta que inexistente, será redirrecionado a '/error'.
  

# Comandos importantes

## Instalar dependencias
```
npm install
```

### Live server
```
npm run serve
```

### Build
```
npm run build
```