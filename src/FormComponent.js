import React from 'react';

function FormComponent(props){
return (
  <main>
    <h1>Sample Form</h1>
    <form className="inputForm">
      <input
        className="text"
        name="firstName"
        value={props.firstName}
        placeholder="First Name"
        onChange={props.handleChange}
        onSubmit={props.handleSubmit}
      />
      <br />
      <input
        className="text"
        name="lastName"
        value={props.lastName}
        placeholder="Last Name"
        onChange={props.handleChange}
      />
      <br />
      <input
        className="text"
        name="age"
        value={props.age}
        placeholder="age"
        onChange={props.handleChange}
      />
      <br />
      <label>
        <input
          type="radio"
          className="radiobutton"
          value='male'
          name="gender"
          checked={props.gender === "male"}
          placeholder="Gender"
          onChange={props.handleChange}
        />
        Male
      </label>

      <label>
        <br />
        <input
          type="radio"
          className="radiobutton"
          value='female'
          name="gender"
          checked={props.gender === "female"}
          placeholder="Gender"
          onChange={props.handleChange}
        />
        Female
      </label>
      <br />
      <br />
      <label className="destination-header">Select a destination</label>
      <select
        className="destination-input"
        name="destination"
        value={props.destination}
        onChange={props.handleChange}
      >
        <option value="">---Select a destination---</option>
        <option value="Thailand">Thailand</option>
        <option value="Brazil">Brazil</option>
        <option value="Japan">Japan</option>
      </select>
      <br />
      <br />
      <label className="restrictions-title">Dietary restrictions</label>
      <br />
      <div className="restrictions">
        <input
          type="checkbox"
          name="nutsFree"
          checked={props.nutsFree}
          onChange={props.handleChange}
        />
        <span>Nuts Free</span>
        <br />
        <input
          type="checkbox"
          name="lactoseFree"
          checked={props.lactoseFree}
          onChange={props.handleChange}
        />
        <span>Lactose Free</span>
        <br />
        <input
          type="checkbox"
          name="isVegan"
          checked={props.isVegan}
          onChange={props.handleChange}
        />
        <span>Vegan</span>
      </div>
      <button className="submit" onSubmit={props.handleSubmit}>Submit</button>
    </form>
    <hr />
    <div className="entered-info">
      <h2>Entered information:</h2>
      <p>
        Your name: {props.firstName} {props.lastName}{" "}
      </p>
      <p>Your age: {props.age} </p>
      <p>Your gender: {props.gender}</p>
      <p>Your destination: {props.destination}</p>
      <p>Your Dietary restrictions:</p>
      <div className="restrictions">
        <span>**Nuts free : {props.nutsFree ? "Yes" : "No"}</span>
        <br />
        <span>**Lactose free : {props.lactoseFree ? "Yes" : "No"}</span> <br />
        <span>**Vegan Meal : {props.isVegan ? "Yes" : "No"}</span>
      </div>
    </div>
  </main>
);
}


export default FormComponent;
