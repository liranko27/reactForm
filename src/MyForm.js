import React from "react";
import {
  Button,
  Form,
  Row,
  Col,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import "./MyForm.css";
import { useState } from "react";

function MyForm() {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const addForm = (input, value) => {
    setForm({ ...form, [input]: value });
    if (errors[input]) {
      setErrors({ ...errors, [input]: null });
    }
  };
  //Validations
  const emailValid = (email) => {
    if (
      !email ||
      !email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
    ) {
      setErrors({ ...errors, email: "Not valid email , try again!" });
      return "Not valid email , try again!";
    }
  };
  const validUsername = (username) => {
    if (!username || username.length < 2) {
      setErrors({
        ...errors,
        username: "Username must be more then 2 chars",
      });
      return "Username must be more then 2 chars";
    }
  };
  const validAddress = (address) => {
    if (!address || address.length < 10) {
      setErrors({
        ...errors,
        address: "address input , must be more then 10 chars!",
      });
      return "address input , must be more then 10 chars!";
    }
  };

  const validCourse = (course) => {
    if (!course) {
      setErrors({ ...errors, course: "You must choose course!" });
      return "You must choose course!";
    }
  };
  const validGender = (gender) => {
    if (!gender) {
      setErrors({ ...errors, gender: "You must choose course!" });
      return "You must choose gender!";
    }
  };

  const validateForm = () => {
    const { username, email, address, course, gender } = form;
    const currentErrors = {};
    currentErrors.username = validUsername(username);
    currentErrors.email = emailValid(email);
    currentErrors.address = validAddress(address);
    currentErrors.course = validCourse(course);
    currentErrors.gender = validGender(gender);
    for (const err in currentErrors) {
      if (currentErrors[err] === undefined) {
        delete currentErrors[err];
      }
    }
    return currentErrors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const allErrors = validateForm();
    if (Object.keys(allErrors).length > 0) {
      console.log(allErrors);
      setErrors(allErrors);
    } else {
      alert(
        `Username: ${form.username}, Email: ${form.email}, Address: ${form.address}, Gender:${form.gender}, Course:${form.course}`
      );
    }
  };

  return (
    <>
      <h1>Student details</h1>
      <h4>Hello student! please fill in your details </h4>
      <hr />
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              onChange={(e) => addForm("username", e.target.value)}
              onBlur={(e) => validUsername(e.target.value)}
              isInvalid={errors.username}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => addForm("email", e.target.value)}
              onBlur={(e) => emailValid(e.target.value)}
              isInvalid={errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Form.Group controlId="formGridText">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Street, number, city, zip"
            onChange={(e) => addForm("address", e.target.value)}
            onBlur={(e) => validAddress(e.target.value)}
            isInvalid={errors.address}
          />
          <Form.Control.Feedback type="invalid">
            {errors.address}
          </Form.Control.Feedback>
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Course</Form.Label>
            <Form.Select
              defaultValue=""
              onChange={(e) => addForm("course", e.target.value)}
              onBlur={(e) => validCourse(e.target.value)}
              isInvalid={errors.course}
            >
              <option value="">Select course</option>
              <option value="React">React</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Java">Java</option>
              <option value="Python">Python</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.course}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} className="mt-4" controlId="formGridText">
            <Form.Label>Gender</Form.Label>
            <ToggleButtonGroup
              style={errors.gender ? { border: "3px solid red" } : {}}
              className="group-btns"
              type="radio"
              name="options"
              defaultValue=""
            >
              <ToggleButton
                id="tbg-radio-1"
                value={"male"}
                onChange={(e) => addForm("gender", e.target.value)}
              >
                Male
              </ToggleButton>
              <ToggleButton
                id="tbg-radio-2"
                value={"female"}
                onChange={(e) => addForm("gender", e.target.value)}
              >
                Female
              </ToggleButton>
              <ToggleButton
                id="tbg-radio-3"
                value={"other"}
                onChange={(e) => addForm("gender", e.target.value)}
              >
                Other
              </ToggleButton>
            </ToggleButtonGroup>
            <Form.Control.Feedback
              style={errors.gender ? { display: "block" } : { display: "none" }}
              type="invalid"
            >
              {errors.gender}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button className="submit-btn" variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </>
  );
}

export default MyForm;
