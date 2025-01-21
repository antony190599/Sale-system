# **¿Qué es el DOM?**

El **DOM (Document Object Model)** es una interfaz de programación que los navegadores usan para representar y manipular páginas web. Convierte el HTML y CSS en una estructura jerárquica que JavaScript puede leer y modificar.

---

## **Puntos clave:**

- **Estructura Jerárquica:**
  Representa los elementos de la página como un árbol de nodos (elementos, atributos, texto, etc.).

- **Funciones Principales:**
  - **Leer:** Obtener información de los elementos.
  - **Actualizar:** Modificar contenido o estilos.
  - **Agregar:** Insertar nuevos elementos.
  - **Eliminar:** Remover elementos existentes.

- **Cómo Funciona:**
  - Cada etiqueta HTML es un **nodo**.
  - El nodo raíz es `<html>`.
  - Los nodos hijos incluyen `<head>`, `<body>`, y sus respectivos descendientes.

---

## **Ejemplo:**

### **HTML**

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>Hola, Mundo</h1>
    <p>Este es un párrafo.</p>
  </body>
</html>
```