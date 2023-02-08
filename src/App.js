import './App.css';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { useEffect } from 'react';
import { useState } from 'react';

function App() {
  const { register, control, handleSubmit, formState: { errors } } = useForm();
  const password = useWatch({ control, name: 'password' })
  const confirmPassword = useWatch({ control, name: 'confirmPassword' })
  const policy = useWatch({ control, name: 'policy' })
  const [disable, setDisable] = useState(false);

  //condition to enable or disable the submit button
  useEffect(() => {
    if (
      (password !== '' &&
        confirmPassword !== '' &&
        password !== undefined &&
        confirmPassword !== undefined &&
        password === confirmPassword) && policy) {
      setDisable(false)
    } else {
      setDisable(true)
    }
  }, [password, confirmPassword, policy])

  //skills dynamic field
  const {
    fields: skillFields,
    append: skillAppend,
    prepend: skillPrepend,
    remove: skillRemove } = useFieldArray({
      control,
      name: 'skills',
      rules: {
        // minLength: 3,
        // maxLength: 5
      }
    });
  //requirements dynamic field
  const { fields: reqFields, append: reqAppend, prepend: reqPrepend, remove: reqRemove } = useFieldArray({
    control,
    name: 'requirements',
    rules: {
      // maxLength: 4,
      // minLength: 2
    }
  })
  const onSubmit = data => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register('name', {
          required: {
            value: true,
            message: 'This field is required'
          }
        })} />
        {errors.name && <p>{errors.name.message}</p>}
        <input type="text" {...register('email')} />
        <input type="text" {...register('password')} />
        <input type="text" {...register('confirmPassword')} />
        <input type="checkBox" {...register('policy')} />
        {/* dynamic skill fields */}
        {skillFields.map((item, index) => (
          <div key={item.id}>
            {/* <input {...register(`skills.${index}.firstName`)} /> */}
            <input {...register(`skills[${index}]`)} />
            <button type="button" onClick={() => skillRemove(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => skillAppend()}>
          Add skill bottom
        </button>
        <button type="button" onClick={() => skillPrepend()}>
          Add skill Top
        </button>
        {/* dynamic requirements fields */}
        {
          reqFields.map((item, index) => (
            <div key={item.id}>
              <input type="text" {...register(`requirements[${index}]`)} />
              <button type='button' onClick={() => reqRemove()}>Remove</button>
            </div>
          ))
        }
        <button type='button' onClick={() => reqAppend()}>Add Requirements Bottom</button>
        <button type='button' onClick={() => reqPrepend()}>Add Requirements Top</button>
        <button disabled={disable} type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
