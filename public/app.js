const API_URL = '/api/properties';
    const AUTH_URL = '/api';
    let authToken = null;

    // UI Elements
    const authModal = document.getElementById('authModal');
    const authForm = document.getElementById('authForm');
    const authTitle = document.getElementById('authTitle');
    const authError = document.getElementById('authError');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const dashboardLink = document.getElementById('dashboardLink');
    const propertyList = document.getElementById('propertyList');

    // Sample properties
    const sampleProperties = [
      {
        title: "Modern Downtown Loft",
        location: "New York, NY",
        price: "$850,000",
        bedrooms: 2,
        bathrooms: 1
      },
      {
        title: "Luxury Beachfront Villa",
        location: "Miami, FL",
        price: "$2,500,000",
        bedrooms: 5,
        bathrooms: 4
      },
      {
        title: "Cozy Suburban Home",
        location: "Austin, TX",
        price: "$1,200,000",
        bedrooms: 4,
        bathrooms: 3
      }
    ];

    // Show sample properties
    function showSampleProperties() {
      propertyList.innerHTML = `
        <div class="property-list">
          ${sampleProperties.map(property => `
            <div class="property-card">
              <div class="property-image"></div>
              <div class="property-card-content">
                <h2>${property.title}</h2>
                <p><strong>Location:</strong> ${property.location}</p>
                <p><strong>Price:</strong> ${property.price}</p>
                <p><strong>Bedrooms:</strong> ${property.bedrooms}</p>
                <p><strong>Bathrooms:</strong> ${property.bathrooms}</p>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    // Handle login button click
    loginBtn.addEventListener('click', () => {
      authTitle.textContent = 'Login';
      authForm.dataset.mode = 'login';
      authModal.classList.add('visible');
      authError.textContent = '';
    });

    // Handle register button click
    registerBtn.addEventListener('click', () => {
      authTitle.textContent = 'Register';
      authForm.dataset.mode = 'register';
      authModal.classList.add('visible');
      authError.textContent = '';
    });

    // Handle modal background click
    authModal.addEventListener('click', (e) => {
      if (e.target === authModal) {
        authModal.classList.remove('visible');
      }
    });

    // Handle auth form submission
    authForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);
      const isLogin = authForm.dataset.mode === 'login';

      try {
        const endpoint = isLogin ? 'login' : 'register';
        const body = isLogin ? {
          email: data.email,
          password: data.password
        } : {
          username: data.username,
          email: data.email,
          password: data.password
        };

        const response = await fetch(`${AUTH_URL}/${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        const result = await response.json();
        if (response.ok) {
          authToken = result.token;
          authModal.classList.remove('visible');
          loginBtn.style.display = 'none';
          registerBtn.style.display = 'none';
          dashboardLink.style.display = 'block';
          localStorage.setItem('token', authToken);
        } else {
          authError.textContent = result.error || 'Authentication failed';
        }
      } catch (error) {
        authError.textContent = 'Network error';
      }
    });

    // Initial load
    showSampleProperties();
