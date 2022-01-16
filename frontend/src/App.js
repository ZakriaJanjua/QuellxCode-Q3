import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [userData, setUserData] = useState([])
  const abc = [1,2,3,4,5]
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      axios
        .post("http://localhost:5000/", {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((res) => {
          setUserData(prev => [...prev, res.data[0]])
        })
        .catch((err) => console.error(err));
    });
    console.log(userData)
  };
  const signUser = () => {
    axios
      .post("http://localhost:5000/auth/signuser", {
        user: "zakria",
      })
      .then((res) => {
        localStorage.setItem('token', res.data)
        console.log(res.data)
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getLocation();
  }, []);
  return (
    <div>
      <h3>Longitude</h3>
      <div id="longitude">{long}</div>
      <br />
      <h3>Latitude</h3>
      <div id="latitude">{lat}</div>
      <br />
      <br />
      <span>Longitude's sphere</span>
      <span id="longitudeSphere"> {`[${long - 0.02} to ${long + 0.02}]`}</span>
      <br />
      <span>Latitude's sphere</span>
      <span id="latitudeSphere"> {`[${lat - 0.02} to ${lat + 0.02}]`}</span>
      <br />
      <br />
      <button onClick={signUser}>Sign User</button>
      <button onClick={() => window.location.reload()}>Get Data</button>
      {userData && userData.map(every => {
        return(
        <div key={every.first_name}>
          <span>{every.first_name} </span>
          <span>{every.last_name} </span>
          <span>{every.latitude} {every.longitude}</span>
        </div>)
      })}
    </div>
  );
}

export default App;
