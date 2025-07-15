import { useState } from "react";

export const ToDo = () => {
	const [tarea, setTarea] = useState("");
	const [lista, setLista] = useState([]);
	const [modoEdicion, setModoEdicion] = useState(false);
	const [indiceEditando, setIndiceEditando] = useState(null);

	const agregarTarea = (e) => {
		e.preventDefault();

		if (modoEdicion) {
			const nuevaLista = [...lista];
			nuevaLista[indiceEditando].texto = tarea;
			setLista(nuevaLista);
			setModoEdicion(false);
			setIndiceEditando(null);
		} else {
			const nuevaTarea = {
				texto: tarea,
				completada: false,
			};
			setLista([nuevaTarea, ...lista]);
		}

		setTarea("");
	};

	const eliminarTarea = (index) => {
		const nuevaLista = [
			...lista.slice(0, index),
			...lista.slice(index + 1),
		];
		setLista(nuevaLista);
	};

	const tareaTerminada = (index) => {
		const tareaSeleccionada = { ...lista[index], completada: true };
		const listaSinTarea = lista.filter((_, i) => i !== index);
		setLista([...listaSinTarea, tareaSeleccionada]);
	};

	const modificarTarea = (index) => {
		setModoEdicion(true);
		setIndiceEditando(index);
		setTarea(lista[index].texto);
	};

	return (
		<>
			<h1 className="text-center mt-5 mb-5 text-primary">Lista de Tareas</h1>
			<main className="container">
				<form onSubmit={agregarTarea}>
					<input
						className="form-control"
						type="text"
						placeholder={modoEdicion ? "Edita tu tarea" : "¿Qué necesitas hacer?"}
						value={tarea}
						onChange={(e) => setTarea(e.target.value)}
					/>
					{modoEdicion && (
						<button className="btn btn-warning mt-2" type="submit">
							Guardar edición
						</button>
					)}
				</form>
				<ul className="list-group mt-3">
					{lista.length === 0 ? (
						<li className="list-group-item text-muted">No hay tareas pendientes</li>
					) : (
						lista.map((item, index) => (
							<li
								key={index}
								className={`list-group-item d-flex justify-content-between align-items-center ${item.completada ? "bg-success text-white tarea-completada" : ""}`}
							>
								{item.texto}
								<div>
									<button
										className="btn btn-sm btn-primary me-2"
										onClick={() => modificarTarea(index)}
										style={{
											display: item.completada ? "none" : "inline-block",
										}}
									>
										✏️
									</button>
									<button
										className="btn btn-sm btn-danger me-2"
										onClick={() => eliminarTarea(index)}
									>
										❌
									</button>
									<button
										className="btn btn-sm btn-success"
										onClick={() => tareaTerminada(index)}
										style={{
											display: item.completada ? "none" : "inline-block",
										}}
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
	);
};
