import React,{Component} from 'react';
import './PalabraAdivinada.css';

class PalabraAdivinada extends Component {
  constructor(props){
    super(props);
  }
  
  render()
  {
    return (
      <p id="Palabra-Adivinada">{this.props.PalabraAdivinada}</p>
    );
  } 
}

export default PalabraAdivinada;