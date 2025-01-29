import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { Card, CardBody, Typography, IconButton } from "@material-tailwind/react";
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid'
import { Button } from "@material-tailwind/react";

import html2pdf from 'html2pdf.js';


const LandAgreementDetail = ({agreement}) => {

  if (!agreement) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // const generatePDF = () => {
  //   const doc = new jsPDF();
  //   const date = new Date().toLocaleDateString();
  //   const agreementContent = `
  //     Land Agreement

  //     This agreement is made and entered into on ${date}, by and between ${agreement.extendeduser.user_name} (hereinafter referred to as "Landowner") and ${agreement.farmer_extended.user_name} (hereinafter referred to as "Farmer").

  //     The Landowner agrees to lease to the Farmer the land located at ${agreement.landid} (hereinafter referred to as "the Property"), under the following terms and conditions:

  //     1. Term of Agreement: This agreement shall commence on ${agreement.agreement_starting_date} and shall continue for a period of ${agreement.agreement_duration}.
  //     2. Rent: The Farmer agrees to pay the Landowner a rental fee of (rent amount) per annum, payable in (payment terms).
  //     3. Use of Property: The Farmer shall use the Property exclusively for agricultural purposes, specifically for the production of ${agreement.product_planning_to_produce.join(', ')}.
  //     4. Facilities and Equipment: The Landowner agrees to provide the following facilities and equipment for the duration of this agreement: ${agreement.facility_and_equipment_agreed_to}.
  //     5. Maintenance and Upkeep: The Farmer agrees to maintain the Property in good condition and to carry out any necessary repairs at their own expense, except for major structural repairs which shall be the responsibility of the Landowner.
  //     6. Compliance with Laws: The Farmer agrees to comply with all federal, state, and local laws and regulations related to the use of the Property.
  //     7. Termination: Either party may terminate this agreement with a written notice of (termination notice) days. In the event of termination, the Farmer agrees to vacate the Property and return it to the Landowner in the condition it was at the commencement of this agreement.
  //     8. Dispute Resolution: Any disputes arising out of or in connection with this agreement shall be resolved through mediation or arbitration, as agreed upon by both parties.
  //     9. Miscellaneous: This agreement constitutes the entire understanding between the parties and may only be modified in writing, signed by both parties.
  //     10. Governing Law: This agreement shall be governed by and construed in accordance with the laws of the state of (governing law state).

  //     Signatures:
  //     Landowner: _________________________
  //     Farmer: _________________________
  //     Witness: _________________________
  //   `;
  //   doc.text(agreementContent, 10, 10);
  //   doc.save(`Land_Agreement_${agreement.landid}.pdf`);
  // };
  const generatePDF = () => {
    document.getElementById("submit-icon").style.visibility = "hidden";
    document.getElementById("download-icon").style.visibility = "hidden";
    
    const element = document.getElementById('pdf-content');
    const options = {
      margin: 0.5,
      filename: `Land_Agreement_${agreement.landid}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(options).save();
    
  };

  return (
<div id= "pdf-content"
      className="container mx-auto p-8 bg-cover bg-center rounded-lg shadow-2xl max-w-3xl"
      style={{ backgroundImage: "url('/img/background_contract.jpg')" }}
    >      <div className="flex justify-center items-center mb-10 mt-8">
    <h2 className="text-4xl font-bold text-gray-800 font-baskervville text-center">
Land Agreement</h2>
        <IconButton
          variant="gradient"
          size="lg"
          color="blue"
          className="mb-6 rounded-full"
          onClick={generatePDF}
          id= "download-icon"
        >
          <ArrowDownTrayIcon  className="h-6 w-6" />
        </IconButton>
      </div>
      <div className="mb-8 text-xl leading-relaxed text-gray-900 font-baskervville">
        <p className="mb-4">
          This agreement is made and entered into on <span className="font-semibold">{new Date().toLocaleDateString()}</span>, by and between <span className="font-semibold">{agreement.landowner_extended.user_name}</span> (hereinafter referred to as "Landowner") and <span className="font-semibold">{agreement.farmer_extended.user_name}</span> (hereinafter referred to as "Farmer").
        </p>
        <p className="mb-4">
          The Landowner agrees to lease to the Farmer the land located at <span className="font-semibold">{agreement.landid}</span> (hereinafter referred to as "the Property"), under the following terms and conditions:
        </p>
        <p className="mb-4">
          <span className="font-semibold">1. Term of Agreement:</span> This agreement shall commence on <span className="font-semibold">{agreement.agreement_starting_date}</span> and shall continue for a period of <span className="font-semibold">{agreement.agreement_duration}</span>.
        </p>
        <p className="mb-4">
          <span className="font-semibold">2. Rent:</span> The Farmer agrees to pay the Landowner a rental fee of (rent amount) per annum, payable in (payment terms).
        </p>
        <p className="mb-4">
          <span className="font-semibold">3. Use of Property:</span> The Farmer shall use the Property exclusively for agricultural purposes, specifically for the production of <span className="font-semibold">{agreement.product_planning_to_produce.join(', ')}</span>.
        </p>
        <p className="mb-4">
          <span className="font-semibold">4. Facilities and Equipment:</span> The Landowner agrees to provide the following facilities and equipment for the duration of this agreement: <span className="font-semibold">{agreement.facility_and_equipment_agreed_to}</span>.
        </p>
        <p className="mb-4">
          <span className="font-semibold">5. Maintenance and Upkeep:</span> The Farmer agrees to maintain the Property in good condition and to carry out any necessary repairs at their own expense, except for major structural repairs which shall be the responsibility of the Landowner.
        </p>
        <p className="mb-4">
          <span className="font-semibold">6. Compliance with Laws:</span> The Farmer agrees to comply with all federal, state, and local laws and regulations related to the use of the Property.
        </p>
        <p className="mb-4">
          <span className="font-semibold">7. Termination:</span> Either party may terminate this agreement with a written notice of (termination notice) days. In the event of termination, the Farmer agrees to vacate the Property and return it to the Landowner in the condition it was at the commencement of this agreement.
        </p>
        <p className="mb-4">
          <span className="font-semibold">8. Dispute Resolution:</span> Any disputes arising out of or in connection with this agreement shall be resolved through mediation or arbitration, as agreed upon by both parties.
        </p>
        <p className="mb-4">
          <span className="font-semibold">9. Miscellaneous:</span> This agreement constitutes the entire understanding between the parties and may only be modified in writing, signed by both parties.
        </p>
        <p className="mb-4">
          <span className="font-semibold">10. Governing Law:</span> This agreement shall be governed by and construed in accordance with the laws of the state of (governing law state).
        </p>
      </div>
      <div className="border-t-2 border-gray-300 mt-8 pt-6">
        <p className="text-lg mb-2 font-semibold text-gray-800">Signatures:</p>
        <div className="flex justify-between mt-6">
          <div className="text-center">
            <p className="mb-8">_________________________</p>
            <p className="font-semibold text-gray-700">Landowner Signature</p>
          </div>
          <div className="text-center">
            <p className="mb-8">_________________________</p>
            <p className="font-semibold text-gray-700">Farmer Signature</p>
          </div>
        </div>
        
       
      </div>
      <div className="flex justify-center items-center m-4">
      <Button id= "submit-icon" variant="filled">
        Submit
      </Button>
    </div>
    </div>
  );
};

export default LandAgreementDetail;
