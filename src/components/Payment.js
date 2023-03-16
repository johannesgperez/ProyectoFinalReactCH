import { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

import "./Payment.css";

const Payment = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { clearCartProducts, getTotalPrice } = useContext(CartContext);
  const history = useNavigate();

  const handleGoHome = () => {
    history("/");
  };

  const cleanPaymentData = () => {
    reset();
  };

  const handlePaymentConfirmation = (data) => {
    Swal.fire({
      title: "Confirmar Pago",
      html: `
        <p>Nombre Completo: ${data.fullName}</p>
        <p>Email: ${data.email}</p>
        <p>Numero de Tarjeta: ${data.cardNumber}</p>
        <p>Fecha de Expiracion: ${data.expiryDate}</p>
        <p>CVV: ${data.cvv}</p>
        <p>Monto Total de la Compra: $${getTotalPrice()} </p>
      `,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#00b894",
      cancelButtonColor: "#d63031",
    }).then((result) => {
      if (result.isConfirmed) {
        clearCartProducts();
        cleanPaymentData();
        handleGoHome();
        Swal.fire("Gracias por su compra!");
      }
    });
  };

  const onSubmit = (data) => {
    if (confirmed) {
      console.log("Pago confirmado");
    } else {
      handlePaymentConfirmation(data);
    }
  };

  const { confirmed, reset } = useForm({
    defaultValues: {
      confirmed: false,
    },
  });

  return (
    <>
    <h2>Datos de Facturación</h2>
    <form onSubmit={handleSubmit(onSubmit)} className="payment-form">
      <label htmlFor="fullName">Nombre Completo:</label>
      <input
        type="text"
        id="fullName"
        {...register("fullName", { required: true, pattern: /^[a-zA-Z ]+$/ })}
      />
      {errors.fullName?.type === "required" && (
        <span>Por favor, ingrese su nombre completo</span>
      )}
      {errors.fullName?.type === "pattern" && (
        <span>El nombre debe contener solo letras y espacios</span>
      )}

      <label htmlFor="email">Correo electrónico:</label>
      <input
        type="email"
        id="email"
        {...register("email", {
          required: true,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        })}
      />
      {errors.email?.type === "required" && (
        <span>Por favor, ingrese su correo electrónico</span>
      )}
      {errors.email?.type === "pattern" && (
        <span>Por favor, ingrese un correo electrónico válido</span>
      )}

      <label htmlFor="cardNumber">Número de Tarjeta:</label>
      <input
        type="number"
        id="cardNumber"
        {...register("cardNumber", { required: true, pattern: /^\d{16}$/ })}
      />
      {errors.cardNumber?.type === "required" && (
        <span>Por favor, ingrese el número de su tarjeta</span>
      )}
      {errors.cardNumber?.type === "pattern" && (
        <span>El número de tarjeta debe tener 16 dígitos</span>
      )}

      <label htmlFor="expiryDate">Fecha de Expiración:</label>
      <input
        type="date"
        id="expiryDate"
        {...register("expiryDate", {
          required: true,
        })}
      />
      {errors.expiryDate?.type === "required" && (
        <span>Por favor, ingrese la fecha de expiración</span>
      )}
      <label htmlFor="cvv">CVV:</label>
      <input
        type="number"
        id="cvv"
        {...register("cvv", { required: true, pattern: /^\d{3,4}$/ })}
      />
      {errors.cvv?.type === "required" && (
        <span>Por favor, ingrese el código de seguridad</span>
      )}
      {errors.cvv?.type === "pattern" && (
        <span>El CVV debe tener 3 o 4 dígitos</span>
      )}
      <button type="submit">Realizar Pago</button>
    </form>
    </>
  );
};

export default Payment;
