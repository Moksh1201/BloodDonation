// import React, { useState, useEffect } from 'react';
// import './Recipients.css';
// import { getRecipients, getRecipientById, createRecipient, updateRecipient, deleteRecipient } from '../services/recipientService';

// const Recipients = () => {
//   const [recipients, setRecipients] = useState([]);
//   const [recipient, setRecipient] = useState(null);
//   const [id, setId] = useState('');
//   const [newRecipient, setNewRecipient] = useState({ name: '', bloodType: '', location: '' });
//   const [updateData, setUpdateData] = useState({ id: '', name: '', location: '' });
//   const [deleteId, setDeleteId] = useState('');
//   const [isCreating, setIsCreating] = useState(false);
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchRecipients();
//   }, []);

//   const fetchRecipients = async () => {
//     try {
//       const response = await getRecipients();
//       setRecipients(response.data);
//     } catch (error) {
//       console.error('Error fetching recipients:', error);
//     }
//   };

//   const fetchRecipientById = async (id) => {
//     try {
//       const response = await getRecipientById(id);
//       setRecipient(response.data);
//       setUpdateData({ id: response.data.id, name: response.data.name, location: response.data.location });
//       setError('');
//     } catch (error) {
//       console.error('Error fetching recipient by ID:', error);
//       setError('Recipient not found');
//     }
//   };

//   const handleGetById = () => {
//     fetchRecipientById(id);
//   };

//   const handleCreate = async () => {
//     try {
//       await createRecipient(newRecipient);
//       fetchRecipients();
//       setNewRecipient({ name: '', bloodType: '', location: '' });
//       setIsCreating(false);
//     } catch (error) {
//       console.error('Error creating recipient:', error);
//     }
//   };

//   const handleUpdate = async () => {
//     if (window.confirm('Are you sure you want to update this recipient?')) {
//       try {
//         await updateRecipient(updateData.id, { name: updateData.name, location: updateData.location });
//         fetchRecipients();
//         setUpdateData({ id: '', name: '', location: '' ,bloodType: ''});
//         setIsUpdating(false);
//       } catch (error) {
//         console.error('Error updating recipient:', error);
//       }
//     }
//   };

//   const handleDelete = async () => {
//     if (window.confirm('Are you sure you want to delete this recipient?')) {
//       try {
//         await deleteRecipient(deleteId);
//         fetchRecipients();
//         setDeleteId('');
//         setIsDeleting(false);
//       } catch (error) {
//         console.error('Error deleting recipient:', error);
//       }
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdateData({ ...updateData, [name]: value });
//   };

//   const handleNewInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewRecipient({ ...newRecipient, [name]: value });
//   };

//   return (
//     <div className="recipients-container">
//       <h1>Manage Recipients</h1>
      
//       {/* Fetch Recipient By ID */}
//       <div className="fetch-recipient">
//         <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="Enter ID" />
//         <button onClick={handleGetById}>Get Recipient By ID</button>
//       </div>
//       {error && <p className="error-message">{error}</p>}
      
//       {/* Create New Recipient */}
//       <div className="create-recipient">
//         <button onClick={() => setIsCreating(true)}>Create New Recipient</button>
//         {isCreating && (
//           <div className="form-container">
//             <h2>Add New Recipient</h2>
//             <input
//               type="text"
//               name="name"
//               value={newRecipient.name}
//               onChange={handleNewInputChange}
//               placeholder="Recipient Name"
//             />
//             <input
//               type="text"
//               name="bloodType"
//               value={newRecipient.bloodType}
//               onChange={handleNewInputChange}
//               placeholder="Recipient Blood Type"
//             />
//             <input
//               type="text"
//               name="location"
//               value={newRecipient.location}
//               onChange={handleNewInputChange}
//               placeholder="Recipient Location"
//             />
//             <button onClick={handleCreate}>Add Recipient</button>
//           </div>
//         )}
//       </div>

//       {/* List and Update/Delete Recipients */}
//       <div className="recipients-list">
//         <h2>All Recipients</h2>
//         {recipients.map((recipient) => (
//           <div className="recipient-card" key={recipient.id}>
//             <h3>{recipient.name}</h3>
//             <p>Blood Type: {recipient.bloodType}</p>
//             <p>Location: {recipient.location}</p>
//             <button onClick={() => {
//               setIsUpdating(true);
//               setUpdateData({ id: recipient.id, name: recipient.name, location: recipient.location });
//             }}>Update</button>
//             <button onClick={() => {
//               setIsDeleting(true);
//               setDeleteId(recipient.id);
//             }}>Delete</button>
//           </div>
//         ))}
//       </div>
      
//       {/* Update Recipient */}
//       {isUpdating && (
//         <div className="update-recipient">
//           <h2>Update Recipient</h2>
//           <input
//             type="text"
//             name="name"
//             value={updateData.name}
//             onChange={handleInputChange}
//             placeholder="Update Name"
//           />
//           <input
//             type="text"
//             name="location"
//             value={updateData.location}
//             onChange={handleInputChange}
//             placeholder="Update Location"
//           />
//            <input
//             type="text"
//             name="bloodType"
//             value={updateData.bloodType}
//             onChange={handleInputChange}
//             placeholder="Update Bloodgroup"
//           />
//           <button onClick={handleUpdate}>Update</button>
//         </div>
//       )}
      
//       {/* Delete Recipient */}
//       {isDeleting && (
//         <div className="delete-recipient">
//           <h2>Delete Recipient</h2>
//           <input
//             type="text"
//             value={deleteId}
//             onChange={(e) => setDeleteId(e.target.value)}
//             placeholder="Enter ID to Delete"
//           />
//           <button onClick={handleDelete}>Delete</button>
//         </div>
//       )}
      
//       {/* Recipient Details */}
//       {recipient && (
//         <div className="recipient-details">
//           <h2>Recipient Details</h2>
//           <p>ID: {recipient.id}</p>
//           <p>Name: {recipient.name}</p>
//           <p>Blood Type: {recipient.bloodType}</p>
//           <p>Location: {recipient.location}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Recipients;

import React, { useState, useEffect } from 'react';
import './Recipients.css';
import {
  getRecipients,
  getRecipientById,
  createRecipient,
  updateRecipient,
  deleteRecipient,
} from '../services/recipientService';

const Recipients = () => {
  const [recipients, setRecipients] = useState([]);
  const [recipient, setRecipient] = useState(null);
  const [id, setId] = useState('');
  const [newRecipient, setNewRecipient] = useState({
    name: '',
    bloodType: '',
    location: '',
  });
  const [updateData, setUpdateData] = useState({
    id: '',
    name: '',
    location: '',
    bloodType: '',
  });
  const [deleteId, setDeleteId] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRecipients();
  }, []);

  const fetchRecipients = async () => {
    try {
      const response = await getRecipients();
      setRecipients(response.data);
    } catch (error) {
      console.error('Error fetching recipients:', error);
    }
  };

  const fetchRecipientById = async (id) => {
    try {
      const response = await getRecipientById(id);
      setRecipient(response.data);
      setUpdateData({
        id: response.data.id,
        name: response.data.name,
        location: response.data.location,
        bloodType: response.data.bloodType,
      });
      setError('');
    } catch (error) {
      console.error('Error fetching recipient by ID:', error);
      setError('Recipient not found');
    }
  };

  const handleGetById = () => {
    fetchRecipientById(id);
  };

  const handleCreate = async () => {
    try {
      await createRecipient(newRecipient);
      fetchRecipients();
      setNewRecipient({ name: '', bloodType: '', location: '' });
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating recipient:', error);
    }
  };

  const handleUpdate = async () => {
    if (window.confirm('Are you sure you want to update this recipient?')) {
      try {
        await updateRecipient(updateData.id, {
          name: updateData.name,
          location: updateData.location,
          bloodType: updateData.bloodType,
        });
        fetchRecipients();
        setUpdateData({ id: '', name: '', location: '', bloodType: '' });
        setIsUpdating(false);
      } catch (error) {
        console.error('Error updating recipient:', error);
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this recipient?')) {
      try {
        await deleteRecipient(deleteId);
        fetchRecipients();
        setDeleteId('');
        setIsDeleting(false);
      } catch (error) {
        console.error('Error deleting recipient:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipient({ ...newRecipient, [name]: value });
  };

  const closePopup = () => {
    setIsCreating(false);
    setIsUpdating(false);
    setIsDeleting(false);
  };

  return (
    <div className="recipients-container">
      <h1>Manage Recipients</h1>

      {/* Fetch Recipient By ID */}
      <div className="action-section">
        <div className="fetch-recipient">
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter ID"
          />
          <button onClick={handleGetById}>Get Recipient By ID</button>
        </div>

        {/* Create New Recipient */}
        <div className="create-recipient">
          <button onClick={() => setIsCreating(true)}>Create New Recipient</button>
          {isCreating && (
            <div className="form-container">
              <div className="popup-header">
                <h2>Add New Recipient</h2>
                <button className="close-button" onClick={closePopup}>
                  &times;
                </button>
              </div>
              <input
                type="text"
                name="name"
                value={newRecipient.name}
                onChange={handleNewInputChange}
                placeholder="Recipient Name"
              />
              <input
                type="text"
                name="bloodType"
                value={newRecipient.bloodType}
                onChange={handleNewInputChange}
                placeholder="Recipient Blood Type"
              />
              <input
                type="text"
                name="location"
                value={newRecipient.location}
                onChange={handleNewInputChange}
                placeholder="Recipient Location"
              />
              <button onClick={handleCreate}>Add Recipient</button>
            </div>
          )}
        </div>
      </div>
      
      {error && <p className="error-message">{error}</p>}

      {/* List and Update/Delete Recipients */}
      <div className="recipients-list">
        <h2>All Recipients</h2>
        <table className="recipients-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Blood Type</th>
              <th>Location</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {recipients.map((recipient) => (
              <tr key={recipient.id}>
                <td>{recipient.id}</td>
                <td>{recipient.name}</td>
                <td>{recipient.bloodType}</td>
                <td>{recipient.location}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => {
                      setIsUpdating(true);
                      setUpdateData({
                        id: recipient.id,
                        name: recipient.name,
                        location: recipient.location,
                        bloodType: recipient.bloodType,
                      });
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => {
                      setIsDeleting(true);
                      setDeleteId(recipient.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Recipient */}
      {isUpdating && (
        <div className="update-recipient form-container">
          <div className="popup-header">
            <h2>Update Recipient</h2>
            <button className="close-button" onClick={closePopup}>
              &times;
            </button>
          </div>
          <input
            type="text"
            name="name"
            value={updateData.name}
            onChange={handleInputChange}
            placeholder="Update Name"
          />
          <input
            type="text"
            name="location"
            value={updateData.location}
            onChange={handleInputChange}
            placeholder="Update Location"
          />
          <input
            type="text"
            name="bloodType"
            value={updateData.bloodType}
            onChange={handleInputChange}
            placeholder="Update Blood Type"
          />
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}

      {/* Delete Recipient */}
      {isDeleting && (
        <div className="delete-recipient form-container">
          <div className="popup-header">
            <h2>Delete Recipient</h2>
            <button className="close-button" onClick={closePopup}>
              &times;
            </button>
          </div>
          <input
            type="text"
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
            placeholder="Enter ID to Delete"
          />
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}

      {/* Recipient Details */}
      {recipient && (
        <div className="recipient-details">
          <h2>Recipient Details</h2>
          <p>ID: {recipient.id}</p>
          <p>Name: {recipient.name}</p>
          <p>Blood Type: {recipient.bloodType}</p>
          <p>Location: {recipient.location}</p>
        </div>
      )}
    </div>
  );
};

export default Recipients;
