const path = require("path");
const fs = require("fs");
const multer = require("multer");
const { Image } = require("../models");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, "../images");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

exports.uploadImage = (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    try {
      const imageUrl = req.file.path.replace(/\\/g, "/");
      const { productId } = req.body;

      const newImage = await Image.create({
        productId,
        imageUrl,
      });

      res.status(201).json(newImage);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
};

exports.getImage = async (req, res) => {
  try {
    const image = await Image.findByPk(req.params.id);
    if (image) {
      res.status(200).json(image);
    } else {
      res.status(404).json({ message: "Image not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateImage = async (req, res) => {
  try {
    const image = await Image.findByPk(req.params.id);
    console.log(image.imageUrl);

    if (image) {
      fs.unlinkSync(image.imageUrl);
    }

    upload.single("image")(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      const url = req.file.path.replace(/\\/g, "/");

      const [updated] = await Image.update(
        { imageUrl: url },
        {
          where: { imageId: req.params.id },
        }
      );
      console.log(updated);

      if (updated) {
        const updatedImage = await Image.findByPk(req.params.id);
        res.status(200).json(updatedImage);
      } else {
        res.status(404).json({ message: "Image not found" });
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const image = await Image.findByPk(req.params.id);
    if (image) {
      
      fs.unlinkSync(image.imageUrl);

      await Image.destroy({
        where: { imageId: req.params.id },
      });
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Image not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
