import smtplib
from email.mime.text import MIMEText
import sys

def enviar_correo(correo_electronico, contrasena):
    # Configuración del servidor SMTP y detalles del correo
    smtp_server = 'smtp.office365.com'
    smtp_port = 587
    smtp_user = 'soyconnor@outlook.com'  # Cambia esto a tu correo de Outlook
    smtp_pass = 'droEjIu2'  # Cambia esto a tu contraseña de Outlook

    # Crear el mensaje de correo electrónico
    mensaje = MIMEText(f'Tu contraseña es: {contrasena}')
    mensaje['From'] = smtp_user
    mensaje['To'] = correo_electronico
    mensaje['Subject'] = 'Recuperación de contraseña'

    try:
        # Conectar al servidor SMTP
        servidor = smtplib.SMTP(smtp_server, smtp_port)
        servidor.starttls()  # Asegurar la conexión
        servidor.login(smtp_user, smtp_pass)
        servidor.sendmail(smtp_user, correo_electronico, mensaje.as_string())
        servidor.quit()
        print('Correo enviado correctamente.')
    except Exception as e:
        print(f'Error al enviar el correo: {e}')

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Uso: python programa.py <correo_electronico> <contrasena>")
        sys.exit(1)
    correo_electronico = sys.argv[1]
    contrasena = sys.argv[2]
    enviar_correo(correo_electronico, contrasena)
