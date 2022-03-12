import { useRef, useState, useEffect } from "react";
import Layout from "../layout/Layout";
import Card from "../ui/Card";
import { Form, Button, FormControl, Row,Alert, Spinner } from "react-bootstrap";
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
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  let userRole = localStorage.getItem("role");
  const token = localStorage.getItem("token")
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
          if (data.message == "No student record found") {
            setError(data.message);
            setSuccess("");
            setTimeout(() => {  setError(""); }, 1000);
          
          } 

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
     headers: { "Content-Type": "application/json" , "Authorization":"Bearer " + token},
    })
      .then((response) => {
        //  console.log(response);
        return response.json();
      })
      .then((data) => {
        // alert(data.message);
        // console.log(data);
        if (data.message == "Message Sent!") {
          setSuccess(data.message);
          setError("");
          setTimeout(() => {  setSuccess(""); }, 1000);
        
        } else {
          setError(data.message);
          setSuccess("");
          setTimeout(() => {  setError(""); }, 1000);
          
         
        }
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
         {error && <Alert variant="danger">{error}</Alert>}
       {success && <Alert variant="success">{success}</Alert>}
        <Row>
       
          <FormControl
            type="text"
            placeholder="Search student's parent phone by Student ID"
            ref={id}
            className=" mr-sm-2"
            style={{ marginTop: "25px", width: "50%", marginLeft:"15px" }}
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
            <svg style={{marginRight:"10px"}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>  Search
            </Button>
          </Form>
        </Row>
        <Card >
          <Form onSubmit={submitHandler} >
            <Form.Group id="phone">
              <Form.Label style={{marginLeft:"15px", width:"90%",marginTop:"15px"}}>To</Form.Label>
              <Form.Control
                type="text"
                ref={subjectRef}
                size="sm"
                required
                disabled={true}
                value={parentPhones}
                style={{marginLeft:"15px", width:"95%"}}
              />
            </Form.Group>

            <Form.Group id="title">
              <Form.Label style={{marginLeft:"15px", width:"90%"}}>Subject</Form.Label>
              <Form.Control type="text" ref={subjectRef} size="sm" required style={{marginLeft:"15px", width:"95%"}} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label style={{marginLeft:"15px", width:"90%"}}>Message</Form.Label>
              <Form.Control as="textarea" rows={6} ref={messageRef} required style={{marginLeft:"15px", width:"95%"}}/>
            </Form.Group>
<div style={{display:"flex", justifyContent:"center", marginBottom:"20px"}}>
<Button className="w-50" style={{marginBottom:"20px"}}  type="submit">
<svg xmlns="http://www.w3.org/2000/svg" style={{marginRight:"10px"}} width="20" height="20" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
</svg>  Send Message
            </Button>
</div>
            
          </Form>
        </Card>
      </LayoutCenter>
    );
  } else {
    return <Login />;
  }
}

export default SendMessage;
