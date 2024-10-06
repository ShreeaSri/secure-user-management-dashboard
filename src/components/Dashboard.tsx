import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { getUsers } from '../services/api';
import { setUsers } from '../redux/slices/userSlice';

const Dashboard: React.FC = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers(1);
      dispatch(setUsers(response.data.data));
    };

    fetchUsers();
  }, [dispatch]);

  return (
    <div className="container mx-auto">
      <h1>Dashboard</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.first_name} {user.last_name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
