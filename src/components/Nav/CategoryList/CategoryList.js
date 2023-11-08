import { useSelector } from "react-redux";
import "./CategoryList.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { setItemList, setRitemList } from "../../../store/slice/categorySlice";
import { useDispatch } from "react-redux";
import { localStorageUserInfo } from "../../../utils";

const CategoryList = () => {
  const dispatch = useDispatch();
  const navigage = useNavigate();
  let localUserInfo = localStorageUserInfo();
  const citemList = useSelector((state) => state.category.citemList);
  const [mcitemList, setCitemList] = useState([]);

  const handleClick = (item) => {
    console.log("shopbycategorisitem:", item);
    if (item === "all") {
      let params = {
        user_id: localUserInfo.user_id,
        user_email: localUserInfo.user_email,
      };
      dispatch(setItemList(params));
    } else {
      let params = { cat_id: item.id };
      dispatch(setRitemList(params));
    }
    navigage('/shop');
  };

  useEffect(() => {
    setCitemList(citemList);
  }, [citemList]);
  return (
    <div className="topcategory__bar__container">
      <div className="topcategory__container">
        <div className="headerdropdown" id="ndropdown-btn">
          <div className="category-dropdown">
            <button className="category-dropbtn">
              Shop by categories{" "}
              <KeyboardArrowDownIcon style={{ width: "15px" }} />
            </button>
            <div className="category-dropdown-content">
              <a href="/" onClick={(e) => { e.preventDefault(); handleClick("all"); }} value={"all"} > {"All"} </a>
                {mcitemList &&
                  mcitemList.map((item, index) => (
                    <a
                      href="/"
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick(item);
                      }}
                      key={index}
                      value={item.id}
                    >
                      {item.name}
                    </a>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
