 // Define la ruta base de la carpeta que contiene los archivos PDF
 let url = '/Recursos/Pdfs/';

 // Categorías y libros iniciales
 const conCategoría = [
     // CUENTO
     ['1', 'Entre cuento y cuento', 'CUENTO', 'URL-Spreaker', '/Recursos/Pdfs/ENTRE-CUENTO-Y-CUENTO.pdf', 'URL-video', '/Recursos/imagenes/libro9.webp'],
    //  ['2', 'Cuentos para desenredar enredos', 'CUENTO', 'URL-Spreaker', 'cuentos-para-desenredar-enredos.pdf', 'URL-video', '/Recursos/imagenes/libro7.webp'],
     ['3', 'Cuentos maravillosos', 'CUENTO', 'URL-Spreaker', '/Recursos/Pdfs/Cuentos-Maravillosos-4ta-Edicion.pdf', 'URL-video', '/Recursos/imagenes/libro3.webp'],
     ['4', 'Cuentos para contar', 'CUENTO', 'URL-Spreaker', '/Recursos/Pdfs/cuentos-para-contar.pdf', 'URL-video', '/Recursos/imagenes/libro10.webp'],

     //NIÑOS
     ['5', 'A que te cojo ratón', 'NIÑOS', 'URL-Spreaker', '/Recursos/Pdfs/A-QUE-TE-COJO-RATON.pdf', 'URL-video', '/Recursos/imagenes/libro16.webp'],
     ['6', 'Cuentos y pasatiempos', 'NIÑOS', 'URL-Spreaker', '/Recursos/Pdfs/Cuentos-y-pasatiempos.pdf', 'URL-video', '/Recursos/imagenes/libro25.webp'],
     ['7', 'Cuentos y maravillosos', 'NIÑOS', 'URL-Spreaker', '/Recursos/Pdfs/Cuentos-Maravillosos-4ta-Edicion.pdf', 'URL-video', '/Recursos/imagenes/libro3.webp'],

     //
 ];
 
 // Array de nuevos libros a agregar
 const nuevosLibros = [
     // ['', 'Nuevo Libro 1', 'Historia', 'URL-Spreaker-Ejemplo', '/PDFs/nuevo-libro-1.pdf', 'URL-video-ejemplo', '/Recursos/imagenes/nuevo-libro-1.webp'],
     // ['', 'Nuevo Libro 2', 'Juegos', 'URL-Spreaker-Ejemplo', '/PDFs/nuevo-libro-2.pdf', 'URL-video-ejemplo', '/Recursos/imagenes/nuevo-libro-2.webp']
 ];
 
 // Almacenar en localStorage
 localStorage.setItem('conCategoría', JSON.stringify(conCategoría));
 
 // Función para abrir un PDF en una nueva ventana
 function openPDF(pdfPath, title) {
     window.location.href = `/VerPdf/visor.html?pdf=${encodeURIComponent(pdfPath)}&title=${encodeURIComponent(title)}`;
 }
 
 // Función para descargar un PDF
 function downloadPDF(pdfPath) {
     let a = document.createElement('a');
     a.href = pdfPath;
     a.download = pdfPath.split('/').pop();
     document.body.appendChild(a);
     a.click();
     document.body.removeChild(a);
 }
 
 // Función para guardar un libro en Guardados
 function saveBook(title, imagePath, pdfPath) {
     let savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || [];
     if (savedBooks.some(book => book.title === title)) {
         alert('Este libro ya está guardado en Guardados.');
         return;
     }
     savedBooks.push({ title, image: imagePath, pdf: pdfPath });
     localStorage.setItem('savedBooks', JSON.stringify(savedBooks));
     alert(`¡Libro "${title}" guardado exitosamente en Guardados!`);
 }
 
 // Función para agregar un libro a Perfil
 function addToProfile(title, imagePath, pdfPath) {
     let profileBooks = JSON.parse(localStorage.getItem('profileBooks')) || [];
     if (profileBooks.some(book => book.title === title)) {
         alert('Este libro ya está guardado en Perfil.');
         return;
     }
     profileBooks.push({ title, image: imagePath, pdf: pdfPath });
     localStorage.setItem('profileBooks', JSON.stringify(profileBooks));
     alert(`¡Libro "${title}" agregado exitosamente en Favoritos!`);
 }
 
 // Función para agregar un libro dinámicamente
 function addBook(id, title, category, spreakerURL, pdfURL, videoURL, imageURL) {
     conCategoría.push([id, title, category, spreakerURL, pdfURL, videoURL, imageURL]);
     localStorage.setItem('conCategoría', JSON.stringify(conCategoría));
 
     let categoryContainer = document.querySelector(`#${category.toLowerCase()}-books`);
     if (!categoryContainer) {
         categoryContainer = document.createElement('div');
         categoryContainer.id = `${category.toLowerCase()}-books`;
         categoryContainer.classList.add('category-container');
 
         let heading = document.createElement('div');
         heading.classList.add('heading');
         let categoryTitle = document.createElement('h2');
         categoryTitle.classList.add('category-title');
         categoryTitle.textContent = category;
 
         heading.appendChild(categoryTitle);
         categoryContainer.appendChild(heading);
         document.getElementById('listalibros').appendChild(categoryContainer);
     }
 
     let divProductCard = document.createElement('div');
     divProductCard.classList.add('product-card');
 
     let divBook = document.createElement('div');
     divBook.classList.add('book');
 
     let h3 = document.createElement('p');
     h3.classList.add('product-name');
     h3.textContent = title;
     divBook.appendChild(h3);
 
     let img = document.createElement('img');
     img.src = imageURL;
     img.alt = 'Imagen del libro';
     img.classList.add('product-image');
     divBook.appendChild(img);
 
     let divIconos = document.createElement('div');
     divIconos.classList.add('iconos');
 
     let iHeart = document.createElement('i');
     iHeart.classList.add('bx', 'bx-heart');
     iHeart.setAttribute('onclick', `saveBook('${title}', '${imageURL}', '${pdfURL}')`);
 
     let iStar = document.createElement('i');
     iStar.classList.add('bx', 'bx-star');
     iStar.setAttribute('onclick', `addToProfile('${title}', '${imageURL}', '${pdfURL}')`);
 
     divIconos.appendChild(iHeart);
     divIconos.appendChild(iStar);
     divBook.appendChild(divIconos);
 
     let btnLeer = document.createElement('button');
     btnLeer.classList.add('boton');
     btnLeer.setAttribute('type', 'button');
     btnLeer.setAttribute('onclick', `openPDF('${pdfURL}', '${title}')`);
     btnLeer.innerHTML = `Leer <i class='bx bx-book-reader'></i>`;
     divBook.appendChild(btnLeer);
 
     let btnDescargar = document.createElement('button');
     btnDescargar.classList.add('boton');
     btnDescargar.setAttribute('type', 'button');
     btnDescargar.setAttribute('onclick', `downloadPDF('${pdfURL}')`);
     btnDescargar.innerHTML = `Descargar <i class='bx bx-download'></i>`;
     divBook.appendChild(btnDescargar);
 
     divProductCard.appendChild(divBook);
     categoryContainer.appendChild(divProductCard);
 }
 
 // Agregar los libros iniciales al cargar la página
 window.addEventListener('load', function() {
     conCategoría.forEach(libro => addBook(...libro));
     nuevosLibros.forEach(libro => addBook(...libro));
 });

 
  // Filtrar libros en función del texto ingresado en la búsqueda
  document.getElementById('search-input').addEventListener('input', function() {
    const searchQuery = this.value.toLowerCase();
    document.querySelectorAll('.product-card').forEach(function(card) {
        const title = card.querySelector('.product-name').textContent.toLowerCase();
        card.style.display = title.includes(searchQuery) ? 'inline-block' : 'none';
    });
});

function filterBooks(searchQuery) {
    searchQuery = searchQuery.toLowerCase();
    document.querySelectorAll('.product-card').forEach(function(card) {
        const title = card.querySelector('.product-name').textContent.toLowerCase();
        card.style.display = title.includes(searchQuery) ? 'inline-block' : 'none';
    });
}