import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Label,
  TextInput,
  Textarea,
  Select,
} from "flowbite-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const facilitiesOptions = [
  "Housing",
  "Irrigation capacity",
  "Irrigation equipment",
  "Greenhouse",
  "Fencing",
  "Agricultural machinery",
  "Cold storage",
  "Processing facilities",
  "Other facilities",
];

const cropList = [
  "Field Crops (grains or beans)",
  "Flowers",
  "Fruit/berries/grapes",
  "Hay or forage crops",
  "Herbs",
  "Livestock",
  "Seeds, seedlings or nursery stock",
  "Vegetables",
  "Other products",
];

function LandApplicationForm({land_data, onSuccess}) {
  const land_detail = land_data.land;

  const navigate = useNavigate();
  const storedDBData = JSON.parse(localStorage.getItem("storedDBData"));
  const isLandOwner = storedDBData.designation == "L" ? true : false;


  const [formData, setFormData] = useState({
    landOwnerName: land_detail.land_owner_name,
    farmerName: storedDBData.user_name,
    landAddress: land_detail.street_address + "," + land_detail.city + "," + land_detail.province,
    ApplicationDuration: "",
    durationType: "years",
    decidedCrop: [0],
    facilitiesAndEquipment: "",
    ApplicationDescription: "",
    productPlanningToProduce: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "decidedCr") {

    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleInputChangeProduct = (e) => {
    const { name, value, type, checked } = e.target;
  };
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = process.env.REACT_APP_API_URL;

    const apiPayload = {
      landowner: land_detail.land_owner_id,
      farmer: storedDBData.id,
      landid: land_detail.id,
      status: "Pending",
      Application_duration:
        formData.ApplicationDuration + " " + formData.durationType,
      facility_and_equipment_agreed_to: formData.facilitiesAndEquipment,
      Application_description: formData.ApplicationDescription,
      product_planning_to_produce: formData.productPlanningToProduce,
    };

    try {
      const response = await fetch(
        `${apiUrl}/api/landapplications/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiPayload),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log(onSuccess)
        onSuccess();
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="landOwnerName">Land Owner Name</Label>
            <TextInput
              id="landOwnerName"
              name="landOwnerName"
              value={formData.landOwnerName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="farmerName">Farmer Name</Label>
            <TextInput
              id="farmerName"
              name="farmerName"
              value={formData.farmerName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="landAddress">Land Address</Label>
            <TextInput
              id="landAddress"
              name="landAddress"
              value={formData.landAddress}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex gap-4 items-center">
            <Label htmlFor="ApplicationDuration">Application Duration</Label>
            <TextInput
              id="ApplicationDuration"
              name="ApplicationDuration"
              type="number"
              min="1"
              value={formData.ApplicationDuration}
              onChange={handleInputChange}
              required
            />
            <div className="flex gap-2 items-center">
              <Checkbox
                id="years"
                name="durationType"
                value="years"
                checked={formData.durationType === "years"}
                onChange={handleInputChange}
              />
              <Label htmlFor="years">Years</Label>
            </div>
            <div className="flex gap-2 items-center">
              <Checkbox
                id="months"
                name="durationType"
                value="months"
                checked={formData.durationType === "months"}
                onChange={handleInputChange}
              />
              <Label htmlFor="months">Months</Label>
            </div>
          </div>

          <div>
            <Label htmlFor="productPlanningToProduce">Crop You Want to Grow</Label>
            <Select
              id="productPlanningToProduce"
              name="productPlanningToProduce"
              value={formData.product_planning_to_produce}
              onChange={handleInputChange}
              required
            >
              <option>Select Decided Crop</option>
              {cropList.map((option) => (
                <option>{option}</option>
              ))}
            </Select>
          </div>

          <div>
            <Label htmlFor="facilitiesAndEquipment">
              Facilities and Equipment that you Would Need
            </Label>
            <Select
              id="facilitiesAndEquipment"
              name="facilitiesAndEquipment"
              value={formData.facilitiesAndEquipment}
              onChange={handleInputChange}
              required
            >
              <option>Select Facilities/Equipment</option>
              {facilitiesOptions.map((option) => (
                <option>{option}</option>
              ))}
            </Select>
          </div>

          <div>
            <Label htmlFor="ApplicationDescription">
              Application Description
            </Label>
            <Textarea
              id="ApplicationDescription"
              name="ApplicationDescription"
              value={formData.ApplicationDescription}
              onChange={handleInputChange}
              required
            />
          </div>

          <Button type="submit">Submit Application</Button>
        </form>
      </div>
    </div>
  );
}

export default LandApplicationForm;
