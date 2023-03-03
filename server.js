const conectarse= require('./sql.js');


const servidor = require('express');
let servidores= servidor();
    servidores.listen(5000,()=>{ console.log ('esta corriendo exitosamente')});

//empiezacls


let alberca=[];


let temperatura=[];

let nivelAgua=[];
let bomba=[];

let alarma=[];


        conectarse.visualizarAlberca();
        conectarse.visualizarTemperatura();
        conectarse.visualizarNivelAgua();
        conectarse.visualizarBomba();
        conectarse.visualizarAlarma();

        servidores.get("/alberca",(req,res)=>{
      
      
         res.send(alberca);
     
                    res.end();
                
            });
            
            
            servidores.get("/alberca/:Idalberca",(req,res)=>{
              const varf= req.params.Idalberca; 
              let contador=0;

                    for (const resultado of alberca) {

                        
                        if(resultado.id == varf){
                            res.status(200).json(resultado);
                            contador=1;
                        } 
                       
                    }
                    if (contador==0){

                        res.send({"mensaje":"no se encontro el recurso"});
                    }
                    res.end();
                });
                servidores.get("/alberca1/:Idalberca",(req,res)=>{
                    const varf= req.params.Idalberca; 
                    let contador=0;
      
                          for (const resultado of alberca) {
      
                              
                              if(resultado.id == varf){
               let prueba=`{"id":"${resultado.id}","ancho":"${resultado.ancho}","largo":resultado.largo,"profundidad": resultado.profundidad,"ubicacion":resultado.ubicacion}`;
               prueba= "{\"id\":\"45\",\"ancho\":\"45\",\"largo\":\"45.36\",\"profundidad\":\"45\",\"dueno\":\"juan\",\"ubicacion\":\"CCD\"}";                 
               res.status(200).json(prueba);
                                  contador=1;
                              } 
                             
                          }
                          if (contador==0){
      
                              res.send({"mensaje":"no se encontro el recurso"});
                          }
                          res.end();
                      });
                
            servidores.post('/alberca',servidor.json({type:"*/*"}),(req,res)=>{
                const nuevo= req.body;
                nuevo.id=alberca[alberca.length-1].id+1;
                
             albercaAgregar(nuevo,nuevo.id)
              conectarse.insertarAlberca(nuevo.id,nuevo.ancho,nuevo.largo,nuevo.profundidad,nuevo.dueno,nuevo.ubicacion);
                //
                conectarse.visualizarAlberca();
                res.send({"mensaje":"se agrego nuevo recurso"});
            });

            servidores.delete('/alberca/:id',(req,res)=>{
                
                const id=req.params.id;
                let encontrado=false
                let contador=0;
                for (const resultado of alberca) {
                    contador++;
                    if(resultado.id == id){
                        conectarse.eliminarAlberca(id);
                        alberca.splice(contador-1,1);
                       
                        res.status(200).json({"mensaje":"se a borrado con exito"});
                        encontrado=true;
                    }
                    } 
             if(encontrado==false){
             
                res.status(404).json({"mensaje":"no existe"});
             
            }
            
        });
            
            servidores.post('/alberca/:id',servidor.json({type:"*/*"}),(req,res)=>{
                const id=req.params.id;
                const nuevo= req.body;
                let  contador;
               
                let existencia=false;
                    for (const valor of alberca) {
                    contador++;

                                    if(valor.id==id){

                                        
                                        contador= contador-1;
                                        conectarse.actualizarAlberca(id,nuevo.ancho,nuevo.largo,nuevo.profundidad,nuevo.dueno,nuevo.ubicacion);
                                       alberca=[];
                                      
                                        res.status(200).json({"mensaje":"se ha remplazado"});
                                        existencia=true;
                                    }
            }
            if(!existencia){
                    res.status(404).json({"mensaje":"no existe"});
                }});
               




            servidores.head('/alberca',(req,res)=>{
                res.json(alberca);
                let cal= JSON.stringify(req.headers)
               console.log(cal.connection);

            });

            servidores.put('/alberca/:id',servidor.json({type:"*/*"}),(req,res)=>{
                const id=req.params.id;
                const nuevo= req.body;
                let  contador;
               
                let existencia=false;
                    for (const valor of alberca) {
                    contador++;

                                    if(valor.id==id){

                                        
                                        contador= contador-1;
                                        conectarse.actualizarAlberca(nuevo.id,nuevo.ancho,nuevo.largo,nuevo.profundidad,nuevo.dueno,nuevo.ubicacion);
                                       alberca=[];
                                      
                                        res.status(200).json({"mensaje":"se ha remplazado"});
                                        existencia=true;
                                    }
            }
            if(!existencia){
                    res.status(404).json({"mensaje":"no existe"});
                }});
               



           
            //temperatura
            
        servidores.get("/temperatura",(req,res)=>{
      
      
            res.send(temperatura);
        
                       res.end();
                   
               });
            
                   
       servidores.get("/temperatura/:Id",(req,res)=>{
        const varf= req.params.Id; 
        let contador=0;

              for (const resultado of temperatura) {
                  if(resultado.id == varf){
                      res.status(200).json(resultado);
                      contador=1;
                  } 
                 
              }
              if (contador==0){

                  res.send({"mensaje":"no se encontro el recurso"});
              }
              res.end();
          });
               servidores.get("/TemperaturaAlberca/:Idalberca",(req,res)=>{
                const varf= req.params.Idalberca; 
                let contador=0;
                let albercaId=[];
                      for (const resultado of temperatura) {
  
                        
                          if(resultado.idAlberca == varf){
                              albercaId.push(resultado);
                             contador=1;
                          } 
                         
                      }
                      if (contador==0){
  
                          res.send({"mensaje":"no se encontro el recurso"});
                      }else{
  
                          res.status(200).json(albercaId[albercaId.length-1]);
                      }
                      res.end();
                  });
              servidores.post('/temperatura',servidor.json({type:"*/*"}),(req,res)=>{
                  const nuevo= req.body;
                  nuevo.id=temperatura[temperatura.length-1].id+1;
               temperaturaAgregar(nuevo,nuevo.id)
                conectarse.insertarTemperatura(nuevo.id,nuevo.temperatura,nuevo.idAlberca);
                temperatura=[];
                  conectarse.visualizarTemperatura();
                  res.send({"mensaje":"se agrego nuevo recurso"});
              });
  
              servidores.delete('/temperatura/:id',(req,res)=>{
                  
                  const id=req.params.id;
                  let encontrado=false
                  let contador=0;
                  for (const resultado of temperatura) {
                      contador++;
                      if(resultado.id == id){
                          conectarse.eliminarTemperatura(id);
                             temperatura.splice(contador-1,1);
                          res.status(200).json({"mensaje":"se a borrado con exito"});
                          encontrado=true;
                      
                     
  
                    
                      }
                      } 
               if(encontrado==false){
               
                  res.status(404).json({"mensaje":"no existe"});
               
              }
              
          });
              
              servidores.post('/temperaturaActualizar/:id',servidor.json({type:"*/*"}),(req,res)=>{
                  const id=req.params.id;
                  const nuevo= req.body;
                  let  contador;
                 
                  let existencia=false;
                      for (const valor of temperatura) {
                      contador++;
  
                                      if(valor.id==id){
  
                                          
                                          contador= contador-1;
                                          conectarse.actualizarTemperatura(nuevo.id,nuevo.temperatura);
                                      temperatura=[];
                                        
                                          res.status(200).json({"mensaje":"se ha remplazado"});
                                          existencia=true;
                                      }
              }
              if(!existencia){
                      res.status(404).json({"mensaje":"no existe"});
                  }});
                 
  
  
  
  
              servidores.head('/temperatura',(req,res)=>{
                  res.json(temperatura);
                  let cal= JSON.stringify(req.headers)
                 console.log(cal.connection);
  
              });

 //nivelAgua
 
 servidores.get("/nivelAgua",(req,res)=>{
      
      
    res.send(nivelAgua);

               res.end();
           
       });
       
           
       servidores.get("/nivelAgua/:Id",(req,res)=>{
        const varf= req.params.Id; 
        let contador=0;

              for (const resultado of nivelAgua) {
                  if(resultado.id == varf){
                      res.status(200).json(resultado);
                      contador=1;
                  } 
                 
              }
              if (contador==0){

                  res.send({"mensaje":"no se encontro el recurso"});
              }
              res.end();
          });
        
       servidores.get("/nivelAguaAlberca/:id",(req,res)=>{
         const varf= req.params.id; 
         let contador=0;
        let ultimo=[]
               for (const resultado of nivelAgua) {
                   
                if(resultado.idAlberca == varf){
                    ultimo.push(resultado);
                    contador=1;
                   } 
                  
               }
               if (contador==0){
                
                
                   res.send({"mensaje":"no se encontro el recurso"});
               }else{

                res.status(200).json(ultimo[ultimo.length-1]);
               }
               res.end();
           });
           
       servidores.post('/nivelAgua',servidor.json({type:"*/*"}),(req,res)=>{
           const nuevo= req.body;
           nuevo.id=nivelAgua[nivelAgua.length-1].id+1;
        nivelAguaAgregar(nuevo,nuevo.id)
         conectarse.insertarNivelAgua(nuevo.id,nuevo.nivel,nuevo.nivelOptimo,nuevo.nivelMedio,nuevo.nivelBajo,nuevo.idAlberca);
        nivelAgua=[];
           conectarse.visualizarNivelAgua();
           res.send({"mensaje":"se agrego nuevo recurso"});
       });

       servidores.delete('/nivelAgua/:id',(req,res)=>{
           
           const id=req.params.id;
           let encontrado=false
           let contador=0;
           for (const resultado of nivelAgua) {
               contador++;
               if(resultado.id == id){
                   conectarse.eliminarNivelAgua(id);
                  nivelAgua.splice(contador-1,1);
                   res.status(200).json({"mensaje":"se a borrado con exito"});
                   encontrado=true;
               
              

               conectarse.visualizarNivelAgua();
               }
               } 
        if(encontrado==false){
        
           res.status(404).json({"mensaje":"no existe"});
        
       }
       
   });
       
       servidores.put('/nivelAgua/:id',servidor.json({type:"*/*"}),(req,res)=>{
           const id=req.params.id;
           const nuevo= req.body;
           let  contador;
          
           let existencia=false;
               for (const valor of nivelAgua) {
               contador++;

                               if(valor.id==id){

                                   
                                   contador= contador-1;
                                   conectarse.actualizarNivelAgua(nuevo.id,nuevo.hora,nuevo.fecha,nuevo.nivel,nuevo.nivelOptimo,nuevo.nivelMedio,nuevo.nivelBajo,nuevo.idAlberca);
                                  nivelAgua=[];
                                 
                                   res.status(200).json({"mensaje":"se ha remplazado"});
                                   existencia=true;
                               }
       }
       if(!existencia){
               res.status(404).json({"mensaje":"no existe"});
           }});
          
           servidores.post('/nivelAgua/:id',servidor.json({type:"*/*"}),(req,res)=>{
            const id=req.params.id;
            const nuevo= req.body;
            let  contador;
           
            let existencia=false;
                for (const valor of nivelAgua) {
                contador++;
 
                                if(valor.id==id){
 
                                    
                                    contador= contador-1;
                                    conectarse.actualizarNivelAguanNivel(nuevo.id,nuevo.nivel);
                                   nivelAgua=[];
                                  
                                    res.status(200).json({"mensaje":"se ha remplazado"});
                                    existencia=true;
                                }
        }
        if(!existencia){
                res.status(404).json({"mensaje":"no existe"});
            }});
           
 



       servidores.head('/nivelAgua',(req,res)=>{
           res.json(nivelAgua);
           let cal= JSON.stringify(req.headers)
          console.log(cal.connection);

       });




      
 //bomba
 
 servidores.get("/bomba",(req,res)=>{
      
      
    res.send(bomba);

               res.end();
           
       });
       
       
       servidores.get("/bomba/:id",(req,res)=>{
         const varf= req.params.id; 
         let contador=0;

               for (const resultado of bomba) {
                   if(resultado.id == varf){
                       res.status(200).json(resultado);
                       contador=1;
                   } 
                  
               }
               if (contador==0){

                   res.send({"mensaje":"no se encontro el recurso"});
               }
               res.end();
           });
           servidores.get("/bomba",(req,res)=>{
      
      
            res.send(bomba);
        
                       res.end();
                   
               });
               
               
               servidores.get("/bombaAlberca/:id",(req,res)=>{
                 const varf= req.params.id; 
                 let contador=0;
                 let llenado;
                 let vaciado;
                 let id1,id2;
                       for (const resultado of bomba) {
                           if(resultado.idAlberca == varf){
                           contador=1;
                           
                           if(resultado.funcionamiento=="vacio"){
                            vaciado=resultado.estado;
                            id1=resultado.id
                           }else if(resultado.funcionamiento=="llenado"){
                            llenado=resultado.estado;
                            id2=resultado.id
                           }

                           }
                           
                       }
                       let prueba={bombaLlenado: llenado,bombaVaciado:vaciado,bombaVaciadoId:id1,bombaLlenadoId:id2}
                       res.status(200).json(prueba);
                       
                       if (contador==0){
        
                           res.send({"mensaje":"no se encontro el recurso"});
                       }
                       res.end();
                   });
           
       servidores.post('/bomba',servidor.json({type:"*/*"}),(req,res)=>{
           const nuevo= req.body;
           nuevo.id=bomba[bomba.length-1].id+1;
        bombaAgregar(nuevo,nuevo.id)
         conectarse.insertarBomba(nuevo.id,nuevo.estado,nuevo.funcionamiento,nuevo.idAlberca);
         bomba=[];
           conectarse.visualizarBomba();
           res.send({"mensaje":"se agrego nuevo recurso"});
       });

       servidores.delete('/bomba/:id',(req,res)=>{
           
           const id=req.params.id;
           let encontrado=false
           let contador=0;
           for (const resultado of bomba) {
               contador++;
               if(resultado.id == id){
                   conectarse.eliminarBomba(id);
                  bomba.splice(contador-1,1);
                   res.status(200).json({"mensaje":"se a borrado con exito"});
                   encontrado=true;
               }
               } 
        if(encontrado==false){
        
           res.status(404).json({"mensaje":"no existe"});
        
       }
       
   });
       
       servidores.put('/bomba/:id',servidor.json({type:"*/*"}),(req,res)=>{
           const id=req.params.id;
           const nuevo= req.body;
           let  contador;
          
           let existencia=false;
               for (const valor of bomba) {
               contador++;

                               if(valor.id==id){

                                   
                                   contador= contador-1;
                                   conectarse.actualizarBomba(nuevo.id,nuevo.estado,nuevo.funcionamiento,nuevo.idAlberca);
                                  bomba=[];
                                 
                                   res.status(200).json({"mensaje":"se ha remplazado"});
                                   existencia=true;
                               }
       }
       if(!existencia){
               res.status(404).json({"mensaje":"no existe"});
           }});

           servidores.post('/bombaLlenado/:id',servidor.json({type:"*/*"}),(req,res)=>{
            const id=req.params.id;
            const nuevo= req.body;
            let  contador;
           
            let existencia=false;
                for (const valor of bomba) {
                contador++;
 
                                if(valor.idAlberca==id && valor.funcionamiento=="llenado"){
 
                                    
                                    contador= contador-1;
                                    conectarse.actualizarBombaLlenado(parseInt(nuevo.idAlberca),nuevo.estado);
                                   bomba=[];
                                  
                                    res.status(200).json({"mensaje":"se ha remplazado"});
                                    existencia=true;
                                }
        }
        if(!existencia){
                res.status(404).json({"mensaje":"no existe"});
            }});
           
          

            servidores.post('/bombaVacio/:id',servidor.json({type:"*/*"}),(req,res)=>{
                const id=req.params.id;
                const nuevo= req.body;
                let  contador;
               
                let existencia=false;
                    for (const valor of bomba) {
                    contador++;
     
                                    if(valor.idAlberca==id && valor.funcionamiento=="vacio"){
     
                                        
                                        contador= contador-1;
                                        conectarse.actualizarBombaVacio(parseInt(nuevo.idAlberca),nuevo.estado);
                                       bomba=[];
                                      
                                        res.status(200).json({"mensaje":"se ha remplazado"});
                                        existencia=true;
                                    }
            }
            if(!existencia){
                    res.status(404).json({"mensaje":"no existe"});
                }});
               


       servidores.head('/bomba',(req,res)=>{
           res.json(bomba);
           let cal= JSON.stringify(req.headers)
          console.log(cal.connection);

       });



  
 //alarma
 servidores.get("/alarma",(req,res)=>{
      
      
    res.send(alarma);

               res.end();
           
       });
       
       servidores.get("/alarma/:id",(req,res)=>{
         const varf= req.params.id; 
         let contador=0;

               for (const resultado of alarma) {
                   if(resultado.id == varf){
                       res.status(200).json(resultado);
                       contador=1;
                   } 
                  
               }
               if (contador==0){

                   res.send({"mensaje":"no se encontro el recurso"});
               }
               res.end();
           });
           
       servidores.post('/alarma',servidor.json({type:"*/*"}),(req,res)=>{
           const nuevo= req.body;
           nuevo.id=alarma[alarma.length-1].id+1;
        alarmaAgregar(nuevo,nuevo.id)
         conectarse.insertarAlarma(nuevo.id,nuevo.descripcion,nuevo.idAlberca,nuevo.idBomba,nuevo.idNivelAgua,nuevo.idTemperatura);
        alarma=[];
           conectarse.visualizarAlarma();
           res.send({"mensaje":"se agrego nuevo recurso"});
       });

       servidores.delete('/alarma/:id',(req,res)=>{
           
           const id=req.params.id;
           let encontrado=false
           let contador=0;
           for (const resultado of alarma) {
               contador++;
               if(resultado.id == id){
                   conectarse.eliminarAlarma(id);
                  alarma.splice(contador-1,1);
                   res.status(200).json({"mensaje":"se a borrado con exito"});
                   encontrado=true;
               }
               } 
        if(encontrado==false){
        
           res.status(404).json({"mensaje":"no existe"});
        
       }
       
   });
       
       servidores.put('/alarma/:id',servidor.json({type:"*/*"}),(req,res)=>{
           const id=req.params.id;
           const nuevo= req.body;
           let  contador;
          
           let existencia=false;
               for (const valor of alarma) {
               contador++;

                               if(valor.id==id){

                                   
                                   contador= contador-1;
                                   conectarse.actualizarAlarma(nuevo.id,nuevo.hora,nuevo.fecha,nuevo.descripcion,nuevo.idAlberca,nuevo.idBomba,nuevo.idNivelAgua,nuevo.idTemperatura);
                                  alarma=[];
                                 
                                   res.status(200).json({"mensaje":"se ha remplazado"});
                                   existencia=true;
                               }
       }
       if(!existencia){
               res.status(404).json({"mensaje":"no existe"});
           }});
          




       servidores.head('/alarma',(req,res)=>{
           res.json(alarma);
           let cal= JSON.stringify(req.headers)
          console.log(cal.connection);

       });




     






function albercaAgregar(aqui,id){
    let existencia=0
    for (const muestra of alberca) {
        if(muestra.id==id){
            existencia=1;
 console.log('ya existe');
        }
    }
    if (existencia==0){

        alberca.push(aqui);

    } 
    
}

function temperaturaAgregar(aqui,id){
    let existencia=0
    for (const muestra of temperatura) {
        if(muestra.id==id){
            existencia=1;

        }
    }
    if (existencia==0){

       temperatura.push(aqui);

    } 
    
}






function nivelAguaAgregar(aqui,id){
    let existencia=0
    for (const muestra of nivelAgua) {
        if(muestra.id==id){
            existencia=1;
 console.log('ya existe');
        }
    }
    if (existencia==0){

        nivelAgua.push(aqui);

    } 
    
}
function bombaAgregar(aqui,id){
    let existencia=0
    for (const muestra of bomba) {
        if(muestra.id==id){
            existencia=1;
 console.log('ya existe');
        }
    }
    if (existencia==0){

        bomba.push(aqui);

    } 
    
}


function alarmaAgregar(aqui,id){
    let existencia=0
    for (const muestra of alarma) {
        if(muestra.id==id){
            existencia=1;
 console.log('ya existe');
        }
    }
    if (existencia==0){

    alarma.push(aqui);

    } 
    
}


exports.albercaAgregar=albercaAgregar;
exports.temperaturaAgregar=temperaturaAgregar;
exports.nivelAguaAgregar=nivelAguaAgregar;
exports.bombaAgregar=bombaAgregar;
exports.alarmaAgregar=alarmaAgregar;





   


















