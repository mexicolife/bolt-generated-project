const API_URL = '/api/properties';
    let authToken = localStorage.getItem('token');

    // Check authentication
    if (!authToken) {
      window.location.href = '/';
    }

    // Handle logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
      localStorage.removeItem('token');
      window.location.href = '/';
    });

    // Handle property form submission
    document.getElementById('propertyForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken,
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          alert('Property added successfully!');
          e.target.reset();
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
