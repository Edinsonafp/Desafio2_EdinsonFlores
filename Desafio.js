const fs = require('fs')

class Contenedor {
    constructor(archivo){
        this.archivo = archivo
        this.objects = JSON.parse(fs.readFileSync(this.archivo,'utf-8'))
    }

    save(object){
        if(this.objects.length>0){
            object.id = this.objects.at(-1).id + 1 
        }else{
            object.id = 1
        }   
        this.objects.push(object)
        fs.writeFileSync(this.archivo, JSON.stringify(this.objects))
        return(object.id)
    }

    getById(id){
        return this.objects.find( object => object.id === id)
    }

    getAll(){
        return this.objects
    }

    deleteById(id){
        const index = this.objects.findIndex( object => object.id === id)
        this.objects.splice(index, 1)
        fs.writeFileSync(this.archivo, JSON.stringify(this.objects))
    }

    deleteAll(){
        this.objects = []
        fs.writeFileSync(this.archivo, JSON.stringify(this.objects))
    }

}

const contenedor = new Contenedor('Productos.txt') 
/*console.log(contenedor.objects)
console.log(contenedor.save({                                                                                                                                                    
    "title": "Test",                                                                                                                              
    "price": 111,                                                                                                                                     
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",                                          
    "id": 0                                                                                                                                              
  }))
console.log(contenedor.getById(2))
console.log(contenedor.getAll())
contenedor.deleteById(3)
console.log(contenedor.objects)
contenedor.deleteAll()
console.log(contenedor.objects)*/

const express = require('express')

const app = express()
const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
   console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))

app.get('/productos', (req, res) => {
    res.send(contenedor.getAll())
 })

app.get('/productoRandom', (req, res) => {
    res.send(contenedor.getById(Math.floor(Math.random() * contenedor.objects.length)))
 })


 