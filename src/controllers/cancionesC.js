import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getHtml = (req, res) => {
  const filePath = path.resolve(__dirname, "../index.html");
  res.sendFile(filePath);
};

const getCanciones = (req, res) => {
  try {
    const filePath = path.resolve(__dirname, "../repertorio.json");
    const canciones = JSON.parse(fs.readFileSync(filePath, "utf8"));
    res.status(200).json(canciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error" });
  }
};

const postCanciones = (req, res) => {
  try {
    const cancion = req.body;
    const filePath = path.resolve(__dirname, "../repertorio.json");
    const canciones = JSON.parse(fs.readFileSync(filePath, "utf8"));
    canciones.push(cancion);
    fs.writeFileSync(filePath, JSON.stringify(canciones, null, 2));
    res.status(201).json(cancion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "No está disponible" });
  }
};
const putCancion = (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const filePath = path.resolve(__dirname, "repertorio.json");
    let canciones = JSON.parse(fs.readFileSync(filePath, "utf8"));
    canciones = canciones.map((cancion) =>
      cancion.id === parseInt(id) ? newData : cancion
    );
    fs.writeFileSync(filePath, JSON.stringify(canciones, null, 2));
    res.status(200).json(newData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "No está disponible" });
  }
};

const deleteCancion = (req, res) => {
  try {
    const id = req.params.id;
    const filePath = path.resolve(__dirname, "../repertorio.json");
    let canciones = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const cancionEliminada = canciones.find(
      (cancion) => cancion.id === parseInt(id)
    );
    if (!cancionEliminada) {
      return res.status(404).json({ message: "Canción no encontrada" });
    }
    canciones = canciones.filter((cancion) => cancion.id !== parseInt(id));
    fs.writeFileSync(filePath, JSON.stringify(canciones, null, 2));
    res
      .status(200)
      .json({
        message: "Canción eliminada correctamente",
        cancion: cancionEliminada,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la canción" });
  }
};

export { getHtml, getCanciones, postCanciones, putCancion, deleteCancion };
