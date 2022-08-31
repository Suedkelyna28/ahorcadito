import React,{Component} from 'react';

class Imagen extends Component {
  constructor(props){
    super(props);
    this.getNombreImagen = this.getNombreImagen.bind(this);
  }

  getNombreImagen(){
    return "img/" + this.props.numFallos +".PNG";
  }
  
  render()
  {
    return (
      <img src={this.getNombreImagen()} alt='Ahorcado' />
    );
  } 
}

export default Imagen;