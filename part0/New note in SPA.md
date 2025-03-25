sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser:  [{"message":"note created"}]
    deactivate server
    
    Note right of server: The server responds with status code 201 Created.
    Note right of browser: The browser sends an HTTP request containing the new note as JSON and stays on the same page. Meanwhile, it renders the data using JavaScript fetched earlier.

