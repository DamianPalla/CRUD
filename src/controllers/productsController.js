const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', { productos: products })
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let idProducto = req.params.id
		let productoBuscado = null;

		for (let o of products) {
			if (o.id == idProducto) {
				productoBuscado = o;
				break;
			}
		}

		if (productoBuscado != null) {
			res.render('detail', { producto: productoBuscado });
		} else {
			res.send('Error al buscar producto');
		}
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},

	// Create -  Method to store
	store: (req, res) => {
		let datos = req.body // USO EL METODO req.body PARA REQUERIR TODOS LOS DATOS QUE LLEGAN DEL FORMULARIO
		idNuevoProducto = (products[products.length - 1].id) + 1
		let imagenNuevoProducto = 'qqqqqq.jpg'
		let nuevoProducto = {
			"id": idNuevoProducto,
			"name": datos.name, // se usa datos.XXXXX ya que en datos esta guardado todo el req.body que trae todas las claves y valores del producto a crear
			"price": parseInt(datos.price),  // y con datos ya podemos llamar a cada una
			"discount": parseInt(datos.discount),
			"category": datos.category,
			"description": datos.description,
			"image": imagenNuevoProducto
		}
		products.push(nuevoProducto)
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "), 'utf-8')
		res.redirect('/')
	},

	// Update - Form to edit
	edit: (req, res) => {
		let idProductoEditado = req.params.id // me da el id
		let productoEditado = null;

		for (let o of products) {
			if (idProductoEditado == o.id) {
				productoEditado = o;
				break
			}
		}

		if (productoEditado != null) {
			res.render('product-edit-form', { productoEditado: productoEditado })
		} else {
			res.send('Producto no encontrado')
		}
	},

	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		// Do the magic
	}
};

module.exports = controller;