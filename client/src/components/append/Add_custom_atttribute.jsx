import React, { Component } from 'react';
import axios from 'axios';
import '../styleAssets/Add_employee.css';

class CustomFieldForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldID: '',
      fieldName: '',
      message: '', // New state for the message
      messageColor: '', // New state for message color (e.g., 'green' or 'red')
    };
  }

  handlefieldIDChange = (e) => {
    this.setState({ fieldID: e.target.value });
  }

  handlefieldNameChange = (e) => {
    this.setState({ fieldName: e.target.value });
  }

  handleAddCustomField = async () => {
    const { fieldID, fieldName } = this.state;
    if (fieldID && fieldName) {
      try {
        await axios.post(`http://localhost:8800/add-custom-field`, {
          Field_ID: fieldID,
          Field_name: fieldName,
        });

        this.setState({
          fieldID: '',
          fieldName: '',
          message: 'New field added successfully!',
          messageColor: 'green',
        });
      } catch (error) {
        console.error(error);
        this.setState({
          message: 'An error occurred while adding the new field :(',
          messageColor: 'red',
        });
      }
    }
  }

  render() {
    const { message, messageColor } = this.state;

    return (
      <div className="form-container">
        <h1 className="heading">Add Custom Employee Attribute</h1>
        {message && (
          <p style={{ color: messageColor }}>{message}</p>
        )}
        <div className="form-input">
          <label htmlFor="fieldID">Field ID:</label>
          <input
            type="text"
            id="fieldID"
            value={this.state.fieldID}
            onChange={this.handlefieldIDChange}
          />
        </div>
        <div className="form-input">
          <label htmlFor="fieldName">Field Name:</label>
          <input
            type="text"
            id="fieldName"
            value={this.state.fieldName}
            onChange={this.handlefieldNameChange}
          />
        </div>
        <button className="submit-button" onClick={this.handleAddCustomField}>
          Add Custom Field
        </button>
      </div>
    );
  }
}

export default CustomFieldForm;
