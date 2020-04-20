import React, { useState, useEffect } from "react";

export default function UsersList () {
  const [ users, setUsers ] = useState([]);

  useEffect(() => {

    fetch("http://localhost:3001/users")
      .then(resp => resp.json())
      .then(data => setUsers(data));

  }, []);

  if (users.length > 0) {
    return (
      <ul>
        {users.map(u => <li key={u.id}>{u.name}</li>)}
      </ul>
    );
  }

  return <p>Loading...</p>
};