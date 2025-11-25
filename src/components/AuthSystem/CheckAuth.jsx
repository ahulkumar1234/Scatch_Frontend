// import axios from "axios";
// import { useEffect, useState } from "react";

// const CheckAuth = () => {

//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     const checkLogin = async () => {
//         try {
//             const res = await axios.get(
//                 "http://localhost:3000/api/v1/users/me",
//                 { withCredentials: true }
//             );

//             if (res.data.loggedIn) {
//                 setIsLoggedIn(true);
//             }
//         } catch (error) {
//             setIsLoggedIn(false);
//         }
//     };

//     useEffect(() => {
//         checkLogin();
//     }, []);

//     return (
//         <div>CheckAuth</div>
//     )
// }

// export default CheckAuth