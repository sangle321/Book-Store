const Product = require('../models/product.model')

// - 1
module.exports.getProduct = async (req, res) => {
    // new book
    let page = parseInt(req.query.page) || 1;
    let perPage = 4 ;
    let start = (page-1) * perPage;
    let end = page * perPage;

    try {
        const [products, combos, mangas, doremons] = await Promise.all(
            [
                Product.find({'detail': 'newbook'}),
                Product.find({'detail': 'combo'}),
                Product.find({'detail': 'manga'}),
                Product.find({'detail': 'doremon'}),
            ]
        );
        res.render('products/product', {
            products: products.slice(start,end),
            combos: combos.slice(start, end),
            mangas: mangas.slice(start, end),
            doremons: doremons.slice(start, end)
        });
    }catch(err){
        console.log(err);
    }
}

module.exports.getNewBook = async (req, res)=>{
    let page = parseInt(req.query.page) || 1;
    let perPage = 15 ;
    let start = (page-1) * perPage;
    let end = page * perPage;

    const newBook = await Product.find({'detail': 'newbook'});

    res.render('products/newbook', {
        newbooks: newBook.slice(start, end)
    })

}
