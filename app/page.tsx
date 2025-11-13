import TareaCliente from './TareaCliente';

// Fuerza que la pagina sea dinamica y no use cache
export const dynamic = 'force-dynamic';

export default async function Page() {
  // Trae las tareas desde el endpoint sin usar cache
  const res = await fetch('http://localhost:3000/api/tareas', { cache: 'no-store' });
  const tareas = await res.json();

  return (
    // Contenedor principal con estilos
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000000ff',
        padding: '20px',
      }}
    >
      {/* Componente del lado del cliente con las tareas iniciales */}
      <TareaCliente initialTareas={tareas} />
    </main>
  );
}


