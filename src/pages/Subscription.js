import React from "react";
import styled from "styled-components";
import three from '../assets/three.svg'
import { toast } from "react-toastify";

const Subscription = () => {
  function toast(message) {
  const toastElement = document.createElement('div');
  toastElement.innerHTML = message;
  toastElement.style.position = 'fixed';
  toastElement.style.zIndex = '9999';
  toastElement.style.width = '300px';
  toastElement.style.textAlign = 'center';
  toastElement.style.fontWeight = 'bold';
  toastElement.style.display = 'flex';
  toastElement.style.alignItems = 'center';
  toastElement.style.justifyContent = 'center';
  toastElement.style.height = '300px';
  toastElement.style.top = '50%';
  toastElement.style.left = '50%';
  toastElement.style.transform = 'translate(-50%, -50%)';
  toastElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  toastElement.style.color = '#fff';
  toastElement.style.padding = '15px 20px';
  toastElement.style.borderRadius = '10px';
  toastElement.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
  toastElement.style.fontSize = '18px';
  toastElement.style.fontFamily = 'Arial, sans-serif';
  toastElement.style.animation = 'fadeIn 0.5s';
  document.body.appendChild(toastElement);
  setTimeout(() => {
    toastElement.style.animation = 'fadeOut 0.5s';
    setTimeout(() => {
      document.body.removeChild(toastElement);
    }, 500); // Remove toast after 0.5 seconds
  }, 1000); // Show toast for 3 seconds
}

  
  return (
    <Container>
      <div className="big_container">
        <div className="logo_container">
          <img
            className="apple_logo"
            src={three}
            alt="logo"
          />
        </div>

        <div className="plan_container">
        <div className="plans" style={{
  marginTop: "10px",
  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px",
  borderBottomLeftRadius: "15px",
  borderBottomRightRadius: "15px"
}}>

            <h2 style={{marginTop:"10px"}}>Voice Plan</h2>
            <h3>$4.99/month</h3>
            <hr />
            <p>1 person</p>
            <p>Siri on Apple device</p>
            <p>Songs,playlists,stations</p>
            <p>All Apple devices</p>
            <button style={{
  backgroundColor: "red",
  color: "#ffffff",
  padding: "10px 20px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer"
}} onClick={() => toast("Under Construction ....")}>Buy</button>
          </div>

          <div className="plans" style={{
  marginTop: "10px",
  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px",
  borderBottomLeftRadius: "15px",
  borderBottomRightRadius: "15px"
}}>
            <h2 style={{marginTop:"10px"}}>Individual Plan</h2>
            <h3>$9.99/month</h3>
            <hr />
            <p>1 person</p>
            <p>Siri on Apple device</p>
            <p>Songs,playlists,stations,videos</p>
            <p>All Apple devices + supported </p>
           <button style={{
  backgroundColor: "red",
  color: "#ffffff",
  padding: "10px 20px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer"
}} onClick={() => toast("Under Construction ....")}>Buy</button>

          </div>

          <div className="plans" style={{
  marginTop: "10px",
  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px",
  borderBottomLeftRadius: "15px",
  borderBottomRightRadius: "15px"
}}>
            <h2 style={{marginTop:"10px"}}>Family Plan</h2>
            <h3>$14.99/month</h3>
            <hr />
            <p>6 people</p>
            <p>Siri on Apple device</p>
            <p>Songs,playlists,stations,videos</p>
            <p>All Apple devices + supported</p>
            <button style={{
  backgroundColor: "red",
  color: "#ffffff",
  padding: "10px 20px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer"
}} onClick={() => toast("Under Construction ....")}>Buy</button>

          </div>
        </div>
      </div>
    </Container>
  );
};

export default Subscription;

const Container = styled.div`
  position: fixed;
  width: 90%;
  height: 87vh;
  ${'' /* left: 20%;
  top: 92px; */}
  flex: 1;
  padding: 10px;
  background-color: rgba(60, 60, 67, 0.18);
  overflow: scroll;

  .big_container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
  .logo_container {
    display: flex;
    justify-content: center;
    .apple_logo {
      height: 100px;
      width: 250px;
    }
  }
  .plan_container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    overflow: visible;
   

    .plans {
      background-color: hsla(0, 0%, 100%, 0.92);
    
      margin: 10px;
      height: 300px;
      width: 250px;
      display: flex;
      flex-direction: column;
      align-items: center;
      line-height: .8;
    
      p {
        font-weight: 500;
      }
      hr {
        width: 70%;
        margin-left: 10%;
        height: 2px;
        background-color: red;
      }
      
    }
    
  }
`;
