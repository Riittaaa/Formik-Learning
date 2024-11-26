import React from "react";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import TextError from "./TextError";

const initialValues = {
  name: "Asma",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: [""],
};

const onSubmit = (values) => {
  console.log("Form data", values);
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  channel: Yup.string().required("Required"),
});

function YoutubeForm() {
  // console.log("Visited fields", formik.touched);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <label>Name</label>
        <Field type="text" id="name" name="name" />
        <ErrorMessage name="name" component={TextError} />
        <label>Email</label>
        <Field type="email" id="email" name="email" />
        <ErrorMessage name="email">
          {(errorMsg) => <div className="error">{errorMsg}</div>}
        </ErrorMessage>
        <label>Channel</label>
        <Field type="text" id="channel" name="channel" />
        <ErrorMessage name="channel" />
        <label>Comments</label>
        <Field as="textarea" id="comments" name="comments" />
        <label>Address</label>
        <Field name="address">
          {(props) => {
            const { field, form, meta } = props;
            console.log("Render props", props);
            return (
              <div>
                <input type="text" id="address" {...field} />
                {meta.touched && meta.error ? <div>{meta.error}</div> : null}
              </div>
            );
          }}
        </Field>
        <label>Facebook Profile</label>
        <Field type="text" id="facebook" name="social.facebook" />
        <label>Twitter Profile</label>
        <Field type="text" id="twitter" name="social.twitter" />
        <label>Primary Phone Number</label>
        <Field type="text" id="primaryPh" name="phoneNumbers[0]" />
        <label>Secondary Phone Number</label>
        <Field type="text" id="secondaryPh" name="phoneNumbers[1]" />
        <label>List of Phone Numbers</label>
        <FieldArray name="phNumbers">
          {(fieldArrayProps) => {
            console.log("fieldArrayProps", fieldArrayProps);
            const { push, remove, form } = fieldArrayProps;
            const { values } = form;
            const { phNumbers } = values;
            return (
              <div>
                {phNumbers.map((phNumber, index) => (
                  <div key={index}>
                    <Field name={`phNumbers[${index}]`} />
                    {index > 0 && (
                      <button type="button" onClick={() => remove(index)}>
                        -
                      </button>
                    )}

                    <button type="button" onClick={() => push("")}>
                      +
                    </button>
                  </div>
                ))}
              </div>
            );
          }}
        </FieldArray>
        <button type="submit" className="button">
          Submit
        </button>
      </Form>
    </Formik>
  );
}

export default YoutubeForm;
