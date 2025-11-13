'use client'; 

import { useState } from 'react';
import styles from './TareaCliente.module.css';

type Tarea = { id: number; titulo: string; completed?: boolean };

export default function TareaCliente({ initialTareas }: { initialTareas: Tarea[] }) {
  // Asegura que initialTareas sea un array
  const safeInitial = Array.isArray(initialTareas) ? initialTareas : [];

  // Estado para guardar las tareas
  const [tareas, setTareas] = useState<Tarea[]>(safeInitial);

  // Estado para manejar el input del título
  const [titulo, setTitulo] = useState('');

  // Funcion para agregar una nueva tarea
  async function agregarTarea(e: React.FormEvent) {
    e.preventDefault(); // Evita recargar la pagina
    const t = titulo.trim();
    if (!t) return; // Si esta vacío no hace nada

    try {
      // Envia la nueva tarea al servidor
      const res = await fetch('/api/tareas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo: t }),
      });

      // Obtiene la tarea creada
      const newTarea = await res.json();

      // Actualiza el estado agregando la nueva tarea
      setTareas(prev => [...(Array.isArray(prev) ? prev : []), newTarea]);

      // Limpia el input
      setTitulo('');
    } catch {
      alert('No se pudo agregar la tarea');
    }
  }

  // Funcion para borrar una tarea por id
  async function borrarTarea(id: number) {
    try {
      // Envia la solicitud DELETE al servidor
      await fetch('/api/tareas', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      // Actualiza la lista filtrando la tarea eliminada
      setTareas(prev => prev.filter(t => t.id !== id));
    } catch {
      alert('No se pudo borrar la tarea');
    }
  }

  return (
    <div className={styles.tablita}>
      <h1 className={styles.titulo}>Lista de Tareas 📝</h1>

      {/* Formulario para agregar tareas */}
      <form onSubmit={agregarTarea} className={styles.form}>
        <input
          value={titulo}
          onChange={e => setTitulo(e.target.value)} // Actualiza el input
          placeholder="Nueva tarea"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Agregar
        </button>
      </form>

      {/* Lista de tareas */}
      <ul className={styles.listaTarea}>
        {tareas.length > 0 ? (
          tareas.map(tarea => (
            <li key={tarea.id} className={styles.itemTarea}>
              {tarea.titulo}

              {/* Boton para borrar una tarea */}
              <button
                className={styles.deleteButton}
                onClick={() => borrarTarea(tarea.id)}
              >
                ❌
              </button>
            </li>
          ))
        ) : (
          // Mensaje si no hay tareas
          <li className={styles.vacio}>No hay tareas</li>
        )}
      </ul>
    </div>
  );
}


