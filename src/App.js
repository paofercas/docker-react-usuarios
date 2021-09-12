//import firebase from './firebase'
import fireDB from './firebase';
import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

class App extends Component{
  state={
    data: [],
    modalInsertar:false,
    modalEditar:false,
    form:{
      id_usuario: '',
      nombre_usuario: '',
      cedula_usuario: '',
      telefono_usuario: '',
      mail_usuario: ''
    },
    id:0
  }
  

  peticionGet=()=>{
        fireDB.child('TBL_USUARIO').on('value', (id_usuario)=>{ //.child("TBL_USUARIO").on("value",(id_usuario) =>{
        if (id_usuario.val()!= null){
          this.setState({...this.state.data,data:id_usuario.val()});
        }else{
          this.setState({data:[]});
        }
    });
  }

  peticionPost=()=>{
    fireDB.child('TBL_USUARIO').push(this.state.form,
      error=>{
        if(error)console.log(error)
      });
      this.setState({modalInsertar: false});
  }

  peticionPut=()=>{
    fireDB.child(`TBL_USUARIO/${this.state.id}`).set(
      this.state.form,
      error=>{
        if (error) console.log(error);
      });
      this.setState({modalEditar:false});
  }

  peticionDelete=()=>{
    if(window.confirm(`Estás seguro que deseas eliminar el usuario ${this.state.form && this.state.form.nombre_usuario}?`))
    {
    fireDB.child(`TBL_USUARIO/${this.state.id}`).remove(
      error=>{
        if(error)console.log(error)
      });
    }
  }

  handleChange=e=>{
    this.setState({form:{
      ...this.state.form,
      [e.target.name]: e.target.value
    }})
    console.log(this.state.form);
  }

  seleccionarUsuario=async(nombre_usuario, id, opcion)=>{

    await this.setState({ form: nombre_usuario, id: id });

    (opcion==="Editar")?this.setState({modalEditar: true}):
    this.peticionDelete()

  }

  componentDidMount(){
    this.peticionGet();
  }

  render(){
    return (
      <div className="App" >
        <br />
          <button className="btn btn-success" onClick={()=>this.setState({modalInsertar:true})}>Insertar</button>
        <br />
        <br />

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID Usrario</th>
              <th>Nombre</th>
              <th>Cédula</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.state.data).map(i=>{
              //console.log(i);
              return <tr key={i}>
                <td>{this.state.data[i].id_usuario}</td>
                <td>{this.state.data[i].nombre_usuario}</td>
                <td>{this.state.data[i].cedula_usuario}</td>
                <td>{this.state.data[i].telefono_usuario}</td>
                <td>{this.state.data[i].mail_usuario}</td>
                <td>
                  <button className="btn btn-primary" onClick={()=>this.seleccionarUsuario(this.state.data[i],i, 'Editar')}>Editar</button> {"   "}
                  <button className="btn btn-danger"  onClick={()=>this.seleccionarUsuario(this.state.data[i],i, 'Eliminar')}>Eliminar</button>
                </td>

              </tr>
            })}
          </tbody>
        </table>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>Insertar Registro</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Id Usuario: </label>
              <br />
               <input type="text" className="form-control" name="id_usuario" onChange={this.handleChange}/>
              <br />
              <label>Nombre: </label>
              <br />
               <input type="text" className="form-control" name="nombre_usuario" onChange={this.handleChange}/>
              <br />
              <label>Cédula: </label>
              <br />
              <input type="text" className="form-control" name="cedula_usuario" onChange={this.handleChange}/>
              <br />
              <label>Teléfono </label>
              <br />
              <input type="text" className="form-control" name="telefono_usuario" onChange={this.handleChange}/>
              <br />
              <label>Email</label>
              <br />
              <input type="text" className="form-control" name="mail_usuario" onChange={this.handleChange}/>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={()=>this.peticionPost()}>Insertar</button>{"   "}
            <button className="btn btn-danger" onClick={()=>this.setState({modalInsertar: false})}>Cancelar</button>
      </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>Editar Registro</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Nombre: </label>
              <br />
               <input type="text" className="form-control" name="nombre_usuario" onChange={this.handleChange} value={this.state.form && this.state.form.nombre_usuario}/>
              <br />
              <label>Cédula: </label>
              <br />
              <input type="text" className="form-control" name="cedula_usuario" onChange={this.handleChange} value={this.state.form && this.state.form.cedula_usuario}/>
              <br />
              <label>Teléfono </label>
              <br />
              <input type="text" className="form-control" name="telefono_usuario" onChange={this.handleChange} value={this.state.form && this.state.form.telefono_usuario}/>
              <br />
              <label>Email</label>
              <br />
              <input type="text" className="form-control" name="mail_usuario" onChange={this.handleChange} value={this.state.form && this.state.form.mail_usuario}/>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={()=>this.peticionPut()}>Editar</button>{"   "}
            <button className="btn btn-danger" onClick={()=>this.setState({modalEditar: false})}>Cancelar</button>
          </ModalFooter>
        </Modal>


      </div>
   
      );
  }
 
}

export default App;
