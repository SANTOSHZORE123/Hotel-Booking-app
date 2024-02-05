

import React, { useContext, useState } from 'react';
import UpdateModal from '../UpdateModal/UpdateModal'; // Make sure to provide the correct path to UpdateModal
import Modal from '../UpdateModal/Modal';
import axios from "axios"
import { FaTimesCircle } from 'react-icons/fa';
import { AuthContext } from "../../context/AuthContext"
import { Document, Page, Text, PDFDownloadLink ,pdf} from '@react-pdf/renderer';
import { FaFilePdf } from 'react-icons/fa';

const UserRegistration = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [UpdateError, setUpdateError] = useState("")
  const [isDeleteModalOpen, setIsDeleteOpen] = useState({ isopen: false, eventVar: "" })
  const [isloading, setIsloading] = useState(false)
  const [Delete, setDeleteError] = useState({ message: "", flg: false })
  const { user } = useContext(AuthContext)
  const [pdfBlob, setPdfBlob] = useState(null);

  const [pdfDownload,setdownload]=useState(false)

  const fetchDataAndGeneratePDF = async (id) => {
    setdownload(true)
    try {
      // Fetch data from the server
      const response = await axios.get(`/registrations/data/${id}`);
      const fetchedData = response.data;

      // Define the PDF document
      const MyDocument = (
        <Document>
          <Page size="A4" style={{ padding: '20px', border: '1px solid black' }}>
            <div style={{ borderBottom: '1px solid black', marginBottom: '10px' }}>
              <Text style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>Hotel Booking Receipt</Text>
            </div>
      
            {/* Render the content using LaTeX */}
            <table style={{ width: '100%',border:"1px solid black"}}>
              <tbody>
                {/* Hotel Details Rows... */}
                 <tr>
          <td colSpan="2" style={{ textAlign: 'center', paddingTop: '8px', paddingBottom: '8px' }}>
            <Text style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Hotel Details</Text>
          </td>
        </tr>
        <tr>
          <td style={{ padding: '5px'}}>
            <Text>Hotel Name: {fetchedData.hotelName}</Text>
          </td>
          <td style={{ padding: '5px' }}>
            <Text>City: {fetchedData.city}</Text>
          </td>
        </tr>
        <tr>
          <td style={{ padding: '5px'}}>
            <Text>Address: {fetchedData.address}</Text>
          </td>
          <td style={{ padding: '5px',borderBottom:"1px solid black" }}>
            <Text>Contact: {fetchedData.contact}</Text>
          </td>
        </tr>
                
                {/* Room Details Section */}
                <tr>
                  <td colSpan="2" style={{ textAlign: 'center', paddingTop: '8px', paddingBottom: '8px' }}>
                    <Text style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Room Details</Text>
                  </td>
                </tr>
                <tr>
          <td colSpan="2" style={{ padding: '5px',borderBottom:"1px solid black" }}>
            <Text>Number of rooms booked: {fetchedData.numRooms}</Text>
            <Text>Room Rate: {fetchedData.roomRate}</Text>
            <Text>Room Number: {fetchedData.roomNumber}</Text>
          </td>
        </tr>
                {/* Room Details Rows... */}
                
                {/* Booking and Stay Information Section */}
                <tr>
                  <td colSpan="2" style={{ textAlign: 'center', paddingTop: '8px', paddingBottom: '8px' }}>
                    <Text style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Booking and Stay Information</Text>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '5px'}}>
                    <Text>Check-in date: {fetchedData.checkInDate}</Text>
                  </td>
                  <td style={{ padding: '5px' }}>
                    <Text>Check-out date: {fetchedData.checkOutDate}</Text>
                  </td>
                  <td style={{ padding: '5px',borderBottom:"1px solid black"  }}>
                  <Text>BookedAt: {fetchedData.bookedAt}</Text>
                  </td>
                </tr>
                
                {/* Customer Details Section */}
                <tr>
                  <td colSpan="2" style={{ textAlign: 'center', paddingTop: '8px', paddingBottom: '8px' }}>
                    <Text style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Customer Details</Text>
                  </td>
                </tr>
                {/* Customer Details Rows... */}
                <tr>
          <td colSpan="2" style={{ padding: '5px' ,borderBottom:"1px solid black" }}>
            <Text>Customer Name: {fetchedData.customerName}</Text>
            <Text>Email: {fetchedData.email}</Text>
            <Text>City: {fetchedData.customerCity}</Text>
            <Text>Phone: {fetchedData.phone}</Text>
          </td>
        </tr>
                
                {/* Payment Information Section */}
                <tr>
                  <td colSpan="2" style={{ textAlign: 'center', paddingTop: '8px', paddingBottom: '8px' }}>
                    <Text style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Payment Information</Text>
                  </td>
                </tr>
                {/* Payment Information Rows... */}
                <tr>
          <td colSpan="2" style={{ padding: '5px',borderBottom:"1px solid black"  }}>
            <Text>Grand Total: Rs.{fetchedData.grandTotal}</Text>
            <Text>Discount: {fetchedData.discount}%</Text>
            <Text>Final Amount: Rs.{fetchedData.finalAmount}</Text>
            <Text>Status: {fetchedData.status}</Text>
          </td>
        </tr>
                
                {/* Signatures Section */}
                <tr>
                  <td style={{ padding: '5px'}}>
                    <Text>Signature of Hotel Owner: ______________</Text>
                  </td>
                  <td style={{ padding: '5px',borderBottom:"1px solid black" }}>
                    <Text>Signature of Customer: ______________</Text>
                  </td >
                </tr>
                
                {/* Thank You Section */}
                <tr>
                  <td colSpan="2" style={{ textAlign: 'center', padding: '5px',fontStyle:"italic" }}>
                    <Text>..... Thank You For Registration ....</Text>
                  </td>
                </tr>
                
                {/* Note Section */}
                {/* <tr>
                  <td colSpan="2" style={{ textAlign: 'left', padding: '5px' }}>
                    <Text>NOTE: Bring this receipt during check-in...</Text>
                  </td>
                </tr> */}
              </tbody>
            </table>
            <h3 style={{ textAlign: 'left', padding: '5px' }}><Text>NOTE: Bring this receipt during check-in...</Text></h3>
          </Page>
        </Document>
      );
      

      // Automatically download the PDF
      const pdfBlob = await pdf(MyDocument).toBlob();
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'document.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      setdownload(false)
    } catch (error) {
      console.error('Error fetching data and generating PDF:', error);
      setdownload(false)

    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const newDELETE = async (e) => {
    const row = e.target.closest('tr');
    const Hotel = row.cells[1].textContent;
    const room = row.cells[2].textContent;
    setIsloading(true)
    try {
      const res = await axios.post("/registrations/delete", { _id: props._id });
      setIsloading(false)
      setDeleteError({ message: "Reg.ID " + props.index + ": " + res.data.message, flg: true })
      setIsDeleteOpen({ isopen: false, eventVar: "" })
      props.onDelete()
    } catch (err) {
      setIsloading(false)
      setDeleteError({ message: "Reg.ID " + props.index + ": " + err.data.message, flg: true })
      setIsDeleteOpen({ isopen: false, eventVar: "" })
    }
  }

  return (
    <React.Fragment>
      <tr>
      <td>{props.index}</td>
        <td>{props.Hotel}</td>
        <td>{props.room}</td>
        <td>{props.stayDuration[0]} to {props.stayDuration[props.stayDuration.length - 1]}</td>
        <td>{props.Payment.toFixed(2)}</td>
        <td>{props.Location}</td>
        <td>
          <button onClick={(e)=>setIsModalOpen(true)}>
            <div className="icon">Update</div>
          </button>
        </td>
        <td>
          <FaTimesCircle size={20} style={{color:"red",cursor:"pointer"}} onClick={(e)=>setIsDeleteOpen({isopen:true,eventVar:e})}/>
        </td>

        {/* Add the Download button with PDF generation functionality */}
        <td>
          <div onClick={() => fetchDataAndGeneratePDF(props._id)}>
  <FaFilePdf size={32} color="rgb(223 56 56 / 95%)" style={{ cursor: "pointer" }} className="pdf-icon" />
</div>
        </td>

      </tr>


      {isModalOpen &&UpdateError.length===0&& (
        <Modal onClose={closeModal}>
          <UpdateModal
            onClose={closeModal}
            onSubmit={async(updatedData) => {
              setIsloading(true)
              console.log(updatedData)
              // Handle the updated data (e.g., send it to the server)
              try {
                const res = await axios.post("/registrations/update", {username:user,...updatedData});
                console.log(res)
                setIsloading(false)
                setUpdateError("Reg.ID "+props.index+": "+res.data.message)
                props.onDelete()
              } catch (err) {
                setIsloading(false)
                setUpdateError("Reg.ID "+props.index+": "+err.data.message)
              }
              closeModal();
              // setTimeout(()=>{
              //   setUpdateError("")
              // },3000)
            }}
            initialValues={{
              Hotel: props.Hotel,
              room: props.room,
              stayDuration: [props.stayDuration[0], props.stayDuration[props.stayDuration.length - 1]],
              Payment: props.Payment/props.stayDuration.length,
              Location: props.Location,
              room_id:props.room_id
            }}
          />
        </Modal>
      )}



      {pdfDownload&&<Modal><h3 style={{textAlign:"center"}}>Generating And Downloding Your Receipt...</h3></Modal>}
      {UpdateError.length>0&&<Modal>
        <h3>
          {UpdateError}
        </h3>
        <div style={{display:"flex",justifyContent:"end"}}>
        <button onClick={()=>setUpdateError("")} style={{backgroundColor:"#5a1a01",
        border:"1px solid #5a1a01",cursor:"pointer",padding:"2px",borderRadius:"5px",color:"white",fontSize:"20px",margin:"2% 3% 0px 0px"}}>Ok</button>
          </div>
        </Modal>}

        {Delete.message.length>0&&<Modal>
        <h3>
          {Delete.message}
        </h3>
        <div style={{display:"flex",justifyContent:"end"}}>
        <button onClick={()=>setDeleteError({message:"",flg:false})} style={{backgroundColor:"#5a1a01",
        border:"1px solid #5a1a01",cursor:"pointer",padding:"2px",borderRadius:"5px",color:"white",fontSize:"20px",margin:"2% 3% 0px 0px"}}>Ok</button>
          </div>
        </Modal>}

        {isDeleteModalOpen.isopen&&<Modal>
          <h3>Reg id:{props.index} Are You Sure Want to Delete?</h3>
          <button onClick={()=>setIsDeleteOpen(false)} style={{backgroundColor:"#5a1a01",
        border:"1px solid #5a1a01",cursor:"pointer",padding:"2px",borderRadius:"5px",color:"white",fontSize:"20px",margin:"2% 3% 0px 0px"}}>Cancel</button>

        <button onClick={()=>{newDELETE(isDeleteModalOpen.eventVar)}} style={{backgroundColor:"#5a1a01",
        border:"1px solid #5a1a01",cursor:"pointer",padding:"2px",borderRadius:"5px",color:"white",fontSize:"20px",margin:"2% 3% 0px 0px"}}>Ok</button>
          </Modal>}

          {isloading&&<Modal><h3 style={{textAlign:"center"}}>Processing your request...</h3></Modal>}

      {/* Your existing JSX for modals and loading indicators */}
    </React.Fragment>
  );
}

export default UserRegistration;

