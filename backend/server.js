const express = require('express');
const fs = require('fs');
const app = express();
const carro =
//setando para o node seja capaz de ler json diretamente
app.use(express.json())
//setando o cabeçalho CORS
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

//REST
app.post('/api/carros',(req,res) => {
  var listaCarros = JSON.parse(fs.readFileSync('./Database/listacarros.json', 'utf8'));
  listaCarros.push(req.body);
  fs.writeFileSync('./Database/listacarros.json', JSON.stringify(listaCarros), 'utf8');
  res.send({
    message: 'Carro adicionado com sucesso'
  })
})
app.get('/api/carros',(req,res) => {
  var listaCarros = JSON.parse(fs.readFileSync('./Database/listacarros.json', 'utf8'));
  res.send(listaCarros);
})
app.delete('/api/carros:id',(req,res) =>{
  var listaCarros = JSON.parse(fs.readFileSync('./Database/listacarros.json', 'utf8'));
  if( listaCarros.findIndex(aux => aux.id == req.params.id) != -1 ){
    var id = req.params.id;
    listaCarros = listaCarros.filter(aux =>  {return aux.id != id})
    fs.writeFileSync('./Database/listacarros.json', JSON.stringify(listaCarros), 'utf8');
    res.send({
      message: 'Registro removido',
      id: id
    })
  }else{
    res.send({
      message:'Registro nao esta presente na lista',
      id: req.params.id
    })
  }
})
app.put('/api/carros',(req,res) =>{
  var listaCarros = JSON.parse(fs.readFileSync('./Database/listacarros.json', 'utf8'));
  var posicao = listaCarros.findIndex(aux => aux.id == req.body.id);
  if( posicao != -1 ){
    var carro = req.body;
    for (let index in listaCarros[posicao]){
      if(carro[index]){
        listaCarros[posicao][index] = carro[index];
      }
    }
    fs.writeFileSync('./Database/listacarros.json', JSON.stringify(listaCarros), 'utf8');
    res.send({
      message: 'alteracao feita com sucesso'
    })
  }else{
    res.send({
      message: 'Registro nao existe na lista',
      id: req.body.id
    })
  }
})

app.listen(3000,() => console.log('server ativo na porta 3000...'))
