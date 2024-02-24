<script>
  export let vehicle;

  function viewDetails() {
    // Implement logic to view details of the vehicle
    console.log('View details of:', vehicle);
  }

  function buyVehicle() {
    // Implement logic to buy the vehicle
    console.log('Buy:', vehicle);
  }
</script>

<div class="card">
  <div class="card-header">
    <h3>{vehicle.make} - {vehicle.model}</h3>
  </div>
  <div class="card-body">
    <p>Price: ${vehicle.price}</p>
    <p>Year: {vehicle.year}</p>
    <p>Color: {vehicle.color}</p>
    <!-- Add more vehicle details as needed -->
  </div>
  <div class="card-footer">
    <button on:click={viewDetails}>View Details</button>
    <button on:click={buyVehicle}>Buy</button>
  </div>
</div>

<style>
  /* Add CSS styles for the vehicle card */
  .card {
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 10px;
  }

  .card-header {
    background-color: #f0f0f0;
    border-bottom: 1px solid #ccc;
    padding-bottom: 5px;
    margin-bottom: 5px;
  }

  .card-body {
    margin-bottom: 10px;
  }

  .card-footer {
    text-align: right;
  }

  button {
    margin-left: 5px;
  }
</style>
