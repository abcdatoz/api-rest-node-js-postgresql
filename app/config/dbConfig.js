// module.exports = {
//     HOST: 'localhost',
//     USER: 'postgres',
//     PASSWORD: 'W3st3rn',
//     DB: 'atwa',
//     dialect: 'postgres',
//     pool: {
//         max: 5,
//         min: 0,
//         acquire:30000,
//         idle:1000
//     }
// };


module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "W3st3rn",
    DB: "atwa",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };



  import React, { useEffect, useState } from 'react'
import { Button } from 'semantic-ui-react';


interface IVentas {
    id: number, 
    cliente: number, 
    fecha: Date, 
    importe: number
 }

 interface ICliente {
    id: number,     
    nombre: string
 }


 interface ISemana {
    numerosemana: number;
    inicio: String;
    fin: String;
  }

  interface IWeek {
    numerosemana: number;
    inicio: Date;
    fin: Date;
    modo: number;
    mes: number
  }


  

const Data = () => {
  
    const [semanas, setSemanas] = useState<IWeek[]>([])
    const [ventas, setVentas] = useState<IVentas[]>([])
    const [clientes, setClientes] = useState<ICliente[]>([
        {id: 1, nombre: 'Client ABC'},
        {id: 2, nombre: 'Client QWE'},
        {id: 3, nombre: 'Client PQR'},
        {id: 4, nombre: 'Client XYZ'},
        {id: 5, nombre: 'Client CH&WSTR'},
    ])

    const [mes, setMes] = useState(1)


    useEffect(() => {
      llenarVentas()
      
    }, [])
    

    const randomDate = (start: Date, end: Date): Date => {
        const diff = end.getTime() - start.getTime();
        const randomDiff = Math.floor(Math.random() * diff);
        const randomDate = new Date(start.getTime() + randomDiff);
        return randomDate;
    }

    const randomImporte = (): number => {
        const min = 1000;
        const max = 25000;
        const random = Math.random();
        const scaled = random * (max - min) + min;
        return Math.floor(scaled);
    }

    const llenarVentas = () =>{
        let arr:IVentas[] = []

        const startDate = new Date('2024-01-01');
        const endDate = new Date('2024-06-30');
        

        for (let i = 0; i < 100; i++) {
            
            const generatedDate = randomDate(startDate, endDate);
            const importe = randomImporte();


            let venta:IVentas = {
            id: i + 1,
            cliente: Math.floor(Math.random() * 5) + 1, 
            fecha: generatedDate, 
            importe: importe
            };
            arr.push(venta);
        } 

        let arr2 = arr.sort ((a,b) => {
            
            if (a.fecha < b.fecha)
                return -1
            
                if (a.fecha > b.fecha)
                return 1

                return 0
        }) 

        setVentas(arr2)        
        setSemanas(getWeeks(2024))
    }
 
       

     const getWeeks = (anio: number) =>{
        let primerDia = new Date(anio, 0, 1); // Meses van de 0 a 11
        const ultimoDia = new Date(anio, 11, 31); // Último día del año        
        let tomorrow = new Date(anio, 0, 1); 

        let arr:IWeek[] = []
        let i = 1
       
        
        while (tomorrow.toLocaleDateString() !== ultimoDia.toLocaleDateString() ){
            
            if (tomorrow.getDay() === 0){                


                let domingo  = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate()); 

                if(primerDia.getMonth() === tomorrow.getMonth()  ){


                    
                    

                    arr.push({numerosemana: i, 
                        inicio: primerDia, 
                        fin: domingo,
                        modo: 0,
                        mes: primerDia.getMonth() + 1
                    })
              
                        

                }else{

                    var lastDayOfMonth = new Date(anio, primerDia.getMonth() + 1, 0);
                    var firstDayOfNextMonth = new Date(anio, primerDia.getMonth() + 1, 1);
                    
                    arr.push({numerosemana: i, 
                        inicio: primerDia, 
                        fin: lastDayOfMonth,
                        modo: 1,
                        mes: primerDia.getMonth() + 1
                    })

                    i++

                    arr.push({numerosemana: i, 
                        inicio: firstDayOfNextMonth, 
                        fin: domingo,
                        modo: 2,
                        mes: primerDia.getMonth() + 2
                    })

                }

                
                
                i++
                primerDia  = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate()); 
                primerDia.setDate(primerDia.getDate() + 1)    
                
                
            }

            tomorrow.setDate(tomorrow.getDate() + 1)
            
        }

        arr.push({numerosemana: i, 
                    inicio: primerDia, 
                    fin: ultimoDia,
                    modo: 1,
                    mes: 12
                })
        
        
        return(arr)

     }


    const interseccion =  (cliente:number, inicio: Date, fin: Date) => {
        

        let _ini = inicio.getDate()
        let _fin = fin.getDate()


        let arr = ventas.filter( element => element.cliente == cliente 
                                    && element.fecha.getFullYear() == inicio.getFullYear()
                                    && element.fecha.getMonth() == inicio.getMonth()
                                    )
        let suma = 0
        arr.forEach(element => {
            
            let fecha = element.fecha.getDate()

            if (fecha >= _ini && fecha <= _fin)
                suma+= element.importe

        });

        return suma;

        // let arr = ventas.filter(element => { 
        //     return element.cliente == cliente && element.fecha >= inicio  &&  element.fecha <= fin 
        // } )

        // if (arr ){

        //     console.log(inicio.getDate())
        //     console.log(fin.getDate())
        //     console.log(arr)

        //     let suma =  arr.map(item => item.importe).reduce((prev, curr) => prev + curr,0)

        //     return suma
        // }



        return 0

    }



    const tableByMes = (mes: number) => (
        <table>
                    <thead>
                    <tr  >
                            <th>Cliente</th>
                            {
                                semanas
                                    .filter(x=>x.mes === mes)
                                    .map( p =>(
                                        
                                               <th  style={{ width: '200px' }}>{p.inicio.toLocaleDateString()} - {p.fin.toLocaleDateString()} {p.mes}  </th> 
                                        
                                    ))
                            }
                        
                        </tr>
                        
                    </thead>
                    <tbody>
                        {
                            clientes.map(cli => (
                                <tr key={cli.id}>
                                    <td>{cli.nombre}</td>

                                    {
                                       semanas
                                        .filter(x=>x.mes === mes)
                                        .map( p =>(                                        
                                               <td style={{ width: '200px' }}> {interseccion(cli.id, p.inicio, p.fin)} </td> 
                                        
                                            ))
                                    }
                                </tr>
                            ))
                        }
                    
                    </tbody>
                    </table>
    )

  return (
    <div>
        
        <br />
                {/* <Button type='submit' onClick={llenarVentas}>enviar</Button>                
                <Button type='submit' onClick={() => {setVentas([]); setSemanas([]) } }>clean()</Button> */}

                <select 
                            className="form-control"
                            onChange = { (e: any) => { setMes(e.target.value);   }         }
                            value= {mes}  >
                            <option value="1">enero</option>                                
                            <option value="2">febrero</option>                                
                            <option value="3">marzo</option>                                
                            <option value="4">abril</option>                                
                            <option value="5">mayo</option>                                
                            <option value="6">junio</option>                                
                            
                        
                    </select>


                        {tableByMes (1)}
                        <br />
                        {tableByMes (2)}
                        <br />
                        {tableByMes (3)}

                        
                        <br />
                        <br />

                <table>
                    {
                        ventas.map(x => (
                            <tr key={x.id}>
                                <td style={{ width: '200px' }}>{ clientes.filter(c=> c.id == x.cliente)[0].nombre }</td>
                                <td style={{ width: '200px' }}>{x.fecha.toLocaleDateString()}</td>
                                <td style={{ width: '200px' }}>{  x.importe}</td>
                            </tr>
                        ))
                    }
                </table>


 

    </div>
  )
}

export default Data