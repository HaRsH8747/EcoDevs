import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Modal } from "flowbite-react";
import LandAgreementForm from "./LandAgreementForm";
import LandApplicationForm from "./LandApplicationForm";
import PopUp from "./PopUp";

const LandDetail = () => {
  const location = useLocation();

  const apiUrl = process.env.REACT_APP_API_URL;

  const { land } = location.state;
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(
    `${apiUrl}/${land.land_image_names[selectedImageIndex]}`
  );

  const [landApplicationId, setLandApplicationId] = useState("");
  const [status, setStatus] = useState("Pending");
  const [landOwnerId, setLandOwnerId] = useState();
  const [farmerId, setFarmerId] = useState();
  const [farmerName, setFarmerName] = useState();
  const [landId, setLandId] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [landOwnerName, setlandOwnerName] = useState();
  const [landAddress, setLandAddress] = useState();
  const [popUp, setPopUp] = useState({ isVisible: false, message: '' });

  const [formData, setFormData] = useState({
    landOwnerName: "",
    farmerName: "",
    landAddress: "",
    agreementDuration: "",
    durationType: "years",
    decidedCrop: "",
    facilitiesAndEquipment: "",
    agreementDescription: "",
  });

  const showPopUp = (message) => {
    setPopUp({ isVisible: true, message });
  };

  const handleAccept = (id, landowner, farmer, landid) => {
    fetchFormData({ id, landowner, farmer, landid });
    console.log("Accepted application with ID:", id);
    setOpenModal(true);
  };

  const fetchFormData = ({ appId, landowner, farmer, landid }) => {
    setLandOwnerId(land.land_owner_id);
    setFarmerId(storedDBData.id);
    setLandId(land.id);
    setlandOwnerName(land.land_owner_name);
    setFarmerName(storedDBData.user_name);
    setLandAddress(`${land.street_address},${land.city},${land.province}`);
  };

  const storedDBData = JSON.parse(localStorage.getItem("storedDBData"));
  const isLandOwner = storedDBData.designation == "L" ? true : false;

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
    setSelectedImage(
      `${apiUrl}/${land.land_image_names[index]}`
    );
  };

  const updateLandApplicationStatus = async () => {
    const response = await fetch(
      `${apiUrl}/api/landapplications/${land.id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ status: status }),
      }
    );

    if (response.ok) {
      alert("Status updated successfully");
    } else {
      alert("Failed to update status");
    }
  };

  const closeModal = () => {
    setOpenModal(false);
    showPopUp("Application Submitted Successfully!");
  };

  return (
    <>
      <div className="container mx-auto my-12 p-4 flex flex-wrap lg:flex-nowrap">
        <div className="flex flex-col w-full lg:w-1/2">
          <div className="rounded-lg shadow-md mb-4 overflow-hidden">
            <img
              src={selectedImage}
              alt={`Product Image ${selectedImageIndex}`}
              className="w-full h-auto transition duration-300 ease-in-out transform hover:scale-105"
            />
          </div>
          <div className="flex justify-center gap-2">
            {land.land_image_names.map((image, index) => (
              <button
                key={image}
                className={`rounded - lg overflow-hidden border-2 ${
                  index === selectedImageIndex
                    ? "border-green-500"
                    : "border-transparent"
                }`}
                onClick={() => handleThumbnailClick(index)}
              >
                <img
                  src={`${apiUrl}/${image}`}
                  alt={`Thumbnail ${index}`}
                  className="w-20 h-20 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/2 lg:pl-12">
          <div className="flex flex-col items-start space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-green-600">
                {land.land_owner_name}
              </h1>
              <p className="text-lg">{land.land_owner_name}</p>
              <ul className="list-none space-y-1 text-lg">
                <li>
                  <strong>Size:</strong>
                  {land.land_size}
                </li>
                <li>
                  <strong>Address:</strong>
                  {land.street_address + land.city + land.province}
                </li>
                <li>
                  <strong>Available For:</strong>
                  {land.farmland_available_for}
                </li>
                <li>
                  <strong>Soil Type:</strong>
                  {land.type_of_soil}
                </li>
                <li>
                  <strong>Current Use:</strong>
                  {land.and_currently_being_used_for}
                </li>
                <li>
                  <strong>Facility & Equipment:</strong>
                  {land.facility_and_equipment}
                </li>
                <li>
                  <strong>Experience Needed:</strong>
                  {land.experience_needed}
                </li>
              </ul>
            </div>
            {!isLandOwner && (
              <div className="flex gap-2">
                <Button
                  color="black"
                  buttonType="filled"
                  size="md"
                  rounded={true}
                  block={false}
                  iconOnly={false}
                  onClick={() => {
                    handleAccept();
                  }}
                >
                  Application Request
                </Button>

                {/* <Button
                  color="black"
                  buttonType="filled"
                  size="md"
                  rounded={true}
                  block={false}
                  iconOnly={false}
                  onClick={() => {
                    navigate("/chatpage");
                  }}
                >
                  Message
                </Button> */}
              </div>
            )}
          </div>
        </div>
      </div>

      {openModal && (
        <Modal show={openModal} onClose={() => setOpenModal(false)} size="4xl">
          <Modal.Header>
            <h2 className="text-2xl font-semibold mb-5 text-gray-900">
              Land Applicaton Form
            </h2>
          </Modal.Header>
          <Modal.Body>
            <LandApplicationForm land_data={{ land }} onSuccess={closeModal} />
          </Modal.Body>
        </Modal>
      )}
      <PopUp
        isVisible={popUp.isVisible}
        message={popUp.message}
        onClose={() => setPopUp({ isVisible: false, message: "" })}
      />
    </>
  );
};

export default LandDetail;
