
import MessageList from "../admin/MessageList";

import { useState, useEffect } from "react";
import {Button,Spinner } from "react-bootstrap"
function AllBroadcastMessagesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMessages, setLoadedMessages] = useState([]);
  
  useEffect(() => {
     setIsLoading(true);
    fetch(
      "http://localhost:8080/api/broadcast-messages",{
        method: "GET",
        
        headers: { "Content-Type": "application/json" , "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1aWQiOiJvdDZHSmx6WDVoZ2U1WkoyYW5vUFc3Z0R2MkEyIiwiZW1haWwiOiJqd3RAZ21haWwuY29tIn0sImlhdCI6MTY0NjE3MjEyOCwiZXhwIjoxNjQ2MjAyMTI4fQ.-7zI_9R8ipKIEiRnamuzhbdrxvOJJZfEGQceU52IA7Y"},
      }
      // "https://student-monitoring.herokuapp.com/api/broadcast-messages"
    )
      .then((response) => {
        console.log(response.body);
        return response.json();
      })
      .then((data) => {
        const messages = [];

        for (const key in data) {
          const message = {
            id: key,
            ...data[key],
          };
          messages.push(message);
        }
        setIsLoading(false);
        setLoadedMessages(messages);
      });
  },[]);

  if (isLoading) {
    return (
      <section>
          <Button variant="primary" disabled>
    <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    />
    <span className="visually-hidden">Loading...please wait</span>
  
  </Button>
      </section>
    );
  }

  return (
    <section >
      <h1>All Announcements</h1>

      
      <MessageList  messages = {loadedMessages} />

    </section>
  );
}

export default AllBroadcastMessagesPage;
