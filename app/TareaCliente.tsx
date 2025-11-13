'use client';
import { useState } from 'react';
import styles from './TareaCliente.module.css';

type Tarea = { id: number; titulo: string; completed?: boolean };

export default function TareaCliente({ initialTareas }: { initialTareas: Tarea[] }) {
  const safeInitial = Array.isArray(initialTareas) ? initialTareas : [];
  const [tareas, setTareas] = useState<Tarea[]>(safeInitial);
  const [titulo, setTitulo] = useState('');

  async function agregarTarea(e: React.FormEvent) {
    e.preventDefault();
    const t = titulo.trim();
    if (!t) return;

    try {
      const res = await fetch('/api/tareas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo: t }),
      });
      const newTarea = await res.json();
      setTareas(prev => [...(Array.isArray(prev) ? prev : []), newTarea]);
      setTitulo('');
    } catch {
      alert('No se pudo agregar la tarea');
    }
  }

  async function borrarTarea(id: number) {
    try {
      await fetch('/api/tareas', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      setTareas(prev => prev.filter(t => t.id !== id));
    } catch {
      alert('No se pudo borrar la tarea');
    }
  }

  return (
    <div className={styles.tablita}>
      <h1 className={styles.titulo}>Lista de Tareas 📝</h1>

      <form onSubmit={agregarTarea} className={styles.form}>
        <input
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          placeholder="Nueva tarea"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Agregar
        </button>
      </form>

      <ul className={styles.listaTarea}>
        {tareas.length > 0 ? (
          tareas.map(tarea => (
            <li key={tarea.id} className={styles.itemTarea}>
              {tarea.titulo}
              <button
                className={styles.deleteButton}
                onClick={() => borrarTarea(tarea.id)}
              >
                ❌
              </button>
            </li>
          ))
        ) : (
          <li className={styles.vacio}>No hay tareas</li>
        )}
      </ul>
    </div>
  );
}

