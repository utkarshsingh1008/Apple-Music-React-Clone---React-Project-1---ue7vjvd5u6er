import React from "react";
import styled from "styled-components";
import three from '../assets/three.svg';

const Subscription = () => {
  const showToast = (message) => {
    const toastElement = document.createElement('div');
    toastElement.innerHTML = message;
  
    Object.assign(toastElement.style, {
      position: 'fixed',
      zIndex: '9999',
      width: '300px',
      textAlign: 'center',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '150px', // Reduced height for a more compact design
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#333', // Darker background color for a modern look
      color: '#fff', // White text for contrast
      padding: '20px', // Increased padding for better spacing
      borderRadius: '8px', // Slightly rounded corners for a smoother appearance
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // Softer shadow for depth
      fontSize: '16px', // Slightly smaller font size for a balanced look
      fontFamily: '"Roboto", sans-serif', // Modern font for better readability
      animation: 'fadeIn 0.3s ease-in-out', // Smooth fade-in animation
    });
  
    document.body.appendChild(toastElement);
  
    setTimeout(() => {
      toastElement.style.animation = 'fadeOut 0.3s ease-in-out';
      setTimeout(() => {
        document.body.removeChild(toastElement);
      }, 300); // Duration should match fade-out animation
    }, 1500); // Toast will be visible for 1.5 seconds
  };
  

  return (
    <Container>
      <div className="big_container">
        <div className="logo_container">
          <img className="apple_logo" src={three} alt="logo" />
        </div>
        <div className="plan_container">
          {plans.map((plan) => (
            <div className="plans" key={plan.name}>
              <h2>{plan.name}</h2>
              <h3>{plan.price}</h3>
              <hr />
              {plan.features.map((feature, index) => (
                <p key={index}>{feature}</p>
              ))}
              <button onClick={() => showToast("Under Construction ....")}>Buy</button>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Subscription;

const plans = [
  {
    name: "Voice Plan",
    price: "$4.99/month",
    features: ["1 person", "Siri on Apple device", "Songs, playlists, stations", "All Apple devices"]
  },
  {
    name: "Individual Plan",
    price: "$9.99/month",
    features: ["1 person", "Siri on Apple device", "Songs, playlists, stations, videos", "All Apple devices + supported"]
  },
  {
    name: "Family Plan",
    price: "$14.99/month",
    features: ["6 people", "Siri on Apple device", "Songs, playlists, stations, videos", "All Apple devices + supported"]
  }
];

const Container = styled.div`
  position: fixed;
  width: 90%;
  height: 87vh;
  flex: 1;
  padding: 20px;
  background-color: rgba(60, 60, 67, 0.18);
  overflow: scroll;
  display: flex;
  align-items: center;

  justify-content: center;

  .big_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 12%;
  }

  .logo_container {
    margin-bottom: 20px;
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

    .plans {
      background-color: hsla(0, 0%, 100%, 0.92);
      margin: 10px;
      height: 320px;
      width: 260px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      border-radius: 15px;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
      text-align: center;

      h2 {
        font-size: 1.5rem;
        margin-bottom: -7px;
      }

      h3 {
        font-size: 1.2rem;
        color: #888;
        margin-bottom: 3px;
      }

      p {
        font-weight: 500;
        margin-top: 5px;
        margin-bottom: 4px;
      }

      hr {
        width: 70%;
        height: 2px;
        background-color: #ff3b3b;
        margin-bottom: 8px;
      }

      button {
        background-color: #ff3b3b;
        margin-top: 20px;
        color: #ffffff;
        padding: 10px 20px;
        border-radius: 5px;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
          background-color: #e32e2e;
        }
      }
    }
  }
`;
