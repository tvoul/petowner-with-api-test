// Global variable to hold our pets
let ownersAndPets;

async function readJson() {
  // Fetch the data as text/raw object
  let rawData = await fetch(
    '/api/petOwnersAndPets/?order=ownerId,lastName,firstName,species,petName'
  );
  // Convert from json to an array of objects
  ownersAndPets = await rawData.json();
  // After fetching the data call render to show the pets
  render();
}

function render() {
  // Create a holder for html we are going to create
  let html = '<div><h1>Owners and pets</h1>';

  // Remember which owner that was displayed latest
  let latestDisplayOwnerId = 0;

  // Remember: Each row has the fields
  // ownerId, firstName, lastName, email, petId, species, petName

  // Loop through the rows/objects to create html
  for (let row of ownersAndPets) {
    // Add html for an owner (if different one than last row)
    if (latestDisplayOwnerId !== row.ownerId) {
      html += `
        </div><div class="owner">
          <div class="ownerInfo">
            <h2>${row.firstName} ${row.lastName}</h2>
            <p><b>Email:</b> ${row.email}</p>
          </div>
      `;
      latestDisplayOwnerId = row.ownerId;
    }
    // Add html for a pet
    html += `
      <div class="pet">
        <h3>${row.petName}</h3>
        <p><b>Species:</b> ${row.species}</p>
        <img src="/images/petsByid/${row.petId}.jpg">
      </div>
    `;
  }
  html += '</div>';
  // Add the created html to the ownersAndPets div in the DOM
  document.querySelector('.ownersAndPets').innerHTML = html;
}

// Start
readJson();