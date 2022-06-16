// import { useEffect, useState } from "react";
// import { useRecoilState } from "recoil";

// import { getData } from "../../core/api";
// import { isLoginState } from "../../core/atom";

// export default function useCheckLoginState() {
//   const [isLoginLoading, setIsLoginLoading] = useState<boolean>(true);
//   const [isLogin, setIsLogin] = useRecoilState<boolean>(isLoginState);

//   useEffect(() => {
//     checkLoginState();
//   }, []);

//   const checkLoginState = async () => {
//     try {
//       const { data } = await getData("/auth/check");
//       const status = data.status;

//       if (status === 200) {
//         data.data.isLogin === true ? setIsLogin(true) : setIsLogin(false);
//       }
//     } catch (err) {
//       setIsLogin(false);
//     } finally {
//       setIsLoginLoading(false);
//     }
//   };

//   return { isLogin, isLoginLoading, setIsLogin };
// }

export {};
