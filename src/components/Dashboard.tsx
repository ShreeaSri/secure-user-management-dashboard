import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { getUsers } from '../services/api';
import { setUsers } from '../redux/slices/userSlice';
import Modal from '../reusableComponents/Modal';
import { signOut } from '../redux/slices/authSlice';
import Button from '../reusableComponents/Button';

const Dashboard: React.FC = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers(page); 
      dispatch(setUsers(response.data.data));
      setTotalPages(response.data.total_pages); 
    };

    fetchUsers();
  }, [dispatch, page]); 

  const handleUserClick = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsLogoutModalOpen(false);
  };

  const handleConfirmLogout = () => {
    console.log("User logged out");
    setIsLogoutModalOpen(false);
    dispatch(signOut())
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className='flex items-center justify-between mb-2'>
        <h1 className="text-2xl font-bold mb-4 text-amber-700">Dashboard</h1>
        <Button clickHandler={handleLogoutClick}>
          Log Out
        </Button>
      </div>

      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="cursor-pointer p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200"
            onClick={() => handleUserClick(user)}
          >
            <p className="font-semibold text-amber-700">{user.first_name} {user.last_name}</p>
            <p className="text-gray-600 text-sm">{user.email}</p>
          </li>
        ))}
      </ul>

      <div className="flex justify-center space-x-2 mt-4">
        <Button
          disabled={page === 1}
          clickHandler={() => handlePageChange(page - 1)}
        >
          Previous
        </Button>
        <span className="px-4 py-2">Page {page} of {totalPages}</span>
        <Button
          disabled={page === totalPages}
          clickHandler={() => handlePageChange(page + 1)}
        >
          Next
        </Button>
      </div>

      {isModalOpen && selectedUser && (
        <Modal title={`${selectedUser.first_name} ${selectedUser.last_name}`} onClose={handleCloseModal}>
          <div className="flex flex-col items-center">
            <img
              src={selectedUser.avatar}
              alt={`${selectedUser.first_name}'s avatar`}
              className="w-32 h-32 rounded-full mb-4"
            />
            <p className="text-lg font-semibold">{selectedUser.first_name} {selectedUser.last_name}</p>
            <p className="text-gray-600">{selectedUser.email}</p>
          </div>
        </Modal>
      )}

      {isLogoutModalOpen && (
        <Modal title="Log Out" onClose={handleCloseModal}>
          <div className="text-center">
            <p className="mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-center space-x-4">
              <Button
                clickHandler={handleConfirmLogout} 
              >
                Yes, Log Out
              </Button>
              <button
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                onClick={handleCloseModal} 
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
