import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();

app.use(express.json());

const port = 7777;

app.get("/self_improvement", async (_req, res) =>{
    try{
        const self_improvement = await prisma.self_improvement.findMany();
        if (!self_improvement) throw new Error("Bukunya Tidak Ada");
        res.send (self_improvement);

    } catch (err){
        res.send({ status: 404, message: err.message});
    }
});

app.get("/self_improvement/:id", async (req, res) => {
    try{
        const self_improvement = await prisma.self_improvement.findUnique({
            where:{
                id: parseInt(req.params.id),
            },
        });
        if (!self_improvement) throw new Error("Buku Tidak Tersedia");
        res.send (self_improvement);
    } catch(err){
        res.send({status:404, message:err.message});
    }
});

app.post("/self_improvement/create", async(req, res) =>{
    try{
        const self_improvement = await prisma.self_improvement.create({
            data:{
                title: req.body.title,
                author: req.body.author,
                publisher: req.body.publisher,
                publication_year: req.body.publication_year,
            },
        });
    res.send ({message: "Data Buku Berhasil Ditambahkan", data: self_improvement})
    } catch (err){}
});


app.put("/self_improvement/update/", async (req, res) => {
    try {
      const self_improvement = await prisma.self_improvement.update({
        where: {
          id: req.body.id,
        },
        data: {
          title: req.body.title,
          author: req.body.author,
          publisher: req.body.publisher,
          publication_year: req.body.publication_year,
        },
      });
      res.send({ message: "Berhasil Memperbaharui Data Buku", data: self_improvement });
    } catch (err) {}
  });
  
  app.delete("/self_improvement/delete", async (req, res) => {
    await prisma.self_improvement.delete({
      where: {
        id: req.body.id,
      },
    });
    res.send({ message: "Berhasil Menghapus Data Buku" });
  });

app.listen(port, () => {
    console.log(`Aplikasi nya jalan di port ${port}`);
  
});
