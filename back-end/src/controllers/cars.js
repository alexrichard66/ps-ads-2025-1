// Importando o Prisma Client
import prisma from '../database/client.js'

const controller = {}   // Objeto vazio

// Criando um novo carro
controller.create = async function (req, res) {
  try {
    await prisma.car.create({ data: req.body })

    // HTTP 201: Created
    res.status(201).end()
  }
  catch(error) {
    console.log(error)

    // HTTP 500: Internal Server Error
    res.status(500).end()
  }
}

controller.retrieveAll = async function (req, res) {
  try {
    const result = await prisma.car.findMany()

    // HTTP 200: OK (implícito)
    res.send(result)

  }
  catch(error) {
    console.log(error)

    // HTTP 500: Internal Server Error
    res.status(500).end()
  }
}

controller.retrieveOne = async function(req, res) {
  try {
    const result = await prisma.car.findUnique({
      where: { id: Number(req.params.id) }
    })

    // Encontrou: retorna HTTP 200: OK
    if(result) res.send(result)
    // Não encontrou: retorna HTTP 404: Not Found
    else res.status(404).end()
  }
  catch(error) {
    console.log(error)

    // HTTP 500: Internal Server Error
    res.status(500).end()
  }
}

controller.update = async function(req, res) {
  try {
    const result = await prisma.car.update({
      where: { id: Number(req.params.id) },
      data: req.body
    })

    // Encontrou e atualizou: retorna HTTP 204: No Content
    if(result) res.status(204).end()
    // Não encontrou (e não atualizou): retorna HTTP 404: Not Found
    else res.status(404).end()
  }
  catch(error) {
    console.log(error)

    // HTTP 500: Internal Server Error
    res.status(500).end()
  }
}

controller.delete = async function (req, res) {
  try {
    const result = await prisma.car.delete({
      where: { id: Number(req.params.id) }
    })

    // Encontrou e excluiu ~> HTTP 204: No Content
    if(result) res.status(204).end()
    // Não encontrou (e não excluiu) ~> HTTP 404: Not Found
    else res.status(404).end()
  }
  catch(error) {
    console.log(error)

    // HTTP 500: Internal Server Error
    res.status(500).end()
  }
}

export default controller