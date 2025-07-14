import { useState } from "react"

export const ToDo = () => {

    const [tarea, setTarea] = useState("")
    const [lista, setLista] = useState([])

    const agregarTarea = (e) => {
        e.preventDefault();


        const nuevaTarea = {
            texto: tarea,
            completada: false
        };

        setLista([...lista, nuevaTarea]);
        setTarea("");
    };

    const eliminarTarea = (index) => {
        const nuevaLista = [

            ...lista.slice(0, index),
            ...lista.slice(index + 1)

        ];
        setLista(nuevaLista);
    };

    const tareaTerminada = (index) => {
        const tareaSeleccionada = { ...lista[index], completada: true };
        const listaSinTarea = lista.filter((_, i) => i !== index);
        setLista([...listaSinTarea, tareaSeleccionada]);
    };

    return (
        <>
            <h1 className="text-center mt-5 mb-5 text-primary">Lista de Tareas</h1>
            <main className="container">
                <form onSubmit={agregarTarea} action="">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="¿Que necesitas hacer?"
                        value={tarea}
                        onChange={(e) => setTarea(e.target.value)}
                    />

                </form>
                <ul className="list-group">
                    {lista.length === 0 ?
                        (<li className="list-group-item text-muted">
                            No hay tareas pendientes
                        </li>)
                        :
                        (lista.map((item, index) => (
                            <li
                                key={index}
                                className={`list-group-item d-flex justify-content-between align-items-center ${item.completada ? "bg-success text-white" : ""}`}
                                style={{textDecoration: item.completada ? "line-through" : "none"}}
                            >
                                {item.texto}
                                <div>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => eliminarTarea(index)}
                                >
                                    ❌
                                </button>
                                <button
                                    className="btn btn-sm btn-success"
                                    onClick={() => tareaTerminada(index)}
                                    style={{ display: item.completada ? "none" : "inline-block" }}

                                >
                                    ✔️

                                </button>
                                </div>
                            </li>
                        ))
                        )}
                </ul>
            </main>
        </>
    )
}