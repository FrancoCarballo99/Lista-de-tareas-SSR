import { NextResponse } from 'next/server';

// Lista de tareas almacenadas en memoria
let tareas = [
  { id: 1, titulo: 'Comprar leche'},
  { id: 2, titulo: 'Estudiar legislación informática'},
];

// Maneja las solicitudes GET: devuelve todas las tareas
export async function GET() {
  return NextResponse.json(tareas);
}

// Maneja las solicitudes POST: agrega una nueva tarea
export async function POST(req: Request) {
  // Obtiene el titulo enviado en el cuerpo de la peticion
  const { titulo } = await req.json();

  // Crea una nueva tarea asignandole un id
  const newTarea = { id: tareas.length + 1, titulo };

  // La agrega al arreglo de tareas
  tareas.push(newTarea);

  // Devuelve la nueva tarea creada
  return NextResponse.json(newTarea);
}

// Maneja las solicitudes DELETE: elimina una tarea por id
export async function DELETE(req: Request) {
  // Obtiene el id 
  const { id } = await req.json();

  // Filtra las tareas dejando fuera la que coincide con el id
  tareas = tareas.filter(tarea => tarea.id !== id);

  // Devuelve un mensaje de exito
  return NextResponse.json({ success: true });
}
