import React from 'react';
import { MaterialInput } from '../styled';
import { Link } from 'react-router-dom';

const EditProfile = props => {
  return (
    <form style={{padding:0, margin:0}}>
      <h4 style={{marginBottom:'1rem'}}>Update Profile Info</h4>
      <div className="form-group">
        <MaterialInput type="text" name="fullName" value={props.fullName || ''} onChange={props.updateInput} placeholder="Your Name" />
      </div>
      
      {/* <div className="form-group">
        <MaterialInput type="text" name="handle" value={props.handle || ''} onChange={props.updateInput} placeholder="Handle" />
      </div> */}

      <div className="form-group">
        <MaterialInput type="email" name="email" value={props.email || ''} onChange={props.updateInput} placeholder="Email" />
      </div>

      <div className="form-group">
        <MaterialInput type="password" name="password" value="*************" readOnly />
        <Link style={{marginTop:5,display:'inline-block'}} to="/changepassword">Change Password</Link>
      </div>

      <h4 style={{marginBottom:'1rem', marginTop:'2rem'}}>Update Your Occupation</h4>
      <div className="form-group">
        <MaterialInput type="text" name="occupation" value={props.occupation || ''} onChange={props.updateInput} placeholder="Occupation" />
      </div>

      <div className="form-group">
        <MaterialInput type="text" name="employer" value={props.employer || ''} onChange={props.updateInput} placeholder="Employer" />
      </div>

      <h4 style={{marginBottom:'1rem', marginTop:'2rem'}}>Update Your Location</h4>
      <div className="form-group">
        <MaterialInput type="text" name="locationCity" value={props.locationCity || ''} onChange={props.updateInput} placeholder="City" />
      </div>

      <div className="form-group">
        <MaterialInput type="text" name="locationState" value={props.locationState || ''} onChange={props.updateInput} placeholder="State" />
      </div>

      <div className="form-group">
        <button type="button" className="btn btn-primary yapper-btn-primary" onClick={props.doProfileUpdate}>Update Profile Info</button>
      </div>
    </form>
  )
};

export default EditProfile;