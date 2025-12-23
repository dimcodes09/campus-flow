export const busData = {
  "101": {
    name: "Bus #101 - Express",
    route: "MP Nagar → Campus",
    status: "on-time",
    capacity: 50,
    speed: 40, // km/h
    currentStopIndex: 0,
    stops: [
      { name: "MP Nagar", coordinates: [23.2338, 77.4326] },
      { name: "Shivaji Nagar", coordinates: [23.2451, 77.4032] },
      { name: "Oriental College", coordinates: [23.249053797745834, 77.50455045232269] }
    ],
    currentLocation: [23.2338, 77.4326]
  },

  "102": {
    name: "Bus #102 - City",
    route: "New Market → Campus",
    status: "delayed",
    capacity: 45,
    speed: 28, // km/h
    currentStopIndex: 0,
    stops: [
      { name: "New Market", coordinates: [23.2356, 77.4028] },
      { name: "TT Nagar", coordinates: [23.2476, 77.3981] },
      { name: "Oriental College", coordinates: [23.249053797745834, 77.50455045232269] }
    ],
    currentLocation: [23.2356, 77.4028]
  },

  "103": {
    name: "Bus #103 - Rapid",
    route: "Indrapuri → Campus",
    status: "on-time",
    capacity: 40,
    speed: 40, // km/h
    currentStopIndex: 0,
    stops: [
      { name: "Indrapuri", coordinates: [23.250472088783493, 77.46677098427074] },
      { name: "Piplani", coordinates: [23.249494353091528, 77.47114369069008] },
      { name: "Oriental College", coordinates: [23.249053797745834, 77.50455045232269] }
    ],
    currentLocation: [23.2873, 77.3372]
  }
};
