import React,{Component} from 'react';
import Imagen from './Imagen';
import PalabraAdivinada from './PalabraAdivinada';
import Botonera from './Botonera';


class Ahorcado extends Component { 
  constructor(props){
    super(props);

    this.getBotoneraVacia =this.getBotoneraVacia.bind(this);//BOTONES
    this.sePulsoBoton =this.sePulsoBoton.bind(this);
    this.getPalabraAAdivinar = this.palabraAAdivinar.bind(this);
    this.getPalabraAdivinada = this.getPalabraAdivinada.bind(this);

    let palabraAAdivinar = this.getPalabraAAdivinar();


    this.state={
      numFallos:0,
      numAciertos:0,
      palabraAAdivinar: palabraAAdivinar,
      //alabraAdivinada: palabraAAdivinar,
      PalabraAdivinada:this.getPalabraAdivinada(palabraAAdivinar),
      botones: this.getBotoneraVacia()
      

    };
  }


  getPalabraAdivinada(palabra){
    console.log("getPalabraAdivinada")
    let guiones="";
    for (let i = 0; i<palabra.length;i++){
      guiones+="-";

    }
    return guiones;

  }

  palabraAAdivinar(){// API
    console.log("palabraAAdivinar")
    let palabras = [ "CARACOLA", "ESPECIMEN", "PERSONA" ];
    let numAleatorio = Math.floor(Math.random() * palabras.length);
    let palabra = palabras[numAleatorio];
    console.log(palabra)
    return palabra;
  }

  getBotoneraVacia(){
    //BOTONES 
    console.log("getBotoneraVacia")
    let letras = [
      "A", "B", "C", "D", "E", "F", "G",
      "H", "I", "J", "K", "L", "M", "N", 
      "Ñ", "O", "P", "Q", "R", "S", "T", 
      "U", "V", "W", "X", "Y", "Z"
    ];

    let botones = [];

    botones = letras.map((l) => ({ letra: l, estado: "no-pulsado"}));//aarray de objetos conla letra y el estado del boton

    console.log(botones)
    return botones;

  }

  sePulsoBoton(i){
      console.log("sePulsoBoton")
      
      let letra = this.state.botones[i].letra;
      let botonesAux =this.state.botones;
      console.log("sePulsoBoton")
      console.log(letra)
      console.log(botonesAux)
      if(this.hayAcierto(letra)){
        botonesAux[i].estado ="pulsado-acertado";
        this.setState((prevState) => ({
          botones: botonesAux
        }));
      }else{
        botonesAux[i].estado ="pulsado-no-acertado";
        this.setState((prevState) => ({
          numFallos: ++(prevState.numFallos),
          botones: botonesAux
        }));
      }
    //alert(i)//MENSAJE

  }

  componentDidUpdate(){
    console.log("componentDidUpdate")
    if(this.state.numAciertos === this.state.palabraAAdivinar.length){
      console.log(this.state.palabraAAdivinar.length)
      alert("ganaste")
      this.reinicializar();
    }
    if(this.state.numFallos===6){
      console.log(this.state.palabraAAdivinar.length)
      alert("Perdiste")
      this.reinicializar();
    }
  }


  reinicializar(){
    console.log("reinicializar")
    let palabraAAdivinar = this.getPalabraAAdivinar();
    
    this.setState({
      numFallos: 0,
      numAciertos: 0,
      palabraAAdivinar: palabraAAdivinar,
      PalabraAdivinada:this.getPalabraAdivinada(palabraAAdivinar),
      botones: this.getBotoneraVacia()
    }); 

  }

  hayAcierto(letra){
    console.log("hayAcierto")
    //console.log(this.state.palabraAAdivinar)
    let acierto = false;
    console.log(this.state.palabraAAdivinar.length)
    for (let i =0; i<this.state.palabraAAdivinar.length; i++){//recorre la palabra
      //console.log(i)
      if(this.state.palabraAAdivinar.charAt(i)===letra){
        console.log(letra)
        this.setState((prevState)=>({
          numAciertos:++ (prevState.numAciertos),
          PalabraAdivinada: 
          prevState.PalabraAdivinada.substr(0, i) +
          letra +
          prevState.PalabraAdivinada.substr(i+1) 
        }));
        acierto= true;
      } 
    }
    return acierto;
  }

  render() {
    return (
        <div>
          <Imagen numFallos={this.state.numFallos}/>
          <PalabraAdivinada
            PalabraAdivinada={this.state.PalabraAdivinada}/>
          <Botonera sePulsoBoton={(i) => this.sePulsoBoton(i)} botones={this.state.botones}/>  
        </div>
    );
  }

}

export default Ahorcado;