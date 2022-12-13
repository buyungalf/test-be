module.exports = (sequelize, Sequelize) => {
  const Data = sequelize.define("data", {
    nama: {
      type: Sequelize.STRING,
    },
    gambar: {
      type: Sequelize.STRING,
    },
    gambar_small: {
      type: Sequelize.STRING,
    },
    usia: {
      type: Sequelize.STRING,
    },
    tgl_lahir: {
      type: Sequelize.DATE,
    },
    telp: {
      type: Sequelize.STRING,
    },
    kota: {
      type: Sequelize.STRING,
    },
    pendidikan: {
      type: Sequelize.STRING,
    },
  });

  return Data;
};
