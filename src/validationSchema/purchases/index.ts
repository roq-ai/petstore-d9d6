import * as yup from 'yup';

export const purchaseValidationSchema = yup.object().shape({
  purchase_date: yup.date().required(),
  price: yup.number().integer().required(),
  payment_method: yup.string().required(),
  pet_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
