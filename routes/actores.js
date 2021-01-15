//TRATAR DE QUE POR CADA TABLA SE TENGA UN ARCHIVO DE ROUTES PARA QUE SEA MAS ORGANIZADO Y ORDENADO
const {Router} = require('express');
const {cnn_mysql} = require('../config/database');
const router = Router();

//DEFINICION DE LOS SERVICIOS
router.get('/actor',(req, res)=>{
    cnn_mysql.query(`SELECT * FROM actores`, (error, resulset, fields)=>{
        if(error){
            return res.status(500).send('Se presentó un error en la base de datos')
        }else{
            return res.json(resulset)
        }
    });
});

//USO DE PROMESAS PARA LA CONSULTA DE 1 REGISTRO
router.get('/actor/:id', async(req, res)=>{
    const id = req.params.id
    const [rows] = await cnn_mysql.promise().query(`SELECT * FROM actores WHERE id = ?` ,[id]) //REVISAR EL TEMA DE CONSULTAS PRECOMPILADAS
    if(rows[0]){
        res.json(rows[0]);
    }else{
        res.json({});
    }
});

//ASYNC AWAIT PERMITE TRABAJAR DE UNA FORMA MAS CÓMODA Y EVITAR LOS CALLBACKS ANIDADOS

//OJO REVISAR EL REPO DEL PROFE : https://meet.google.com/linkredirect?authuser=0&dest=https%3A%2F%2Fgithub.com%2Fagileinnova%2Facademia

/* router.post('/actor', async (req, res) => {
    try {
        const {
            documento,
            tipo_documento,
            nombres,
            apellidos,
            contrasena,
            correo,
            telefono_celular,
            numero_expediente,
            genero,
            fecha_nacimiento,
            estado_actor_id,
            institucion_id,
            tipo_actor_id,
            fecha_creacion,
            fecha_actualizacion
        } = req.body
        const [affectedRows] = await cnn_mysql.promise().execute(`INSERT INTO actores(documento, tipo_documento, nombres, apellidos, contrasena, correo, telefono_celular, numero_expediente, genero, fecha_nacimiento, estado_actor_id, institucion_id, tipo_actor_id, fecha_creacion,fecha_actualizacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [documento, tipo_documento, nombres, apellidos, contrasena, correo, telefono_celular, numero_expediente, genero, fecha_nacimiento, estado_actor_id, institucion_id, tipo_actor_id, fecha_creacion, fecha_actualizacion]);

        if (r.af > 0) {
            res.json({
                id: r.insertId,
                documento: documento,
                tipo_documento: tipo_documento,
                nombres: nombres,
                apellidos: apellidos,
                contrasena: contrasena,
                correo: correo,
                telefono_celular: telefono_celular,
                numero_expediente: numero_expediente,
                genero: genero,
                fecha_nacimiento: fecha_nacimiento,
                estado_actor_id: estado_actor_id,
                institucion_id: institucion_id,
                tipo_actor_id: tipo_actor_id,
                fecha_creacion: fecha_creacion,
                fecha_actualizacion: fecha_actualizacion
            })
        } else {
            res.json({})
        }
    } catch (e) {
        res.status(500).json({errorCode: e.errno, message: "Error en el servidor"});
    }
}) */

router.put('/actor/:id',(req, res)=>{

});

router.patch('/actor/:id', async(req, res) => {
    try {
        if (Object.keys(req.body).length > 0) {
            const id = req.params.id
            let SQL = 'UPDATE actores SET '
            const params = []

            for (const elment in req.body) {
                SQL += `${elment} = ?, `
                params.push(req.body[elment])
            }
            SQL = SQL.slice(0, -2)
            SQL += ` WHERE id = ?`
            params.push(id)
           // console.log(SQL, params)
            let [rows] = await cnn_mysql.promise().execute(SQL, params)
            
            if (rows.affectedRows > 0) {
                [rows] = await cnn_mysql.promise().query(`SELECT * FROM actores WHERE id = ?`, [id])
                res.json(rows[0])
            }else{
                res.json({})
            }
        } else {
            res.status(401).json({ message: 'No existe campos a modificar' })
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ errorCode: e.errno, message: "Error en el servidor" })
    }
});

router.delete('/actor/:id',(req, res)=>{

});

//QUERY COMPLEJO DEL EJEMPLO FINAL:

//OJO REVISAR EL REPO DEL PROFE : https://meet.google.com/linkredirect?authuser=0&dest=https%3A%2F%2Fgithub.com%2Fagileinnova%2Facademia

/* SELECT a.documento, CONCAT(a.nombres, ' ', a.apellidos) nombreActor, ta.perfil AS perfilActor, g.grado, g.letra, m.modulo
FROM actores AS a
INNER JOIN tipo_actores AS ta ON ta.id = a.tipo_actor_id
JOIN integrantes_grupos AS ig ON ig.estudiante_id = a.id
JOIN grupos g ON g.id = ig.grupo_id
JOIN clases c ON c.grupo_id = g.id
JOIN modulos m ON m.id = c.docente_id
WHERE ta.id = 1 */

module.exports = router;