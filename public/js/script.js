// const socket = io();

if (navigator.geolocation) {
  navigator.geolocation.watchPosition((position) => {
    const { latitude, longitude } = position.coords;

    console.log("lat: "+latitude, "lng: "+longitude);

    const map = L.map("map").setView([latitude, longitude], 16);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "Kartik (Frontend Developer)",
    }).addTo(map);
    L.marker([latitude, longitude]).addTo(map);

    socket.emit("send-location", { latitude, longitude });
  }),
    (error) => {
      console.error(error);
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maxAge: 0,
    };
}

// const map = L.map("map").setView([lat, lng], 1);

// console.log(lat, lng);

// L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   attribution: "Kartik (Frontend Developer)",
// }).addTo(map);

// const marker = {};

// socket.on("receive-location", (data) => {
//   const { id, latitude, longitude } = data;

//   map.setView([latitude, longitude], 16);

//   if (marker[id]) {
//     marker[id].setlatLng([latitude, longitude]);
//   } else {
//     marker[id] = L.marker([latitude, longitude]).addTo(map);
//   }
// });

// socket.on("user-disconnected", (id) => {
//   if (marker[id]) {
//     map.removeLayer(marker[id]);
//     delete marker[id];
//   }
// });
