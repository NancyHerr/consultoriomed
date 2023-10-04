import React, { useState, useEffect } from 'react';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import { useNavigate, useParams } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke'
import swal from 'sweetalert';

const TareasEditar = () => {

    const navigate = useNavigate();

    const { idproyecto } = useParams();
    let arreglo = idproyecto.split('@');
    const idTarea = arreglo[0];
    const nombreTarea = arreglo[1];
    const idProyecto = arreglo[2];
    const nombreProyecto = arreglo[3];
    const tituloPagina = `Edición de Tareas: ${nombreProyecto}`;

    const [tareas, setTareas] = useState({
        nombre: nombreTarea
    });

    const { nombre } = tareas;

    useEffect(() => {
        document.getElementById("nombre").focus();
    }, [])

    const onChange = (e) => {
        setTareas({
            ...tareas,
            [e.target.name]: e.target.value
        })
    }

    const editarTarea = async () => {
        let arreglo = idproyecto.split('@');
        const idTarea = arreglo[0];
        const nombreTarea = arreglo[1];
        const idProyecto = arreglo[2];
        const nombreProyecto = arreglo[3];

        const data = {
            proyecto: idProyecto,
            nombre: tareas.nombre,
            estado: false
        }

        const response = await APIInvoke.invokePUT(`/api/tareas/${idTarea}`, data);
        const idTareaEditado = response.tarea._id;

        if (idTareaEditado !== idTarea) {
            const msg = "La tarea no fue editada correctamente.";
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
        } else {
            navigate(`/tareas-admin/${idProyecto}@${nombreProyecto}`);
            const msg = "La tarea fue editada correctamente.";
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
        }

    }

    const onSubmit = (e) => {
        e.preventDefault();
        editarTarea();
    }

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">

                <ContentHeader
                    titulo={tituloPagina}
                    breadCrumb1={"Listado de Tareas"}
                    breadCrumb2={"Edición"}
                    ruta1={`/tareas-admin/${idProyecto}@${nombreProyecto}`}
                />

                <section className="content">
                    <div className="card">
                        <div className="card-header">
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

                            <form onSubmit={onSubmit}>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="nombre">Nombre</label>
                                        <input type="text"
                                            className="form-control"
                                            id="nombre"
                                            name="nombre"
                                            placeholder="Ingrese el nombre de la tarea"
                                            value={nombre}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary">Editar</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </section>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default TareasEditar;