"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, Fragment, useState, useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import Box from "@component/Box";
import Radio from "@component/radio";
import Grid from "@component/grid/Grid";
import { Card1 } from "@component/Card1";
import Divider from "@component/Divider";
import { Button } from "@component/buttons";
import TextField from "@component/text-field";
import Typography from "@component/Typography";
import useWindowSize from "@hook/useWindowSize";
import withReactContent from "sweetalert2-react-content";
import { useAppContext } from "@context/app-context";
import LoginPayment from "@sections/auth/LoginPayment"; 
import Cookies from "js-cookie";
import api from "@utils/__api__/ticket";

const MySwal = withReactContent(Swal);
type SizeOption = {
  id: number;
  nombre: string;
};

// Definir un arreglo con las opciones de talla disponibles
const sizeOptions: SizeOption[] = [
  { id: 1, nombre: "XS" },
  { id: 2, nombre: "S" },
  { id: 3, nombre: "M" },
  { id: 4, nombre: "L" },
  { id: 5, nombre: "XL" },
];
const getTallaId = (nombreTalla: string): number | undefined => {
  const foundSize = sizeOptions.find((option) => option.nombre === nombreTalla);
  return foundSize?.id;
};

const generateVentaData = (state: any) => {
  // Obtener el ID de usuario del estado
  const id_usuario = state.user.id_usuario;

  // Calcular el total de la venta sumando los precios por cantidad
  const total = state.cart.reduce((accumulator: number, item: any) => {
    return accumulator + (item.precio * item.qty);
  }, 0);

  // Construir el array de productos para la venta
  const productos = state.cart.map((item: any) => {
    // Encontrar el objeto producto correspondiente en 'products'
    const product = state.products.find((p: any) => p.id_producto === item.id_producto);

    // Encontrar la talla específica dentro de las tallas del producto
    const id_talla = getTallaId(item.talla);

    // Retornar el objeto con id_producto, id_talla y cantidad
    return {
      id_producto: item.id_producto,
      id_talla: id_talla, // Aquí asumo que 'id_talla' es el campo correcto
      cantidad: item.qty
    };
  });

  // Construir el objeto final para enviar al endpoint de venta
  const ventaData = {
    id_usuario: id_usuario,
    total: total,
    es_apartado: 2, // Asumiendo que este valor es estático según el contexto
    productos: productos
  };

  return ventaData;
};

export default function PaymentForm() {
  const router = useRouter();
  const width = useWindowSize();
  const { state, dispatch } = useAppContext();
  console.log("state", state);
  
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isMobile = width < 769;

  useEffect(() => {
    // Verificar si los datos del usuario están en el estado
    if (!state.user || (!state.user.correo_electronico || !state.user.token || !state.user.id_usuario)) {
      // Si no están en el estado, obtenerlos de las cookies
      const correo_electronico = Cookies.get('correo_electronico');
      const token = Cookies.get('token');
      const id_usuario = Cookies.get('id_usuario');

      // Validar si las cookies existen y no son nulas
      if (correo_electronico && token && id_usuario) {
        // Crear el objeto de respuesta para el dispatch
        const response = {
          correo_electronico,
          token,
          id_usuario
        };

        // Guardar los datos en el estado
        dispatch({ type: 'SET_USER', payload: response });
        setIsLoggedIn(true);
      }
    } else {
      setIsLoggedIn(true);
    }

    setIsLoading(false); // Finalizar la carga
  }, [state, dispatch]);

  const handleFormSubmit = async (values: any) => {

    const data = generateVentaData(state);
    const response = await api.createTicket(data);
    dispatch({ type: 'CLEAR_CART' });
    console.log("response", response);

    // Mostrar la primera alerta - Validando tarjeta
    MySwal.fire({
      title: "Validando tarjeta...",
      text: "Por favor, espera.",
      icon: "info",
      showConfirmButton: false,
      timer: 2000,
      willOpen: () => {
        MySwal.showLoading();
      }
    }).then(() => {
      // Mostrar la segunda alerta - Estableciendo conexión
      return MySwal.fire({
        title: "Estableciendo conexión...",
        text: "Conectando con el banco.",
        icon: "info",
        showConfirmButton: false,
        timer: 2000,
        willOpen: () => {
          MySwal.showLoading();
        }
      });
    }).then(() => {
      // Mostrar la tercera alerta - Procesando pago
      return MySwal.fire({
        title: "Procesando pago...",
        text: "Estamos procesando tu pago.",
        icon: "info",
        showConfirmButton: false,
        timer: 2000,
        willOpen: () => {
          MySwal.showLoading();
        }
      });
    }).then(() => {
      // Mostrar la alerta final - Pago Exitoso
      return MySwal.fire({
        title: "¡Pago Exitoso!",
        text: "Tu pago ha sido procesado correctamente.",
        icon: "success",
        confirmButtonText: "OK"
      });
    }).then((result) => {
      if (result.isConfirmed) {
        return MySwal.fire({
          title: "¡Gracias por tu compra!",
          text: "Tu pedido ha sido registrado.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ver PDF",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirigir al usuario al enlace del PDF generado
            window.location.href = `http://localhost:1234/ticket/${response.id_venta}`;
          } else {
            // Redirigir a otra página o realizar otra acción si se cancela
            router.push("/payment");
          }
        });
      }
    });
  };

  const handlePaymentMethodChange = ({ target: { name } }: ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(name);
  };

  // Función para formatear la fecha de expiración
  const handleExpirationDateChange = (e: ChangeEvent<HTMLInputElement>, handleChange: any) => {
    let value = e.target.value.replace(/\D/g, ""); // Remover todos los caracteres que no sean números

    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }

    // Limitar a 5 caracteres (MM/AA)
    if (value.length > 5) {
      value = value.slice(0, 5);
    }

    // Validar el mes para que esté entre 01 y 12
    if (value.length >= 2) {
      const month = value.slice(0, 2);
      if (parseInt(month) < 1 || parseInt(month) > 12) {
        value = "01" + value.slice(2);
      }
    }

    e.target.value = value; // Actualizar el valor del input
    handleChange(e); // Llamar a la función handleChange de Formik
  };

  // Función para formatear el número de tarjeta y manejar la validación
  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>, handleChange: any, setFieldTouched: any, setFieldError: any) => {
    let value = e.target.value.replace(/\D/g, ""); // Remover todos los caracteres que no sean números

    // Limitar a 16 dígitos
    if (value.length > 16) {
      value = value.slice(0, 16);
    }

    e.target.value = value; // Actualizar el valor del input
    handleChange(e); // Llamar a la función handleChange de Formik

    // Mostrar error si hay menos de 16 dígitos al perder el enfoque
    if (e.type === "blur") {
      setFieldTouched("card_no", true);
      if (value.length < 16) {
        setFieldError("card_no", "El número de tarjeta debe tener 16 dígitos");
      } else {
        setFieldError("card_no", ""); // Limpiar el error si es válido
      }
    }
  };

  return (
    <Fragment>
      {isLoading ? (
        // Mostrar un loader mientras se verifica si el usuario está logueado
        <div>Cargando...</div>
      ) : (
        isLoggedIn ? (
          <Card1 mb="2rem">
            {/* Selección de Tarjeta de Crédito */}
            <Radio
              mb="1.5rem"
              color="secondary"
              name="credit-card"
              onChange={handlePaymentMethodChange}
              checked={paymentMethod === "credit-card"}
              label={
                <Typography ml="6px" fontWeight="600" fontSize="18px" color={paymentMethod === "credit-card" ? "primary" : "textSecondary"}>
                  Pago con tarjeta de crédito o débito
                </Typography>
              }
            />

            <Divider mb="1.25rem" mx="-2rem" />

            {paymentMethod === "credit-card" && (
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldTouched, setFieldError }) => (
                  <form onSubmit={handleSubmit}>
                    <Box mb="1.5rem">
                      <Grid container horizontal_spacing={6} vertical_spacing={4}>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            fullwidth
                            name="card_no"
                            label="Número de tarjeta"
                            onBlur={(e) => handleCardNumberChange(e, handleChange, setFieldTouched, setFieldError)}
                            onChange={(e) => handleCardNumberChange(e, handleChange, setFieldTouched, setFieldError)}
                            value={values.card_no}
                            errorText={touched.card_no && errors.card_no}
                          />
                        </Grid>

                        <Grid item sm={6} xs={12}>
                          <TextField
                            fullwidth
                            name="exp_date"
                            label="Fecha de expiración"
                            placeholder="MM/AA"
                            onBlur={handleBlur}
                            onChange={(e) => handleExpirationDateChange(e, handleChange)}
                            value={values.exp_date}
                            errorText={touched.exp_date && errors.exp_date}
                          />
                        </Grid>

                        <Grid item sm={6} xs={12}>
                          <TextField
                            fullwidth
                            name="name"
                            label="Nombre en la tarjeta"
                            onBlur={handleBlur}
                            value={values.name}
                            onChange={handleChange}
                            errorText={touched.name && errors.name}
                          />
                        </Grid>
                      </Grid>
                    </Box>

                    <Button variant="outlined" color="primary" mb="30px" type="submit" onClick={handleFormSubmit}>
                      Pagar
                    </Button>

                    <Divider mb="1.5rem" mx="-2rem" />
                  </form>
                )}
              </Formik>
            )}

            {/* Selección de Efectivo en Tienda */}
            <Radio
              name="cod"
              color="secondary"
              checked={paymentMethod === "cod"}
              onChange={handlePaymentMethodChange}
              label={
                <Typography ml="6px" fontWeight="600" fontSize="18px" color={paymentMethod === "cod" ? "primary" : "textSecondary"}>
                  Efectivo en tienda
                </Typography>
              }
            />

            {/* Mensaje de confirmación para Efectivo en Tienda */}
            {paymentMethod === "cod" && (
              <Box mb="1.5rem" mt="1.5rem">
                <Typography fontWeight="600" fontSize="16px" color="textSecondary">
                  Has seleccionado pagar en efectivo. Completarás el pago cuando recojas tu pedido en la tienda.
                </Typography>
              </Box>
            )}
          </Card1>
        ) : (
          <LoginPayment returnUrl="/payment" />
        )
      )}

      <Grid container spacing={7}>
        <Grid item sm={6} xs={12}>
          <Link href="/cart">
            <Button variant="outlined" color="primary" type="button" fullwidth>
              Regresar al carrito
            </Button>
          </Link>
        </Grid>

        {/* <Grid item sm={6} xs={12}>
          <Link href="/orders">
            <Button variant="contained" color="primary" type="button" fullwidth>
              Ticket
            </Button>
          </Link>
        </Grid> */}
      </Grid>
    </Fragment>
  );
}

const initialValues = {
  card_no: "",
  name: "",
  exp_date: "",
  cvc: "",
};

const checkoutSchema = yup.object().shape({
  card_no: yup
    .string()
    .required("Campo requerido")
    .length(16, "El número de tarjeta debe tener 16 dígitos"),
  name: yup.string().required("Campo requerido"),
  exp_date: yup.string().required("Campo requerido"),
  cvc: yup.string().required("Campo requerido"),
});
