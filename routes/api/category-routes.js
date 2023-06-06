const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try{
    const categories = await Category.findAll({include: Product});
    res.json(categories);
  }
  catch(err){
    console.error(err);
    res.status(500).json({message: 'Server error'});
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try{
    const categories = await Category.findByPk(req.params.id, {
      include: Product,
    });
    if(!categories){
      res.status(404).json({message: 'No category found with this id!'});
      return;
    }
    res.status(200).json(categories);
  } catch(err){
    console.error(err);
    res.status(500).json(err);
  }
  // include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const categories = await Category.create(req.body);
    res.status(201).json(categories);
  } catch(err){
    console.error(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const categories = await Category.update({
      where:{
        id:req.params.id
      }
    });
    if(!categories){
      res.status(404).json({message: 'No category found with this id!'});
      return;
    }
    res.status(200).json(categories);
  } catch(err){
    console.error(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const categories = await Category.destroy({
      where:{
        id:req.params.id
      }
    });
    if(!categories){
      res.status(404).json({message: 'No category found with this id!'});
      return;
    }
    res.status(200).json(categories);
  } catch(err){
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
