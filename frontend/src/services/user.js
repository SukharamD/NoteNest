export const getUserProfile = async () => {
  const token = localStorage.getItem('token');

  if (!token) return null;

  try {
    const res = await fetch('http://127.0.0.1:8000/api/user/', {
      headers: {
        Authorization: `Token ${token}`
      }
    });

    if (res.ok) {
      return await res.json(); 
    }
  } catch (err) {
    console.log("Error fetching user profile", err);
  }

  return null;
};
