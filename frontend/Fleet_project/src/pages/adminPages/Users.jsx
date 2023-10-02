import { useState } from "react";

const Users = ()=>{
    const [isDriverDropdownOpen, setIsDriverDropdownOpen] = useState(false);
    const [i1, setI1] = useState(false)

    const toggleDriverDropdown = (e) => {
      setIsDriverDropdownOpen(!isDriverDropdownOpen);
      switch(e.className) 
      {
        case 'dalawa':setI1(!i1)
        break;
      }

      console.log(i1)
    };
  
    return(
        <div className="Users">

    <div className="menu-sidebar">
      <ul className="menu-items">
        <li>Item 1</li>
        <li className="dalawa" onClick={(e)=>{toggleDriverDropdown(e.target)}}>Item 2</li>
        {i1 && 
        <ul>
            <li>Hello</li>
            <li>Madam</li>
            </ul>}
        <li className={`menu-item ${isDriverDropdownOpen ? 'open' : ''}` } onClick={toggleDriverDropdown}>
            Driver
          {isDriverDropdownOpen && (
            <ul className="submenu-items">
              <li>Submenu Item 1</li>
              <li>Submenu Item 2</li>   
              <li>Submenu Item 3</li>
            </ul>
          )}
        </li>
        <li className="apat">Item 4</li>
      </ul>
    </div>


        </div>
    )
}

export default Users;