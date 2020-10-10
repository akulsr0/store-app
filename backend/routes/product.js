const { Router } = require('express');
const router = Router();

const Product = require('../models/Product');

router.get('/all', async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

router.post('/add-product', async (req, res) => {
  try {
    const {
      title,
      actualPrice,
      currentPrice,
      category,
      shortDescription,
      longDescription,
      images,
    } = req.body;
    const productObj = {
      title,
      price: { actualPrice, currentPrice },
      category,
      description: { short: shortDescription, long: longDescription },
      images: images.split(',').map((img) => img.trim()),
    };
    const product = new Product(productObj);
    await product.save();
    res.json({ product, success: true });
  } catch (error) {
    res.json({ msg: error.message, success: false });
  }
});

module.exports = router;
