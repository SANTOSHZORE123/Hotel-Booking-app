import { Link } from "react-router-dom";
import "./searchItem.css";
import DescriptionWithReadMore from "../ReadMore/ReadMore";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img src={item.photos[0]?item.photos[0]:"https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg"} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance} from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <DescriptionWithReadMore desc={item.desc}/>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && <div className="siRating">
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">RS.{item.chepestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
          <button style={{fontSize:"1.2vw"}} className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
