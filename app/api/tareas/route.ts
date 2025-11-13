import { NextResponse } from 'next/server';

let tareas = [
  { id: 1, titulo: 'Comprar leche'},
  { id: 2, titulo: 'Estudiar legislación informática'},
];

export async function GET() {
  return NextResponse.json(tareas);
}

export async function POST(req: Request) {
  const { titulo } = await req.json();
  const newTarea = { id: tareas.length + 1, titulo};
  tareas.push(newTarea);
  return NextResponse.json(newTarea);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  tareas = tareas.filter(tarea => tarea.id !== id);
  return NextResponse.json({ success: true });
} 

// 
