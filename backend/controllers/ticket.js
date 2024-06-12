import PDF from 'pdfkit';
import { VentaModelo } from '../models/mysql/venta.js';
import { DetalleVentaModelo } from '../models/mysql/detalle_venta.js';

export class TicketController {
    constructor({ ticketModelo }) {
        this.ticketModelo = ticketModelo;
    }

    generate = async (req, res) => {
        const doc = new PDF({bufferPages: true});

        const { id } = req.params;

        let venta = await VentaModelo.getById({id});
        let detalleVenta = await VentaModelo.venta_detalle_venta({id});

        if (venta.length === 0) {
            return res.status(404).json({error: 'Venta no encontrada'});
        }
        const filename = `ticket-${Date.now()}.pdf`;
        const stream = res.writeHead(200,{
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=ticket.pdf'
        });
        

        doc.on('data', (data) => {stream.write(data)});
        doc.on('end', () => {stream.end()});

        doc.text('Ticket de compra');
        doc.text(`Venta: ${venta[0].id_venta}`);
        doc.text(`Usuario: ${venta[0].fecha}`);
        doc.text(detalleVenta.map((ticket) => {
            return `${ticket.id_detalle_venta}.-${ticket.nombre}-${ticket.nombre_talla} -${ticket.precio}-${ticket.cantidad} - ${ticket.precio_unitario}`;
        }).join('\n'));
        doc.text(`Total: ${venta[0].monto}`);
        doc.end();
    }
}
