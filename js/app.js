



document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    const productList = document.getElementById('productList');
    const clientForm = document.getElementById('clientForm');
    const clientList = document.getElementById('clientList');
    const saleForm = document.getElementById('saleForm');
    const saleClient = document.getElementById('saleClient');
    const saleProduct = document.getElementById('saleProduct');
    const saleProductList = document.getElementById('saleProductList');
    const saleTotal = document.getElementById('saleTotal');
    const addProductButton = document.getElementById('addProduct');

    let products = [];
    let clients = [];
    let saleProducts = [];
    let total = 0;

    productForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const productName = document.getElementById('productName').value;
        const productPrice = document.getElementById('productPrice').value;
        const productStock = document.getElementById('productStock').value;

        const productRow = document.createElement('tr');
        productRow.innerHTML = `
            <td>${productName}</td>
            <td>${productPrice}</td>
            <td>${productStock}</td>
            <td>
                <button class="btn btn-warning btn-sm update-stock">Actualizar Stock</button>
            </td>
        `;

        productList.appendChild(productRow);

        products.push({ name: productName, price: productPrice, stock: productStock });
        updateProductOptions();

        const stockCell = productRow.cells[2]; // Celda del stock
        const updateStockButton = productRow.querySelector('.update-stock');

        // Evento para el botón "Actualizar Stock"
        updateStockButton.addEventListener('click', () => {
            const offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasWithBothOptions'));
            offcanvas.show();

            document.getElementById('stockInput').value = stockCell.textContent;

            // Configurar el botón de guardar dentro del offcanvas
            const saveButton = document.getElementById('saveStock');
            saveButton.onclick = () => {
                const newStock = document.getElementById('stockInput').value;
                stockCell.textContent = newStock; // Actualizar el valor en la tabla
                offcanvas.hide(); // Cerrar el offcanvas
            };
        });

        productForm.reset();
    });

    

    clientForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const clientName = document.getElementById('clientName').value;
        const clientEmail = document.getElementById('clientEmail').value;

        const clientRow = document.createElement('tr');
        clientRow.innerHTML = `
            <td>${clientName}</td>
            <td>${clientEmail}</td>
            <td>
                <button class="btn btn-warning btn-sm update-email">Actualizar Email</button>
            </td>
        `;

        clientList.appendChild(clientRow);

        clients.push({ name: clientName, email: clientEmail });
        updateClientOptions();

        clientRow.querySelector('.update-email').addEventListener('click', () => {
            const newEmail = prompt('Ingrese el nuevo email:', clientEmail);
            if (newEmail !== null) {
                clientRow.cells[1].innerText = newEmail;
            }
        });

        clientForm.reset();
    });

    addProductButton.addEventListener('click', () => {
        const selectedProduct = saleProduct.value;
        const quantity = parseInt(document.getElementById('saleQuantity').value);

        const product = products.find(p => p.name === selectedProduct);
        if (product && product.stock >= quantity) {
            saleProducts.push({ name: selectedProduct, quantity, price: product.price });
            product.stock -= quantity;
            updateSaleProductList();
            updateTotal();
        } else {
            alert('Stock insuficiente');
        }
    });

    saleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (saleProducts.length > 0) {
            alert('Venta confirmada');
            saleProducts = [];
            updateSaleProductList();
            updateTotal();
            saleForm.reset();
        } else {
            alert('No hay productos en la venta');
        }
    });

    function updateProductOptions() {
        saleProduct.innerHTML = '';
        products.forEach(product => {
            const option = document.createElement('option');
            option.value = product.name;
            option.textContent = product.name;
            saleProduct.appendChild(option);
        });
    }

    function updateClientOptions() {
        saleClient.innerHTML = '';
        clients.forEach(client => {
            const option = document.createElement('option');
            option.value = client.name;
            option.textContent = client.name;
            saleClient.appendChild(option);
        });
    }

    function updateSaleProductList() {
        saleProductList.innerHTML = '';
        saleProducts.forEach(product => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.textContent = `${product.name} - Cantidad: ${product.quantity} - Precio: $${product.price}`;
            saleProductList.appendChild(listItem);
        });
    }

    function updateTotal() {
        total = saleProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0);
        saleTotal.textContent = total.toFixed(2);
    }
});


const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

searchButton.onclick = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const rows = productList.getElementsByTagName("tr")

    for (let i = 0; i < rows.length; i++) {

        const productName = rows[i].children[0].textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }

    }


}

const sortButton = document.getElementById("sortButton");
let isAscendent = true;

sortButton.onclick = () => {
    const rows = Array.from(productList.getElementsByTagName("tr"));
    rows.sort((rowA, rowB) => {
        const stockA = +rowA.children[1].textContent;
        const stockB = +rowB.children[2].textContent;
    
        if (isAscendent) {
            return stockA - stockB;
        } else {
            return stockB - stockA;
        }
    })

    //Alterar el orden en el proximo click
    isAscendent = !isAscendent;

    //Limpiar tabla y agregar filas
    productList.innerHTML = "";
    rows.forEach(row =>
        productList.appendChild(row));
    }