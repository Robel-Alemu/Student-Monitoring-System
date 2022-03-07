import { useRef, useState, useEffect } from "react";
import Layout from "../layout/Layout";
import Card from "../ui/Card";
import { Form, Button, FormControl, Row, Spinner } from "react-bootstrap";
import LayoutCenter from "../layout/LayoutCenter";
import Login from "../authentication/Login";
function SendMessage() {
  const id = useRef();
  const phone1 = useRef();
  const phone2 = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [student, setStudent] = useState([]);
  const [message, setMessage] = useState();
  const messageRef = useRef();
  const subjectRef = useRef();
  const [parentPhones, setParentPhones] = useState();

  let userRole = localStorage.getItem("role");
  function searchHandler() {
    setIsLoading(true);
    fetch(
      "http://localhost:8080/api/Student-Information/" + id.current.value
      // "https://student-monitoring.herokuapp.com/api/Student-Information/"+enteredId
    )
      .then((response) => {
        console.log(response.body);
        return response.json();
      })
      .then((data) => {
        const student = [];

        for (const key in data) {
          const studentData = {
            id: key,
            ...data[key],
          };
          student.push(studentData);
        }
        // setIsLoading(false);
        setStudent(student);
        setParentPhones(student[0][0].parentPhones);
        console.log(student[0][0])
        setIsLoading(false);
      });
  }

  function submitHandler(event) {
    event.preventDefault();

    const broadcastMessage = messageRef.current.value;
    const title = subjectRef.current.value;
    const date = new Date();

    const currentDate =
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2);

    if (parentPhones.length > 1) {
      const m = [
        {
          date: currentDate,

          subject: title,
          parentPhones: parentPhones[0],
          message: broadcastMessage,
        },
        {
          date: currentDate,

          subject: title,
          parentPhones: parentPhones[1],
          message: broadcastMessage,
        },
      ];
      setMessage(m);
      console.log(message);
    } else {
      const m = {
        date: currentDate,

        subject: title,
        parentPhones: parentPhones[0],
        message: broadcastMessage,
      };
      setMessage(m);
    }

    fetch("http://localhost:8080/api/send-message", {
      method: "POST",
      body: JSON.stringify(message),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        //  console.log(response);
        return response.json();
      })
      .then((data) => {
        alert(data.message);
        console.log(data);
      });
  }

  useEffect(() => {}, []);

  if (isLoading) {
    return (
      <section>
        <Layout>
          <div>
            <h5 style={{ color: "black" }}>Loading Please Wait...</h5>
            <Spinner style={{ color: "black" }} animation="border" />
          </div>
        </Layout>
      </section>
    );
  }

  if (userRole == "Admin") {
    return (
      <LayoutCenter>
        <Row>
          <FormControl
            type="text"
            placeholder="Search student's parent phone by Student ID"
            ref={id}
            className=" mr-sm-2"
            style={{ marginTop: "25px", width: "50%" }}
            required
          />
          <Form >
            <Button
              className="w-100"
              style={{
                marginTop: "25px",
                marginBottom: "40px",
                marginLeft: "15px",
              }}
              onClick={searchHandler}
            >
              Search
            </Button>
          </Form>
        </Row>
        <Card>
          <Form onSubmit={submitHandler}>
            <Form.Group id="phone">
              <Form.Label>To</Form.Label>
              <Form.Control
                type="text"
                ref={subjectRef}
                size="sm"
                required
                value={parentPhones}
              />
            </Form.Group>

            <Form.Group id="title">
              <Form.Label>Subject</Form.Label>
              <Form.Control type="text" ref={subjectRef} size="sm" required />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={6} ref={messageRef} required />
            </Form.Group>

            <Button className="w-100" type="submit">
              Send Message
            </Button>
          </Form>
        </Card>
      </LayoutCenter>
    );
  } else {
    return <Login />;
  }
}

export default SendMessage;
