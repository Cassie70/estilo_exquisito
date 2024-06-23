// backend/uploadHandler.js

import multer from 'multer';
import path from 'path';
import connection from "./database.js"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    const { nombre } = req.body;
    const productId = 1; // Aquí podrías modificar para que productId sea dinámico si es necesario
    cb(null, `imagen_${productId}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

const handleFileUpload = (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      console.error('Error uploading file:', err);
      return res.status(500).send('Server error');
    }

    const { nombre, descripcion, precio } = req.body;
    const imagenUrl = `uploads/${req.file.filename}`;

    const query = 'INSERT INTO Productos (nombre, descripcion, precio, imagen_url) VALUES (?, ?, ?, ?)';
    const values = [nombre, descripcion, precio, imagenUrl];
    try {
        connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Error inserting into database:', err);
            res.status(500).send('Server error');
            return;
        }

        res.json({ message: 'File uploaded and product saved!', productId: result.insertId });
        });
    } catch (err) {
        console.error('Error inserting into database:', err);
        res.status(500).send('Server error');
    }
  });
};

export { handleFileUpload };
