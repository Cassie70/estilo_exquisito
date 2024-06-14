"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, Fragment, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";

import Box from "@component/Box";
import Radio from "@component/radio";
import Grid from "@component/grid/Grid";
import { Card1 } from "@component/Card1";
import FlexBox from "@component/FlexBox";
import Divider from "@component/Divider";
import { Button } from "@component/buttons";
import TextField from "@component/text-field";
import Typography from "@component/Typography";
import useWindowSize from "@hook/useWindowSize";

export default function PaymentForm() {
  const router = useRouter();
  const width = useWindowSize();
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  const isMobile = width < 769;

  const handleFormSubmit = async (values: any) => {
    console.log(values);
    router.push("/payment");
  };

  const handlePaymentMethodChange = ({ target: { name } }: ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(name);
  };

  return (
    <Fragment>
      <Card1 mb="2rem">
        {/* Selección de Tarjeta de Crédito */}
        <Radio
          mb="1.5rem"
          color="secondary"
          name="credit-card"
          onChange={handlePaymentMethodChange}
          checked={paymentMethod === "credit-card"}
          label={
            <Typography ml="6px" fontWeight="600" fontSize="18px">
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
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Box mb="1.5rem">
                  <Grid container horizontal_spacing={6} vertical_spacing={4}>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        fullwidth
                        name="card_no"
                        label="Número de tarjeta"
                        onBlur={handleBlur}
                        value={values.card_no}
                        onChange={handleChange}
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
                        onChange={handleChange}
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

                <Button variant="outlined" color="primary" mb="30px" type="submit">
                  Enviar
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
            <Typography ml="6px" fontWeight="600" fontSize="18px">
              Efectivo en tienda
            </Typography>
          }
        />
      </Card1>

      <Grid container spacing={7}>
        <Grid item sm={6} xs={12}>
          <Link href="/cart">
            <Button variant="outlined" color="primary" type="button" fullwidth>
              Regresar al carrito
            </Button>
          </Link>
        </Grid>

        <Grid item sm={6} xs={12}>
          <Link href="/orders">
            <Button variant="contained" color="primary" type="submit" fullwidth>
              Resumen
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Fragment>
  );
}

const initialValues = {
  card_no: "",
  name: "",
  exp_date: "",
  cvc: "",
  shipping_zip: "",
  shipping_country: "",
  shipping_address1: "",
  shipping_address2: "",

  billing_name: "",
  billing_email: "",
  billing_contact: "",
  billing_company: "",
  billing_zip: "",
  billing_country: "",
  billing_address1: "",
  billing_address2: ""
};

const checkoutSchema = yup.object().shape({
  card_no: yup.string().required("Campo requerido"),
  name: yup.string().required("Campo requerido"),
  exp_date: yup.string().required("Campo requerido"),
  cvc: yup.string().required("Campo requerido")
  // shipping_zip: yup.string().required("Campo requerido"),
  // shipping_country: yup.object().required("Campo requerido"),
  // shipping_address1: yup.string().required("Campo requerido"),
  // billing_name: yup.string().required("Campo requerido"),
  // billing_email: yup.string().required("Campo requerido"),
  // billing_contact: yup.string().required("Campo requerido"),
  // billing_zip: yup.string().required("Campo requerido"),
  // billing_country: yup.string().required("Campo requerido"),
  // billing_address1: yup.string().required("Campo requerido"),
});
