import TareaCliente from './TareaCliente';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const res = await fetch('http://localhost:3000/api/tareas', { cache: 'no-store' });
  const tareas = await res.json();

  return (
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
      <TareaCliente initialTareas={tareas} />
    </main>
  );
}

