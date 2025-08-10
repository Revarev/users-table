import {useEffect, useState} from 'react'
import './App.css'
import Modal from "./components/Modal/Modal.jsx";


function App() {

    const [users, setUsers] = useState([]);
    const [displayUsers, setDisplayUsers] = useState([]);
    const [sortConfig, setSortConfig] = useState({
            field: 'null',
            direction: 'none',
    });
    const [modalOpen, setModalOpen] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://dummyjson.com/users');
                const data = await response.json();
                setUsers(data.users);
                setDisplayUsers(data.users);
            } catch (error) {
                console.error('Error fetching users', error);
            }
        }
        fetchUsers();
    },[]);

    const handleSort = (key) => {
        let direction = 'asc';

        if (sortConfig.key === key) {
            if(sortConfig.direction === 'asc') {direction = 'desc'}
            else if (sortConfig.direction === 'desc') {direction = 'none';}
        }
        setSortConfig({key, direction})

        if (direction === 'none') {
            setDisplayUsers([...users]);
            return;
        }

        const sortedUsers = [...displayUsers].sort((a, b) => {
            const getValue = (item) => {
                switch (key) {
                    case 'lastName':
                        return `${item.lastName}`.toLowerCase();
                    case 'firstName':
                        return `${item.firstName}`.toLowerCase();
                    case 'maidenName':
                        return `${item.maidenName}`.toLowerCase();
                    case 'age':
                        return item.age;
                    case 'gender':
                        return item.gender;
                    case 'phone':
                        return item.phone.replace(/\D/g, '');
                    case 'city':
                        return `${item.address?.city || ''}`.toLowerCase();
                }
            }

            const valueA = getValue(a);
            const valueB = getValue(b);

            if (valueA < valueB) return direction === 'asc' ?  -1 : 1;
            if (valueA > valueB) return direction === 'asc' ?  1 : -1;
        })
        setDisplayUsers(sortedUsers);
    }
    const getSortIndicator = (key) => {
        if (sortConfig.key !== key) return '↕';
        if (sortConfig.direction === 'asc') return '↓';
        if (sortConfig.direction === 'desc') return '↑';
        return '↕';
    };

    const openUserModal = (user) => {
        setModalOpen(true);
        setSelectedUser(user);
    }
    const closeModal = () => {
        setModalOpen(false);
        setSelectedUser(null);
    }

  return (
    <div>
        <table>
            <caption>Таблица данных пользователей</caption>
            <thead>
                <tr>
                    <th onClick={() => handleSort('lastName')}>Фамилия {getSortIndicator('lastName')}</th>
                    <th onClick={() => handleSort('firstName')}>Имя {getSortIndicator('firstName')}</th>
                    <th onClick={() => handleSort('maidenName')}>Отчесвто{getSortIndicator('maidenName')}</th>
                    <th onClick={() => handleSort('age')}>Возраст{getSortIndicator('age')}</th>
                    <th onClick={() => handleSort('gender')}>Пол{getSortIndicator('gender')}</th>
                    <th onClick={() => handleSort('phone')}>Номер телефона{getSortIndicator('phone')}</th>
                    <th>Email</th>
                    <th>Страна</th>
                    <th onClick={() => handleSort('city')}>Город {getSortIndicator('city')}</th>
                </tr>
            </thead>
            <tbody>
                {displayUsers.map(user => (
                    <tr key={user.id} onClick={() => openUserModal(user)} className="userInfo">
                        <td>{user.lastName}</td>
                        <td>{user.firstName}</td>
                        <td>{user.maidenName}</td>
                        <td>{user.age}</td>
                        <td>{user.gender}</td>
                        <td>{user.phone}</td>
                        <td>{user.email}</td>
                        <td>{user.address?.country}</td>
                        <td>{user.address?.city}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        {modalOpen && (
            <Modal
                onClose={closeModal}
                user={selectedUser}
            />
        )}
    </div>
  )
}

export default App
