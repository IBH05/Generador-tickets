import React, { useState, useEffect } from 'react';
import { Printer, MessageCircle, FileText, Settings, Clock, RefreshCw } from 'lucide-react';

const logos = {
  cfe: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A10,10 0 1,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 1,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 1,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 1,0 16,12A4,4 0 0,0 12,8M12,10A2,2 0 1,1 10,12A2,2 0 0,1 12,10Z" /></svg>,
  agua: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,2C8,2 4,6 4,12C4,16.42 7.58,20 12,20C16.42,20 20,16.42 20,12C20,6 16,2 12,2M12,4C16.42,4 20,7.58 20,12C20,16.42 16.42,20 12,20C7.58,20 4,16.42 4,12C4,7.58 7.58,4 12,4M12,6A6,6 0 1,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 1,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 1,0 14,12A2,2 0 0,0 12,10Z" /></svg>,
  telefono: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.13,3.1C3.5,3.1 3,3.6 3,4.23V19.77C3,20.4 3.5,20.9 4.13,20.9H19.87C20.5,20.9 21,20.4 21,19.77V4.23C21,3.6 20.5,3.1 19.87,3.1H4.13M4.13,19.77V4.23H19.87V19.77H4.13M17.44,6.35L12,11.79L6.56,6.35L5.5,7.41L12,13.9L18.5,7.41L17.44,6.35M6.56,17.65L12,12.21L17.44,17.65L18.5,16.59L12,10.1L5.5,16.59L6.56,17.65Z" /></svg>,
  tv: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10Z" /></svg>
};

const App = () => {
  const [businessName, setBusinessName] = useState('MI NEGOCIO MULTISERVICIOS');
  const [serviceName, setServiceName] = useState('');
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [commission, setCommission] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [folio, setFolio] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    generateFolio();
    updateDate();
  }, []);

  const generateFolio = () => {
    const randomNum = Math.floor(10000000 + Math.random() * 90000000);
    setFolio(`TX-${randomNum}`);
  };

  const updateDate = () => {
    const now = new Date();
    const formattedDate = now.toLocaleString('es-MX', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
    });
    setDate(formattedDate);
  };

  const numAmount = parseFloat(amount || 0);
  const numCommission = parseFloat(commission || 0);
  const totalAmount = numAmount + numCommission;

  const handleWhatsApp = () => {
    if (!clientPhone) {
      alert("Por favor, ingresa el número de WhatsApp del cliente.");
      return;
    }

    const formattedAmount = numAmount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
    const formattedCommission = numCommission.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
    const formattedTotal = totalAmount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
    
    let serviceEmoji = '🧾';
    const sName = serviceName.toLowerCase();
    if (sName.includes('cfe')) serviceEmoji = '⚡';
    else if (sName.includes('agua')) serviceEmoji = '💧';
    else if (sName.includes('tel')) serviceEmoji = '📱';
    else if (sName.includes('tv') || sName.includes('cable')) serviceEmoji = '📺';

    const message = `*${serviceEmoji} COMPROBANTE DE PAGO*\n` +
      `*${businessName}*\n\n` +
      `*Servicio:* ${serviceName || 'No especificado'}\n` +
      `*Referencia/Cuenta:* ${account}\n\n` +
      `*Monto:* ${formattedAmount}\n` +
      `*Comisión:* ${formattedCommission}\n` +
      `*Total Pagado:* ${formattedTotal}\n\n` +
      `*Folio:* ${folio}\n` +
      `*Fecha:* ${date}\n\n` +
      `_Gracias por tu preferencia._`;

    const cleanPhone = clientPhone.replace(/\D/g, '');
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const baseUrl = isMobile ? "https://api.whatsapp.com/send" : "https://web.whatsapp.com/send";
    
    const whatsappUrl = `${baseUrl}?phone=52${cleanPhone}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const getWatermark = () => {
    const sName = serviceName.toLowerCase();
    if (sName.includes('cfe')) return logos.cfe;
    if (sName.includes('agua') || sName.includes('jumapa')) return logos.agua;
    if (sName.includes('tel') || sName.includes('movi') || sName.includes('att')) return logos.telefono;
    if (sName.includes('cable') || sName.includes('dish') || sName.includes('sky')) return logos.tv;
    return <div className="text-center font-bold text-4xl text-gray-300 opacity-20" style={{ transform: 'rotate(-45deg)' }}>{businessName}</div>;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row font-sans">
      
      {/* CORRECCIÓN DE ESTILOS DE IMPRESIÓN PARA EPSON 80mm */}
      <style>{`
        @media print {
          @page {
            margin: 0 !important; /* Quita el margen que pone Chrome por defecto */
          }
          body {
            background-color: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          /* Ocultar el formulario izquierdo */
          .form-panel {
            display: none !important;
          }
          /* Resetear el panel derecho para que no tenga fondos grises */
          .preview-panel {
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            border: none !important;
            background-color: white !important;
            display: block !important;
          }
          /* Ajustar el ticket a 80mm exactos */
          .print-area {
            width: 76mm !important; /* 76mm para dar un ligero margen en la epson de 80mm */
            margin: 0 !important;
            padding: 5mm 2mm !important;
            box-shadow: none !important;
            color: black !important;
            min-height: auto !important; /* Para que no corte mucho papel abajo */
          }
          .watermark {
            position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.05; width: 70%; z-index: 0; 
          }
        }
      `}</style>

      {/* PANEL IZQUIERDO: FORMULARIO */}
      <div className="form-panel w-full md:w-1/2 lg:w-3/5 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center gap-3 mb-8 text-blue-800">
            <FileText size={32} />
            <h1 className="text-3xl font-bold">Generador de Tickets</h1>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Nombre del Negocio</label>
              <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value.toUpperCase())} className="w-full px-4 py-2 border rounded-lg" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold">Servicio</label>
                <input type="text" value={serviceName} onChange={(e) => setServiceName(e.target.value.toUpperCase())} className="w-full px-4 py-2 border rounded-lg" placeholder="Ej. CFE, AGUA, TELMEX" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold">Cuenta / Referencia</label>
                <input type="text" value={account} onChange={(e) => setAccount(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-semibold">Monto ($)</label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full px-4 py-2 border rounded-lg font-bold text-blue-800" />
              </div>
              <div>
                <label className="block text-sm font-semibold">Comisión ($)</label>
                <input type="number" value={commission} onChange={(e) => setCommission(e.target.value)} className="w-full px-4 py-2 border rounded-lg text-gray-600" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold">WhatsApp Cliente (10 dígitos)</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 rounded-l-lg">+52</span>
                  <input type="tel" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} className="w-full px-4 py-2 border rounded-r-lg" maxLength={10} />
                </div>
              </div>
            </div>

            <div className="flex gap-2 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                    <span className="text-xs text-gray-500">Folio: {folio}</span>
                    <button onClick={generateFolio} className="ml-2"><RefreshCw size={12}/></button>
                </div>
                <div className="flex-1 text-right">
                    <span className="text-xs text-gray-500">{date}</span>
                    <button onClick={updateDate} className="ml-2"><Clock size={12}/></button>
                </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button onClick={() => window.print()} className="flex-1 flex items-center justify-center gap-2 bg-slate-800 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-slate-900">
              <Printer size={24} /> IMPRIMIR
            </button>
            <button onClick={handleWhatsApp} className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-green-600">
              <MessageCircle size={24} /> WHATSAPP
            </button>
          </div>
        </div>
      </div>

      {/* PANEL DERECHO: VISTA PREVIA TICKET */}
      <div className="preview-panel w-full md:w-1/2 lg:w-2/5 bg-gray-200 flex items-center justify-center p-8 border-l">
        <div className="print-area bg-white shadow-2xl p-6 w-[80mm] min-h-[100mm] text-sm relative overflow-hidden">
          <div className="watermark absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[0.08] w-[80%] pointer-events-none flex justify-center items-center">
            {getWatermark()}
          </div>
          <div className="relative z-10 font-mono text-black">
            <div className="text-center mb-4">
              <h2 className="font-bold text-lg leading-tight">{businessName}</h2>
              <p className="text-[10px] uppercase mt-1">COMPROBANTE DE PAGO</p>
              <p>-------------------------</p>
            </div>
            <div className="text-[11px] space-y-1">
              <div className="flex justify-between"><span>FECHA:</span><span>{date.split(',')[0]}</span></div>
              <div className="flex justify-between"><span>HORA:</span><span>{date.split(',')[1]?.trim() || ''}</span></div>
              <div className="flex justify-between"><span>FOLIO:</span><span>{folio}</span></div>
              <div className="border-t border-dashed border-gray-400 my-2 pt-2">SERVICIO:</div>
              <div className="font-bold text-[13px] uppercase leading-tight">{serviceName || '-'}</div>
              <div className="border-t border-dashed border-gray-400 my-2 pt-2">CUENTA:</div>
              <div className="font-bold text-[13px] break-all">{account || '-'}</div>
            </div>
            <p className="text-center my-2">-------------------------</p>
            <div className="space-y-1 text-[12px]">
              <div className="flex justify-between"><span>MONTO:</span><span>${numAmount.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>COMISIÓN:</span><span>${numCommission.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-[14px] border-t border-black pt-1 mt-1"><span>TOTAL:</span><span>${totalAmount.toFixed(2)}</span></div>
            </div>
            <div className="text-center mt-6 text-[10px]">
              <p className="font-bold">*** PAGO EXITOSO ***</p>
              <p className="mt-2">Conserve este ticket para</p>
              <p>cualquier aclaración.</p>
              <p className="mt-2 mb-4 font-bold">¡Gracias por su preferencia!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
