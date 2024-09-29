import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import Container from './Container';
import {
  Controller,
  FieldErrors,
  SubmitHandler,
  useFieldArray,
  useForm,
  useWatch,
} from 'react-hook-form';
import { formDefaultValues, formSchema, FormSchema } from './formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddCircleRounded, DeleteForeverRounded } from '@mui/icons-material';
import { useEffect } from 'react';

function App() {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<FormSchema>({
    mode: 'all',
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
  });

  const { fields, replace, append, remove } = useFieldArray({
    control,
    name: 'languages',
  });

  //  &
  //  &
  //  &
  // Extract<FormSchema, { educationLevel: 'bachelorsDegree' }>
  const fullErrors: FieldErrors<
    Extract<FormSchema, { hasWorkExperience: true }>
  > &
    FieldErrors<Extract<FormSchema, { knowsOtherLanguages: true }>> &
    FieldErrors<Extract<FormSchema, { educationLevel: 'noFormalEducation' }>> &
    FieldErrors<Extract<FormSchema, { educationLevel: 'highSchoolDiploma' }>> &
    FieldErrors<Extract<FormSchema, { educationLevel: 'bachelorsDegree' }>> =
    errors;

  const hasWorkExperience = useWatch({ control, name: 'hasWorkExperience' });
  const knowsOtherLanguages = useWatch({
    control,
    name: 'knowsOtherLanguages',
  });

  const educationLevel = useWatch({ control, name: 'educationLevel' });
  const submitHandler: SubmitHandler<FormSchema> = (data) => {
    alert(JSON.stringify(data, null, 2));
  };

  useEffect(() => {
    if (knowsOtherLanguages) {
      replace([{ name: '' }]);
    }
  }, [knowsOtherLanguages, replace]);
  return (
    <Container>
      <TextField
        {...register('fullName')}
        label="Full Name"
        helperText={fullErrors.fullName?.message}
        error={!!fullErrors.fullName}
      />
      <FormControlLabel
        {...register('hasWorkExperience')}
        label={'Work Experience'}
        control={<Checkbox />}
      />
      {hasWorkExperience && (
        <TextField
          {...register('companyName')}
          label="Company Name"
          helperText={fullErrors.companyName?.message}
          error={!!fullErrors.companyName}
        />
      )}

      <FormControlLabel
        {...register('knowsOtherLanguages')}
        label="Do you know any other languages?"
        control={<Checkbox />}
      />
      {knowsOtherLanguages && (
        <>
          {fields.map((field, index) => {
            return (
              <div key={field.id}>
                <TextField
                  sx={{ width: '100%' }}
                  {...register(`languages.${index}.name`)}
                  label="Language Name"
                  helperText={fullErrors.languages?.[index]?.name?.message}
                  error={!!fullErrors.languages?.[index]?.name?.message}
                />
                <IconButton
                  disabled={fields.length === 1}
                  onClick={() => remove(index)}
                  color="error"
                >
                  <DeleteForeverRounded />
                </IconButton>
              </div>
            );
          })}
          <IconButton
            sx={{ width: 'fit-content' }}
            onClick={() => append({ name: '' })}
            color="success"
          >
            <AddCircleRounded />
          </IconButton>
        </>
      )}

      <FormControl>
        <FormLabel> Education Level</FormLabel>
        <Controller
          control={control}
          name="educationLevel"
          render={({ field }) => (
            <RadioGroup {...field}>
              <FormControlLabel
                control={<Radio />}
                label="No Formal Education"
                value="noFormalEducation"
              />
              <FormControlLabel
                control={<Radio />}
                label="High school diploma"
                value="highSchoolDiploma"
              />
              <FormControlLabel
                control={<Radio />}
                label="Bachelor degree"
                value="bachelorsDegree"
              />
            </RadioGroup>
          )}
        />
      </FormControl>

      {educationLevel === 'highSchoolDiploma' && (
        <TextField
          {...register('schoolName')}
          label="school name"
          helperText={fullErrors.schoolName?.message}
          error={!!fullErrors.schoolName}
        />
      )}

      {educationLevel === 'bachelorsDegree' && (
        <TextField
          {...register('universityName')}
          label="university name"
          helperText={fullErrors.universityName?.message}
          error={!!fullErrors.universityName}
        />
      )}

      <Button onClick={handleSubmit(submitHandler)} variant="contained">
        submit
      </Button>
    </Container>
  );
}

export { App };
