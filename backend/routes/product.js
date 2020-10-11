const { Router } = require('express');
const router = Router();

const Product = require('../models/Product');

router.get('/all', async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

router.get('/featured/all', async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true });
    res.json({ products, success: true });
  } catch (error) {
    res.json({ msg: error.message, success: false });
  }
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

router.get('/:id', async (req, res) => {
  try {
    const product_id = req.params.id;
    const product = await Product.findById(product_id);
    res.json({ product, success: true });
  } catch (error) {
    res.json({ msg: error.message, success: false });
  }
});

router.post('/:id/edit', async (req, res) => {
  try {
    const product_id = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(product_id, {
      ...req.body,
    });
    console.log(updatedProduct);
    res.json({ product_id, updatedProduct, success: true });
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
});

router.delete('/:id/delete', async (req, res) => {
  try {
    const pid = req.params.id;
    await Product.findByIdAndRemove(pid);
    res.json({ pid, success: true });
  } catch (error) {}
});

module.exports = router;
