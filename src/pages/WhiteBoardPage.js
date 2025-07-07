/*
*/

import Whiteboard from "../components/WhiteBoard/WhiteBoard";
import Navbar from "../components/NavBar/Navbar"
import SideNavBar from "../components/NavBar/SideBar"

const WhiteBoardPage = () =>{
    return (
        <div style={{ display: 'flex', width:'100% !important', position: 'fixed'}}>
            <SideNavBar />
            <div style={{  flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div className="plt-page-nav">
                    <Navbar title="White Board"/>
                </div>
                <Whiteboard/>
            </div>
        </div>
    );
}

export default WhiteBoardPage;

