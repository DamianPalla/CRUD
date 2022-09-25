const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json'); // le asigno una variable al archivo json con todos los productos
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); // leo el archivo json con todos los productos para poder usarlo

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		res.render('index', { productos: products })
	},
	search: (req, res) => {
		res.send("Ya casi!")
	},
};
 
module.exports = controller;
