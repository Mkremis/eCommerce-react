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
      newUserData = [],
      userName;
    $fieldsets.forEach((fieldset) => {
      let $legend = fieldset.querySelector('legend');
      let $inputs = fieldset.querySelectorAll('input');
      Array.from($inputs).map((input) => {
        if ((input.name = 'username')) userName = input.value;
        newUserData.push({ [`${$legend.id}_${input.name}`]: input.value });
      });
    });
    let method = user === 'newuser' ? 'post' : 'put';
    fetchData(newUserData, userName, method, output);
  };

  function fetchData(newUserData, userName, method, output) {
    const options = {
      headers: { 'Content-Type': 'application/json' },
      body: newUserData,
    };
    // const endpoint = `https://ecommerce-db-geqb34iue-mkremis.vercel.app/api/users/${userName}`;
    // fetch(endpoint, options)
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));

    helpHttp()
      [method](
        `https://ecommerce-db-geqb34iue-mkremis.vercel.app/api/users/${userName}`,
        options
      )
      .finally(() => {
        output.current.classList.remove('--invisible');
        setTimeout(() => {
          output.current.classList.add('--invisible');
        }, 3500);
      });
  }
  return { renderFormElements, handleSubmit };
};

export default useRenderForm;
