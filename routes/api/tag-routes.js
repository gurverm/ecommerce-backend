const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  try{
    const tags = await Tag.findAll({include:Product});
    res.json(tags);
  } catch(err){
    console.error(err);
    res.status(500).json({message:"Server error"});
  }
  // be sure to include its associated Product data
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  try{
    const tags = await Tag.findByPk(req.params.id,{include:Product});
    if(!tags){
      res.status(404).json({message:'Tag not found!'});
      return;
    }
    res.json(tags);
  } catch(err){
    console.error(err);
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.post("/", async (req, res) => {
  // create a new tag
  try{
    const tags = await Tag.create(req.body);
    res.status(201).json(tags);
  } catch(err){
    console.error(err);
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try{
    await Tag.update({tag_name:req.params.tag_name},{
      where:{
        id:req.params.id,
      },
    });
    const updatedTag = await Tag.findByPk(req.params.id);
    res.json(updatedTag);
  } catch(err){
    console.error(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try{
    await Tag.destroy({
      where:{
        id: req.params.id,
      },
    });
    res.json("Tag deleted");
  } catch(err){
    console.error(err);
    res.status(500).json(err)
  }
});

module.exports = router;
