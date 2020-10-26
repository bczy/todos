import React, { useState } from 'react'
import { Button, Card, Col, Container, Form } from 'react-bootstrap'
import { connect, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { fetchAddTodo } from '../store/actions/todos';

const TodoSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, 'Too Short! Should be between 2 and 32 characters.')
      .max(32, 'Too Long! Should be between 2 and 32 characters.')
      .required('Required'),
 
    description: Yup.string()
      .min(5, 'Too Short! Should be between 5 and 128 characters.')
      .max(128, 'Too Long! Should be between 5 and 128 characters.')
      .required('Required'),
 
  });

const AddTodo = ({items, isSubmiting}) => {
    const dispatch = useDispatch();

    function handleAddTodo({title, description}){
        dispatch(fetchAddTodo({title, description}, items));
    }

    return <Container>
        <Card border="light">
          <Card.Body>
            <Card.Title>Add todo</Card.Title>
                <Formik
                    initialValues={{
                        title: '',
                        description: '',
                    }}
                    validationSchema={TodoSchema}
                    onSubmit={values => {
                        handleAddTodo(values)
                    }}
                    >
                    {({ handleSubmit,
                        handleChange,
                        values,
                        touched,
                        errors }) => (
                        <Form method="POST" noValidate onSubmit={handleSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} controlId="validationTitle">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control 
                                        name="title"
                                        required
                                        onChange={handleChange}
                                        value={values.title}
                                        isValid={touched.title && !errors.title}
                                        isInvalid={errors.title}
                                        placeholder="Enter title" />
                                    <Form.Control.Feedback tooltip type="invalid">
                                        Please choose a todo title.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} controlId="validationDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control 
                                        name="description"
                                        required
                                        onChange={handleChange}
                                        value={values.description}
                                        isValid={touched.description && !errors.description}
                                        isInvalid={errors.description}
                                        placeholder="Enter description" />
                                    <Form.Control.Feedback tooltip type="invalid">
                                        Please choose a todo description.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Button variant="primary" type="submit" >
                                        Submit
                                    </Button>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    )}
                </Formik>
            </Card.Body>
        </Card>
    </Container>
}

function mapStateToProps(state) {
    const { todos, isSubmiting } = state;
    const { items } = todos || {
        isSubmiting: false,
        items: []
    }

    return {
        items,
        isSubmiting
    }
}

export default connect(mapStateToProps)(AddTodo)
  