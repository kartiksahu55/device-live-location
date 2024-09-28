const socket = io();

let [lat, lng] = [0, 0];

(async() => {
  if (navigator.geolocation) {
    await navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;

      [lat, lng] = [latitude, longitude];

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
})();

const map = L.map("map").setView([lat, lng], 1);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "Kartik (Frontend Developer)",
}).addTo(map);

const marker = {};

socket.on("receive-location", (data) => {
  const { id, latitude, longitude } = data;

  map.setView([lat, lng], 16);

  if (marker[id]) {
    marker[id].setlatLng([lat, lng]);
  } else {
    marker[id] = L.marker([lat, lng]).addTo(map);
  }
});

socket.on("user-disconnected", (id) => {
  if (marker[id]) {
    map.removeLayer(marker[id]);
    delete marker[id];
  }
});
