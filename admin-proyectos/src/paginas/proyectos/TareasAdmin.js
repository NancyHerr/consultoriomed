import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import APIInvoke from '../../utils/APIInvoke'
import swal from 'sweetalert';

const TareasAdmin = () => {

    const [tareas, setTareas] = useState([]);

    const { idproyecto } = useParams();
    let arreglo = idproyecto.split('@');
    const idProyecto = arreglo[0];
    const nombreProyecto = arreglo[1];
    const tituloPagina = `Listado de Tareas: ${nombreProyecto}`;

    const cargarTareas = async () => {
        const response = await APIInvoke.invokeGET(`/api/tareas?proyecto=${idProyecto}`);
        //console.log(response.tareas);
        setTareas(response.tareas);
    }

    useEffect(() => {
        cargarTareas();
    }, [])

    const eliminarTarea = async (e, idTarea, idProyecto) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/tareas/${idTarea}?proyecto=${idProyecto}`);

        if (response.msg === 'Tarea eliminada') {
            const msg = "La tares fue borrada correctamente.";
            swal({
                title: 'Información',
                text: msg,
                icon: 'success',
                buttons: {
                    confirm: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-primary',
                        closeModal: true
                    }
                }
            });
            cargarTareas();
        } else {
            const msg = "La tarea no fue borrada correctamente.";
            swal({
                title: 'Error',
                text: msg,
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
        }

    }

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">

                <ContentHeader
                    titulo={tituloPagina}
                    breadCrumb1={"Listado de Proyectos"}
                    breadCrumb2={"Tareas"}
                    ruta1={"/proyectos-admin"}
                />

                <section className="content">

                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title"><Link to={`/tareas-crear/${idproyecto}`} className="btn btn-block btn-primary btn-sm">Crear Tarea</Link></h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                    <i className="fas fa-minus" />
                                </button>
                                <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                    <i className="fas fa-times" />
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ width: '10%' }}>Id</th>
                                        <th style={{ width: '75%' }}>Nombre</th>
                                        <th style={{ width: '15%' }}>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tareas.map(
                                            item =>
                                                <tr key={item._id}>
                                                    <td>{item._id}</td>
                                                    <td>{item.nombre}</td>
                                                    <td>
                                                        <Link to={`/tareas-editar/${item._id}@${item.nombre}@${item.proyecto}@${nombreProyecto}`} className="btn btn-sm btn-primary">Editar</Link>&nbsp;&nbsp;
                                                        <button onClick={(e) => eliminarTarea(e, item._id, item.proyecto)} className="btn btn-sm btn-danger">Borrar</button>
                                                    </td>
                                                </tr>
                                        )
                                    }

                                </tbody>
                            </table>

                        </div>
                    </div>

                </section>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default TareasAdmin;