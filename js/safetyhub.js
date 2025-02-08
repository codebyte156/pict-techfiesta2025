let map, marker, policeMarker, hospitalMarker, service;
let nearestPoliceLocation; // Store the nearest police station's location
let nearestHospitalLocation; // Store the nearest hospital's location

function initMap(lat, lng) {
    if (!map) {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat, lng },
            zoom: 15,
        });

        marker = new google.maps.Marker({
            position: { lat, lng },
            map: map,
            title: "You are here",
            label: "You",
        });

        service = new google.maps.places.PlacesService(map);
    } else {
        marker.setPosition({ lat, lng });
        map.setCenter({ lat, lng });
    }

    findNearestPolice(lat, lng);
    findNearestHospital(lat, lng);

    // Scroll to the map after it's initialized
    document.getElementById("map-container").scrollIntoView({ behavior: "smooth" });
}

function findNearestPolice(lat, lng) {
    const location = new google.maps.LatLng(lat, lng);

    service.nearbySearch(
        {
            location,
            radius: 1500,
            keyword: "police",
        },
        (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
                const nearest = results[0];
                document.getElementById("police").textContent = `${nearest.name}, ${nearest.vicinity}`;
                nearestPoliceLocation = nearest.geometry.location; // Save the location for navigation

                policeMarker = new google.maps.Marker({
                    position: nearest.geometry.location,
                    map: map,
                    title: "Nearest Police Station",
                    label: "Police Station", // Label for Police Station
                });

                document.getElementById("info").classList.remove("hidden");
                document.getElementById("navigate-btn").classList.remove("hidden");
            } else {
                document.getElementById("police").textContent = "Nearest Police Station: Not Found.";
                nearestPoliceLocation = null; // Reset if no station is found
            }
        }
    );
}

function findNearestHospital(lat, lng) {
    const location = new google.maps.LatLng(lat, lng);
    
    service.nearbySearch(
        {
            location,
            radius: 1500,
            keyword: "hospital",
        },
        (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
                const nearest = results[0];
                const hospitalInfo = document.createElement("p");
                document.getElementById("hospital").classList.remove("hidden");
                hospitalInfo.classList.add("hospital");
                hospitalInfo.textContent = `${nearest.name}, ${nearest.vicinity}`;
                
                nearestHospitalLocation = nearest.geometry.location; // Save the location for navigation

                hospitalMarker = new google.maps.Marker({
                    position: nearest.geometry.location,
                    map: map,
                    title: "Nearest Hospital/Clinic",
                    label: "Hospital", // Label for Hospital
                });
                
                document.getElementById("hospital").appendChild(hospitalInfo);

                // Add a "Navigate to Hospital" button
                const navigateHospitalButton = document.createElement("button");
                navigateHospitalButton.textContent = "Navigate to Hospital";
                navigateHospitalButton.className = "btn";
                navigateHospitalButton.onclick = navigateToHospital;
                document.getElementById("hospital").appendChild(navigateHospitalButton);
            } else {
                const hospitalInfo = document.createElement("p");
                hospitalInfo.textContent = "Nearest Hospital/Clinic: Not Found.";
                document.getElementById("hospital").appendChild(hospitalInfo);
                nearestHospitalLocation = null; // Reset if no hospital is found
            }
        }
    );
}

function startTracking() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                initMap(latitude, longitude);
            },
            () => {
                alert("Failed to access location.");
            }
        );
    } else {
        alert("Geolocation not supported.");
    }
}

function navigate() {
    if (nearestPoliceLocation) {
        const lat = nearestPoliceLocation.lat();
        const lng = nearestPoliceLocation.lng();
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        window.open(googleMapsUrl, "_blank"); // Open in a new tab
    } else {
        alert("No police station found to navigate.");
    }
}

function navigateToHospital() {
    if (nearestHospitalLocation) {
        const lat = nearestHospitalLocation.lat();
        const lng = nearestHospitalLocation.lng();
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        window.open(googleMapsUrl, "_blank"); // Open in a new tab
    } else {
        alert("No hospital found to navigate.");
    }
}


function toggleMenu() {
    document.getElementById("navbar").classList.toggle("show");
}

const hamburger = document.querySelector(".hamburger");
    hamburger.classList.toggle("active");