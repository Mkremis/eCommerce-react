import React from 'react';
import { helpHttp } from '../helpers/helpHttp';

const useRenderForm = () => {
  const renderFormElements = (obj, output) => {
    return Object.entries(obj).map(([key, value]) => {
      if (typeof value === 'object') {
        return (
          <fieldset key={key} style={{ padding: '1rem', margin: '1rem' }}>
            <legend id={key}>{key}</legend>
            {renderFormElements(value)}
          </fieldset>
        );
      }

      return (
        <div key={key} className="row">
          <div className="col">
            <label htmlFor={key} className="form-label">
              {key}
            </label>
            <input
              type="text"
              className="form-control"
              name={key}
              defaultValue={value}
              placeholder={key}
              aria-label={key}
            />
          </div>
        </div>
      );
    });
  };
  const handleSubmit = (e, user, output) => {
    e.preventDefault();
    let $fieldsets = e.target.querySelectorAll('fieldset'),
      newUserData = {};
    $fieldsets.forEach((fieldset) => {
      let $legend = fieldset.querySelector('legend');
      let $inputs = fieldset.querySelectorAll('input');
      let newObj = Array.from($inputs).reduce(
          (acum, prev) => ({ ...acum, [prev.name]: prev.value }),
          {}
        ),
        objCons = { [$legend.id]: { ...newObj } };
      Object.assign(newUserData, objCons);
    });
    let $fInputs = document.querySelectorAll('.user-account__form>input');
    $fInputs.forEach(($input) => {
      if ($input.type !== 'submit') {
        let key = $input.name,
          value = $input.value,
          newObj = { [key]: value };
        Object.assign(newUserData, newObj);
      }

      let method = user === 'newuser' ? 'post' : 'put';
      fetchData(newUserData, method, output);
    });
    function fetchData(newUserData, method, output) {
      const username = newUserData.login.username;
      const requestOptions = {
        headers: { 'Content-Type': 'application/json' },
        body: newUserData,
      };
      helpHttp()
        [method](
          `https://ecommerce-users-api-production.up.railway.app/api/users/${username}`,
          requestOptions
        )
        .finally(() => {
          output.current.classList.remove('--invisible');
          setTimeout(() => {
            output.current.classList.add('--invisible');
          }, 3500);
        });
    }
  };
  return { renderFormElements, handleSubmit };
};

export default useRenderForm;
