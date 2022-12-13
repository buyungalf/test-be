var express = require("express");
var router = express.Router();
var sharp = require("sharp");
var path = require("path");

const db = require("../models");
const Data = db.Data;

let directory = path.join(
  __dirname,
  "../",
  "public",
  "images",
  "resized",
  new Date().getTime() + ".jpeg"
);
/* GET home page. */
router.get("/", function (req, res, next) {
  Data.findAll()
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      res.json({
        info: "Error",
        msg: err,
      });
    });
});

router.post("/", async (req, res, next) => {
  if (!req.file) {
    res.json({ msg: "Image not found" });
  }
  sharp(req.file.path).resize(500).jpeg({ quality: 80 }).toFile(directory);
  var mobil = {
    nama: req.body.nama,
    gambar: req.file.path,
    gambar_small:
      "public" +
      "\\" +
      "images" +
      "\\" +
      "resized" +
      "\\" +
      path.basename(directory),
    usia: req.body.usia,
    tgl_lahir: req.body.tgl_lahir,
    telp: req.body.telp,
    kota: req.body.kota,
    pendidikan: req.body.pendidikan,
  };
  Data.create(mobil)
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      res.json({ info: "Error", msg: err });
    });
});
//update
router.put("/:id", function (req, res, next) {
  const id = req.params.id;
  let mobil = {};
  if (!req.file) {
    mobil = {
      nama: req.body.nama,
      usia: req.body.usia,
      tgl_lahir: req.body.tgl_lahir,
      telp: req.body.telp,
      kota: req.body.kota,
      pendidikan: req.body.pendidikan,
    };
  } else {
    sharp(req.file.path).resize(500).jpeg({ quality: 80 }).toFile(directory);
    mobil = {
      nama: req.body.nama,
      gambar: req.file.path,
      gambar_small:
        "public" +
        "\\" +
        "images" +
        "\\" +
        "resized" +
        "\\" +
        path.basename(directory),
      usia: req.body.usia,
      tgl_lahir: req.body.tgl_lahir,
      telp: req.body.telp,
      kota: req.body.kota,
      pendidikan: req.body.pendidikan,
    };
  }
  Data.update(mobil, {
    where: { id: id },
  })
    .then((num) => {
      if (num > 0) {
        res.send({
          msg: "Update success!",
        });
      } else {
        res.status(404).send({
          msg: "Update failed",
        });
      }
    })
    .catch((err) => {
      res.json({
        info: "Error",
        message: err.message,
      });
    });
});

module.exports = router;
