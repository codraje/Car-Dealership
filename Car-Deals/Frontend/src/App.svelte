<script>
  import { Router, Route } from 'svelte-routing';
  import Home from './routes/Home.svelte';
  import Auth from './routes/Auth.svelte';
  import Dashboard from './routes/Dashboard.svelte';

  // Define routes
  const routes = [
    { path: '/', component: Home },
    { path: '/auth', component: Auth },
    { path: '/dashboard', component: Dashboard }
    // Add more routes as needed
  ];
</script>

<main>
  <Router>
    {#each routes as { path, component }}
      <Route {path} {component} />
    {/each}
  </Router>
</main>

<style>
  /* Add global styles here */
  main {
    padding: 20px;
  }
</style>
