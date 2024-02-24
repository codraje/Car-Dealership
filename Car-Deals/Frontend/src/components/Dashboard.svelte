<script>
  import { getOwnedVehicles } from '../api/vehicle'; // Import the function to fetch owned vehicles from your API

  let ownedVehicles = [];

  async function fetchOwnedVehicles() {
    try {
      const response = await getOwnedVehicles();
      ownedVehicles = response; // Update ownedVehicles array with the fetched data
    } catch (error) {
      console.error('Error:', error);
      // Handle error fetching owned vehicles
    }
  }

  // Fetch owned vehicles when the component is mounted
  onMount(fetchOwnedVehicles);
</script>

<h1>Welcome to Dashboard</h1>

{#if ownedVehicles.length > 0}
  <h2>Your Owned Vehicles:</h2>
  <ul>
    {#each ownedVehicles as vehicle}
      <li>{vehicle.make} - {vehicle.model}</li>
    {/each}
  </ul>
{:else}
  <p>No owned vehicles found</p>
{/if}
