import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createPurchase } from 'apiSdk/purchases';
import { purchaseValidationSchema } from 'validationSchema/purchases';
import { PetInterface } from 'interfaces/pet';
import { UserInterface } from 'interfaces/user';
import { getPets } from 'apiSdk/pets';
import { getUsers } from 'apiSdk/users';
import { PurchaseInterface } from 'interfaces/purchase';

function PurchaseCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: PurchaseInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createPurchase(values);
      resetForm();
      router.push('/purchases');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PurchaseInterface>({
    initialValues: {
      purchase_date: new Date(new Date().toDateString()),
      price: 0,
      payment_method: '',
      pet_id: (router.query.pet_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: purchaseValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Purchases',
              link: '/purchases',
            },
            {
              label: 'Create Purchase',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Purchase
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="purchase_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Purchase Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.purchase_date ? new Date(formik.values?.purchase_date) : null}
              onChange={(value: Date) => formik.setFieldValue('purchase_date', value)}
            />
          </FormControl>

          <NumberInput
            label="Price"
            formControlProps={{
              id: 'price',
              isInvalid: !!formik.errors?.price,
            }}
            name="price"
            error={formik.errors?.price}
            value={formik.values?.price}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('price', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.payment_method}
            label={'Payment Method'}
            props={{
              name: 'payment_method',
              placeholder: 'Payment Method',
              value: formik.values?.payment_method,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<PetInterface>
            formik={formik}
            name={'pet_id'}
            label={'Select Pet'}
            placeholder={'Select Pet'}
            fetcher={getPets}
            labelField={'name'}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/purchases')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'purchase',
    operation: AccessOperationEnum.CREATE,
  }),
)(PurchaseCreatePage);
