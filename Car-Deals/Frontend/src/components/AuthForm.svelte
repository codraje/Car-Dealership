<script>
  let email = '';
  let password = '';

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      console.log(data);
      // Handle authentication success, e.g., redirect to dashboard
    } catch (error) {
      console.error('Error:', error);
      // Handle authentication failure, e.g., display error message
    }
  }
</script>

<form on:submit={handleSubmit}>
  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" bind:value={email} required />
  </div>
  <div>
    <label for="password">Password:</label>
    <input type="password" id="password" bind:value={password} required />
  </div>
  <button type="submit">Login</button>
</form>
