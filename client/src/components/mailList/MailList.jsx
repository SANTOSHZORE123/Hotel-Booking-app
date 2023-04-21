import "./mailList.css"

const MailList = () => {
  return (
    <div className="mail">
      <h1  style={{fontSize:"2vw"}}className="mailTitle">Save time, save money!</h1>
      <span  style={{fontSize:"1.5vw"}}className="mailDesc">Sign up and we'll send the best deals to you</span>
      <div className="mailInputContainer">
        <input style={{fontSize:"1vw"}} type="text" placeholder="Your Email" />
        <button style={{fontSize:"1vw"}}>Subscribe</button>
      </div>
    </div>
  )
}

export default MailList